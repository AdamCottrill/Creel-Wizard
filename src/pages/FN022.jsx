import React, { useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";

import { updateAction } from "../actions";
import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";

const FN022 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

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
      <div className="card-header">
        <div className="d-flex justify-content-between">
          Seasons - FN022
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
        <p>
          This form will be used to capture informatin about the seasons
          (temporal strata) assocaited with this project. Not all projects have
          seasonal components, if none are specified, a default value will be
          created using the project start and end dates.
        </p>

        <p>There is no limit on the number of seasons that can be specified.</p>

        {showRules && (
          <div className="card mt-2 mb-3">
            <div className="card-body">
              <h5 className="card-title">Validation Rules</h5>
              <ul>
                <li>season code must be unique within a project</li>
                <li>season descriptions must be unique within a project</li>
                <li>
                  season dates must be contained within the projet start and end
                  dates
                </li>
                <li>season dates cannot overlap</li>
                <li>every sample must belong to one, and only one season</li>
              </ul>
            </div>
          </div>
        )}

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

                <FieldArrayButtons
                  index={index}
                  fields={fields}
                  remove={remove}
                  move={move}
                />
              </div>
            );
          })}

          {/* endo of field array */}

          <hr />
          <ButtonBar
            append_values={defaultValues[0]}
            button_label="Add a Season"
            back_link="/"
            append={append}
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(FN022);
