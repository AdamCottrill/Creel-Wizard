import React from "react";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import updateAction from "../updateAction";

const FN026 = (props) => {
  const { register, handleSubmit } = useForm();
  const { state, actions } = useStateMachine({ updateAction });
  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./gear");
  };

  return (
    <div className="card">
      <div className="card-header">Spatial Strata - FN026</div>
      <div className="card-body">
        <p>
          This form will be used to identify spatial strata used in the design
          of the project. If no spatial strata are defined, a single default
          strata will be created using the spatial extent of the sampling
          points. Multiple spatial strata can be defined. For now, they will be
          simple records, but in future could include interactive map to select
          points, or dynamic select widget that can be populated from
          known/existing spatial strata that have been used in previous
          projects.
        </p>
        <ul>
          <li>Spatial strata can be either points or polygons</li>
          <li>Every sample must belong to one, and only one spatial strata</li>
          <li>Spatial strata cannot overlap.</li>
        </ul>

        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-2 mb-3">
              <label htmlFor="space" className="form-label">
                Space
              </label>
              <input
                type="text"
                className="form-control"
                id="space"
                {...register("space")}
                defaultValue={state.space || "00"}
                required
              />
            </div>

            <div className="col-4 mb-3">
              <label htmlFor="space-des" className="form-label">
                Space Description
              </label>
              <input
                type="text"
                className="form-control"
                id="space-des"
                {...register("space_des")}
                defaultValue={state.space_des || "Default Space"}
                required
              />
            </div>

            <div className="col-3 mb-3">
              <label htmlFor="dd-lat" className="form-label">
                Latitude
              </label>
              <input
                type="text"
                className="form-control"
                id="dd-lat"
                {...register("dd_lat")}
                defaultValue={state.dd_lat}
                required
              />
            </div>

            <div className="col-3 mb-3">
              <label htmlFor="dd-lon" className="form-label">
                Longitude
              </label>
              <input
                type="text"
                className="form-control"
                id="dd-lon"
                {...register("dd_lon")}
                defaultValue={state.dd_lon}
                required
              />
            </div>
          </div>

          <hr />

          <div className="row justify-content-between">
            <div className="col-2">
              <Link to="/fn022">
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
                <span className="px-1">
                  <FaPlus />
                </span>
                Add Another Space
              </button>
            </div>

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
  );
};

export default withRouter(FN026);
