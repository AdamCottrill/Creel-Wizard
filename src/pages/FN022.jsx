import React from "react";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import updateAction from "../updateAction";

const FN022 = (props) => {
  const { register, handleSubmit } = useForm();
  const { state, actions } = useStateMachine({ updateAction });
  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./fn026");
  };

  return (
    <div className="card">
      <div className="card-header">Seasons - FN022</div>
      <div className="card-body">
        <p>
          This form will be used to capture informatin about the seasons
          (temporal strata) assocaited with this project. Not all projects have
          seasonal components, if none are specified, a default value will be
          created using the project start and end dates.
        </p>

        <p>
          There is no limit on the number of seasons that can be specified,
          however they must be consistent with these constraints:
        </p>
        <ul>
          <li>season code must be unique within a project</li>
          <li>season dates cannot overlap</li>
          <li>
            season dates must be contained within the projet start and end dates
          </li>
          <li>every sample must belong to one, and only one season</li>
        </ul>

        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-2 mb-3">
              <label htmlFor="ssn" className="form-label">
                Season
              </label>
              <input
                type="text"
                className="form-control"
                id="ssn"
                {...register("ssn")}
                defaultValue={state.ssn || "00"}
                required
              />
            </div>

            <div className="col-4 mb-3">
              <label htmlFor="ssn-des" className="form-label">
                Season Description
              </label>
              <input
                type="text"
                className="form-control"
                id="ssn-des"
                {...register("ssn_des")}
                defaultValue={state.ssn_des || "Default Season"}
                required
              />
            </div>

            <div className="col-3 mb-3">
              <label htmlFor="ssn_date0" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="ssn_date0"
                {...register("ssn_date0")}
                defaultValue={state.prj_date0}
                required
              />
            </div>

            <div className="col-3 mb-3">
              <label htmlFor="ssn_date1" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="ssn_date1"
                {...register("ssn_date1")}
                defaultValue={state.prj_date1}
                required
              />
            </div>
          </div>

          <hr />

          <div className="row justify-content-between">
            <div className="col-2">
              <Link to="/">
                <button type="button" className="btn btn-primary">
                  <span className="px-1">
                    <FaArrowLeft />
                  </span>
                  Back
                </button>
              </Link>
            </div>

            <div className="col-2">
              <button type="button" className="btn btn-secondary">
                <span className="mx-1">
                  <FaPlus />
                </span>
                Add a Season
              </button>
            </div>

            <div className="col-2">
              <button type="submit" className="btn btn-primary">
                Next
                <span className="ps-2">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(FN022);
