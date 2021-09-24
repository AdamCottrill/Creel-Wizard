import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import {
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

import { updateAction } from "../actions";

const FN026 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

  const defaultValues = [
    {
      space: "00",
      space_des: "Project Study Area",
      ddlat: "",
      ddlon: "",
    },
  ];

  const initialValues = state.fn026 || defaultValues;

  const { register, handleSubmit, control } = useForm({
    defaultValues: { fn026: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn026",
  });

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./gear");
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          Spatial Strata - FN026
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
        <div className="alert alert-warning" role="alert">
          This form is likely to change as the modernization process progresses
          and we collectively decide on how we want to capture spatial
          information associated with our projects. For now, the minimal
          requirement is a space name, description, and coordinate to plot a
          point on a map for each spatial strata.
        </div>

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
        <p>
          Like seasons, there is no limit on the number of spatial strata that
          can be specified.
        </p>

        {showRules && (
          <div className="card mt-2 mb-3">
            <div className="card-body">
              <h5 className="card-title">Validation Rules</h5>
              <ul>
                <li>Space code must be unique within a project</li>
                <li>
                  Every sample must belong to one, and only one spatial strata
                </li>
                <li>Spatial strata cannot overlap.</li>
                <li>
                  Spatial strata can be either points or polygons (some day)
                </li>
                <li>
                  Latidude and longitude represent the centroid of the spatial
                  strata and must be within the envelope of the lake
                </li>
              </ul>
            </div>
          </div>
        )}

        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => (
            <div className="row" key={item.id}>
              <div className="col-1 mb-3">
                <label htmlFor={`space-${index}`} className="form-label">
                  Space
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`space-${index}`}
                  {...register(`fn026.${index}.space`)}
                  //defaultValue={state.space || "00"}
                  required
                />
              </div>

              <div className="col-5 mb-3">
                <label htmlFor={`space-des-${index}`} className="form-label">
                  Space Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`space-des-${index}`}
                  {...register(`fn026.${index}.space_des`)}
                  //defaultValue={state.space_des || "Default Space"}
                  required
                />
              </div>

              <div className="col-2 mb-3">
                <label htmlFor={`dd-lat-${index}`} className="form-label">
                  Latitude
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`dd-lat-${index}`}
                  {...register(`fn026.${index}.dd_lat`)}
                  //defaultValue={state.dd_lat}
                  required
                />
              </div>

              <div className="col-2 mb-3">
                <label htmlFor={`dd-lon-${index}`} className="form-label">
                  Longitude
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`dd-lon-${index}`}
                  {...register(`fn026.${index}.dd_lon`)}
                  //defaultValue={state.dd_lon}
                  required
                />
              </div>

              <div className="col-2 mb-3 align-self-end">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Move or delete spatial strata"
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => move(index, index + 1)}
                    disabled={index === fields.length - 1}
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}

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
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  append({
                    space: "00",
                    space_des: "Study Area",
                    dd_lat: "",
                    dd_lon: "",
                  });
                }}
              >
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
