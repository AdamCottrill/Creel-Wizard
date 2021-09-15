import React from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import {
  FaPlus,
  FaTrash,
  FaArrowDown,
  FaArrowUp,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

import { updateAction } from "../actions";

const FN022 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const defaultValues = [
    {
      ssn: "00",
      ssn_des: "Default Season",
      ssn_date0: state.fn011.prj_date0,
      ssn_date1: state.fn011.prj_date1,
    },
  ];

  const initialValues = state.fn022 || defaultValues;

  const {
    register,
    control,
    handleSubmit,
    //formState: { errors },
  } = useForm({ defaultValues: { fn022: initialValues } });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn022",
  });

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
          {fields.map((item, index) => {
            return (
              <div className="row" key={item.id}>
                <div className="col-1 mb-3">
                  <label htmlFor={`ssn-${index}`} className="form-label">
                    Season
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`ssn-${index}`}
                    {...register(`fn022.${index}.ssn`)}
                    defaultValue={initialValues[`fn022.${index}.ssn`] || "00"}
                    required
                  />
                </div>

                <div className="col-3 mb-3">
                  <label htmlFor={`ssn-des-${index}`} className="form-label">
                    Season Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`ssn-des-${index}`}
                    {...register(`fn022.${index}.ssn_des`)}
                    defaultValue={
                      initialValues[`fn022.${index}.ssn_des`] ||
                      "Default Season"
                    }
                    required
                  />
                </div>

                <div className="col-3 mb-3">
                  <label htmlFor={`ssn_date0-${index}`} className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`ssn_date0-${index}`}
                    {...register(`fn022.${index}.ssn_date0`)}
                    defaultValue={initialValues[`fn022.${index}.ssn_date0`]}
                    required
                  />
                </div>

                <div className="col-3 mb-3">
                  <label htmlFor={`ssn_date1-${index}`} className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`ssn_date1-${index}`}
                    {...register(`fn022.${index}.ssn_date1`)}
                    defaultValue={initialValues[`fn022.${index}.ssn_date1`]}
                    required
                  />
                </div>

                <div className="col-2 mb-3 align-self-end">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Move or delete seasons"
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
                      disabled={index == fields.length - 1}
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => remove(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* endo of field array */}

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
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  append({
                    ssn: "00",
                    ssn_des: "Default Season",
                    ssn_date0: state.fn011.prj_date0,
                    ssn_date1: state.fn011.prj_date1,
                  });
                }}
              >
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
