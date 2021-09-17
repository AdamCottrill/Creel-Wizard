import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { FaArrowRight } from "react-icons/fa";

import { updateFN011 } from "../actions";

const FN011 = (props) => {
  const { actions, state } = useStateMachine({ updateFN011 });

  const initialValues = state.fn011 || {};

  const project_leads = [
    { value: "hs", label: "Homer Simpson" },
    { value: "mb", label: "Monty Burns" },
    { value: "bg", label: "Barny Gumble" },
    { value: "fn", label: "Ned Flanders" },
  ];

  const protocols = [
    { value: "bsm", label: "Broad Scale Monitoring (BSM)" },
    { value: "fwin", label: "Fall Walleye Index Netting (FWIN)" },
    { value: "osia", label: "Offshore Index (OSIA)" },
    { value: "estn", label: "Early Spring Trap Netting (ESTN)" },
    { value: "nscin", label: "Near Shore Community Index Netting (NSCIN)" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    actions.updateFN011(data);
    props.history.push("./fn022");
  };

  return (
    <>
      <p>
        This Fishnet Project Setup Wizard will step through a number of forms to
        collect basic information about your project. Once the forms are
        complete, a project entry will be created in FN_Portal and a link to a
        pre-configured data entry template database will be provided for you to
        download and populate.
      </p>
      <p>Let's get started with some basic information about the project.</p>
      <div className="card">
        <div className="card-header">Basic Project Setup - FN011</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-4 mb-3">
                <label htmlFor="prj_cd" className="form-label">
                  Project Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prj_cd"
                  {...register("prj_cd")}
                  required
                />
              </div>

              <div className="col-4 mb-3">
                <label htmlFor="prj_nm" className="form-label">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prj_nm"
                  {...register("prj_nm")}
                  //defaultValue={state.prj_nm}
                  required
                />
              </div>

              <div className="col-4 mb-3">
                <label htmlFor="select-prj-ldr" className="form-label">
                  Project Lead
                </label>

                <Controller
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      inputRef={ref}
                      value={project_leads.find((c) => c.value === value)}
                      name={name}
                      placeholder="Select project lead..."
                      className={
                        errors.prj_ldr ? "form-control is-invalid" : null
                      }
                      options={project_leads}
                      onChange={(prj_ldr) => {
                        onChange(prj_ldr.value);
                      }}
                    />
                  )}
                  name={"prj_ldr"}
                  rules={{ required: true }}
                />
                {errors.prj_ldr && (
                  <div className="invalid-feedback">
                    Please select a project lead.
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-3 mb-3">
                <label htmlFor="prj_date0" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="prj_date0"
                  {...register("prj_date0")}
                  required
                />
              </div>

              <div className="col-3 mb-3">
                <label htmlFor="prj_date1" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="prj_date1"
                  {...register("prj_date1")}
                  required
                />
              </div>

              <div className="col-3 mb-3">
                <label htmlFor="select-lake" className="form-label">
                  Lake
                </label>

                <select
                  id="select-lake"
                  {...register("lake")}
                  className="form-select"
                  aria-label="Select Lake"
                  defaultValue=""
                  required
                >
                  <option value="">Select lake...</option>
                  <option value="HU">Huron</option>
                  <option value="ER">Erie</option>
                  <option value="ON">Ontario</option>
                  <option value="SC">St. Clare</option>
                  <option value="SU">Superior</option>
                </select>
              </div>

              <div className="col-3 mb-3">
                <label htmlFor="select-protocol" className="form-label">
                  Protocol
                </label>

                <Controller
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      id="select-protocol"
                      inputRef={ref}
                      className={
                        errors.protocol ? "form-control is-invalid" : null
                      }
                      aria-label="Select Protocol"
                      placeholder="Select protocol..."
                      value={protocols.find((c) => c.value === value)}
                      name={name}
                      options={protocols}
                      onChange={(item) => {
                        onChange(item.value);
                      }}
                    />
                  )}
                  name={"protocol"}
                  rules={{ required: true }}
                />

                {errors.protocol && (
                  <div className="invalid-feedback">
                    Please select a protocol.
                  </div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="comment0" className="form-label">
                Project Description
              </label>
              <textarea
                style={{ height: "200px" }}
                type="text"
                className="form-control"
                id="comment0"
                {...register("comment0")}
                //defaultValue={state.comment0}
                required
              />
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
