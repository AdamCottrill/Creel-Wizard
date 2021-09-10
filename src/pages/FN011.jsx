import React from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { FaArrowRight } from "react-icons/fa";

import updateAction from "../updateAction";

const FN011 = (props) => {
  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./fn022");
  };

  return (
    <>
      <p>
        This Fishnet Project Wizard will step through a number of forms to
        collect basic information about your project. Once the forms are
        complete, a project entry will be create in FN_Portal and a link to a
        pre-configured data entry template database will be provided.
      </p>
      <p>
        Lets get start. Can you tell us some basic information about the
        project?
      </p>
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
                  defaultValue={state.prj_cd}
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
                  defaultValue={state.prj_nm}
                  required
                />
              </div>

              <div className="col-4 mb-3">
                <label htmlFor="select-prj-ldr" className="form-label">
                  Project Lead
                </label>
                <select
                  {...register("lake")}
                  className="form-select"
                  required
                  aria-label="Select Project Lead"
                >
                  <option selected>Select project lead...</option>
                  <option value="hs">Homer Simpson</option>
                  <option value="mb">Monty Burns</option>
                  <option value="bg">Barny Gumble</option>
                  <option value="fn">Ned Flanders</option>
                </select>
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
                  defaultValue={state.prj_date0}
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
                  defaultValue={state.prj_date1}
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
                  required
                >
                  <option selected>Select lake...</option>
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

                <select
                  id="select-protocol"
                  {...register("protocol")}
                  className="form-select"
                  aria-label="Select Protocol"
                  required
                >
                  <option selected>Select protocol...</option>
                  <option value="bsm">Broad Scale Monitoring (BSM)</option>
                  <option value="fwin">
                    Fall Walleye Index Netting (FWIN)
                  </option>
                  <option value="osia">Offshore Index (OSIA)</option>
                  <option value="estn">Early Spring Trap Netting (ESTN)</option>
                  <option value="nscin">
                    Near Shore Community Index Netting (NSCIN)
                  </option>
                </select>
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
                defaultValue={state.comment0}
                required
              />
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
