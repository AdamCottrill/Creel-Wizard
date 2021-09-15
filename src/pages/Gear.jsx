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

const Gear = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const process_types = [
    { id: 1, name: "whole net" },
    { id: 2, name: "by panel by mesh" },
    { id: 3, name: "by mesh" },
    { id: 4, name: "by panel" },
    { id: 5, name: "by panel groups" },
  ];

  const defaultValues = [
    {
      gear_code: "",
      process_types: process_types.map((ptype) => {
        return { id: ptype.id, name: ptype.name, selected: false };
      }),
    },
  ];

  const initialValues = state.gr || defaultValues;

  const { register, control, handleSubmit } = useForm({
    defaultValues: { gr: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "gr",
  });

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./fn028");
  };

  return (
    <div className="card">
      <div className="card-header">Gear and Process Types</div>
      <div className="card-body">
        <p>
          This form will capture which gears are going to be used in this
          project and how the catch in those gears will be processed. Available
          gear choices will be dependent on the selected protocol, and available
          process types will be limited to those that are known for the selected
          gears - e.g. - Trap nets have a single process type, FWIN nets can be
          by net or by panel.
        </p>

        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <div className="card mb-2" key={item.id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-3 mb-3">
                      <label
                        htmlFor={`select-gear-${index}`}
                        className="form-label"
                      >
                        Gear
                      </label>

                      <select
                        id={`select-gear-${index}`}
                        {...register(`gr.${index}.gear_code`)}
                        className="form-select"
                        aria-label="Select Gear"
                        required
                        defaultValue=""
                      >
                        <option value="">Select gear...</option>
                        <option value="gl21">
                          GL21 - Huron Offshore Index Gillnet
                        </option>
                        <option value="gl50">GL50 - FWIN Gillnet</option>
                        <option value="na1">
                          NA1 - BSM Large Mesh Gillnet
                        </option>
                        <option value="on2">
                          ON2 - BSM Small Mesh Gillnet
                        </option>
                        <option value="tp08">TP08 - 8' NCSIN Trapnet </option>
                        <option value="gl38">
                          GL38 - 38 mm SLIN/FLIN Gillnet
                        </option>
                        <option value="gl51">
                          GL51 - 51 mm SLIN/FLIN Gillnet
                        </option>
                        <option value="gl64">
                          GL64 - 64 mm SLIN/FLIN Gillnet
                        </option>
                      </select>
                    </div>

                    <div className="col-7 mb-3">
                      <div className="row">
                        <p>Process Type:</p>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          {(item.process_types || []).map((ptype) => {
                            return (
                              <div
                                className="form-check form-check-inline"
                                key={`process-type-${index}-${ptype.id}`}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name={`process-type-${index}`}
                                  id={`process-type-${index}-${ptype.id}`}
                                  value={`process-type-${ptype.selected}`}
                                  {...register(
                                    `gr.process_types.${index}.${ptype.id}`
                                  )}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`process-type-${index}-${ptype.id}`}
                                >
                                  {ptype.name}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="col-2 mb-3 align-self-end">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Move or delete gear"
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
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <hr />

          <div className="row justify-content-between">
            <div className="col-2">
              <Link to="/fn026">
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
                  append(defaultValues[0]);
                }}
              >
                <span className="px-1">
                  <FaPlus />
                </span>
                Add Another Gear
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

export default withRouter(Gear);
