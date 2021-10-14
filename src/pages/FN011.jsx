import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "react-query";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { FaArrowRight } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";

import { getProjectLeads, getProtocols, getLakes } from "../services/api";

import schema from "../schemas/FN011";
import { Input, ControlledSelect } from "../components/FormControls";
import { updateAction } from "../actions";
import { prepDate } from "../utils";

const FN011 = (props) => {
  const { actions, state } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

  const {
    data: project_leads,
    error: prj_ldr_error,
    isLoading: prj_ldr_loading,
  } = useQuery("project_leads", getProjectLeads);

  const {
    data: protocols,
    error: protocols_error,
    isLoading: protocols_loading,
  } = useQuery("protocols", getProtocols);

  const {
    data: lakes,
    error: lakes_error,
    isLoading: lakes_loading,
  } = useQuery("lakes", getLakes);

  const initialValues = state.fn011 || {};

  initialValues.prj_date0 = prepDate(initialValues.prj_date0);
  initialValues.prj_date1 = prepDate(initialValues.prj_date1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    actions.updateAction({ fn011: data });
    // add the extent of the selected lake to the state so we can use it
    // to validate coordinates of each space.
    const extent = lakes.filter((x) => x.value === data.lake)[0].extent;
    const keys = ["minLon", "minLat", "maxLon", "maxLat"];
    let bbox = {};
    keys.forEach((key, i) => (bbox[key] = extent[i]));

    actions.updateAction({ bbox });
    props.history.push("./fn022");
  };

  if (prj_ldr_loading || protocols_loading || lakes_loading)
    return "Loading...";

  if (prj_ldr_error || protocols_error || lakes_error) {
    return (
      <div>
        An error has occurred:{prj_ldr_error && prj_ldr_error.message}
        {protocols_error && protocols_error.message}
        {lakes_error && lakes_error.message}
      </div>
    );
  }

  return (
    <>
      <p>
        This Fishnet Project Setup Wizard will step through a number of forms to
        collect basic information about your project. Once the forms are
        complete, a project entry will be created in FN_Portal and a link to a
        pre-configured data entry template database will be provided for you to
        download and populate.
      </p>
      <p>
        Let&lsquo;s get started with some basic information about the project.
      </p>
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            Basic Project Setup - FN011
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowRules(!showRules)}
            >
              Validation Rules
            </button>
          </div>
        </div>
        <div className="card-body">
          {showRules && (
            <div className="card mt-2 mb-3">
              <div className="card-body">
                <h5 className="card-title">Validation Rules</h5>
                <ul>
                  <li>project code must be consistent with lake and dates</li>
                  <li>
                    project code must be valid project code - should we limit
                    project types here to &lsquo;IA&lsquo; and &lsquo;IS&lsquo;
                    projects?
                  </li>
                  <li>
                    project end must occur on or after project start in the same
                    year
                  </li>
                  <li>
                    project year cannot be less than 1950 (say) and no more than
                    the current year plus 1
                  </li>
                </ul>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row">
              <div className="col-4 mb-3">
                <Input
                  name="prj_cd"
                  type="text"
                  label="Project Code"
                  register={register}
                  error={errors.prj_cd}
                />
              </div>
              <div className="col-4 mb-3">
                <Input
                  name="prj_nm"
                  label="Project Name"
                  type="text"
                  register={register}
                  error={errors.prj_nm}
                />
              </div>

              <div className="col-4 mb-3">
                <ControlledSelect
                  name="prj_ldr"
                  label="Project Lead"
                  options={project_leads}
                  control={control}
                  error={errors.prj_ldr}
                  placeholder="Select project lead..."
                />
              </div>
            </div>

            <div className="row">
              <div className="col-3 mb-3">
                <Input
                  name="prj_date0"
                  label="Start Date"
                  type="date"
                  register={register}
                  error={errors.prj_date0}
                />
              </div>

              <div className="col-3 mb-3">
                <Input
                  name="prj_date1"
                  label="End Date"
                  type="date"
                  register={register}
                  error={errors.prj_date1}
                />
              </div>

              <div className="col-3 mb-3">
                <ControlledSelect
                  name="lake"
                  label="Lake"
                  options={lakes}
                  control={control}
                  error={errors.lake}
                />
              </div>

              <div className="col-3 mb-3">
                <ControlledSelect
                  name="protocol"
                  label="Protocol"
                  options={protocols}
                  control={control}
                  error={errors.protocol}
                  placeholder="Select protocol..."
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="comment0" className="form-label">
                Project Description
              </label>
              <textarea
                style={{ height: "200px" }}
                type="text"
                className={
                  errors.comment0 ? "form-control is-invalid" : "form-control"
                }
                id="comment0"
                {...register("comment0")}
                //defaultValue={state.comment0}
                //required
              />
              {errors.comment0 && (
                <div className="invalid-feedback">
                  {errors.comment0.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="field-protocol" className="form-label">
                Field Protocol:
              </label>
              <input
                className="form-control"
                type="file"
                id="field-protocol"
                accept=".doc,.docx,.pdf"
                disabled={true}
              />
              <div id="field-protocol-help" className="form-text">
                Protocol will be uploaded to Project Tracker
              </div>
            </div>

            <hr />

            <div className="row justify-content-end">
              <div className="col-2">
                <button type="submit" className="btn btn-primary">
                  Next
                  <span className="px-1">
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(FN011);
