import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";

import { updateAction } from "../actions";

import {
  FaPlus,
  FaTrash,
  FaArrowDown,
  FaArrowUp,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

const FN028 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const defaultValues = [
    {
      mode: "00",
      mode_des: "Default Mode",
      gear: "",
      orient: "",
      set_type: "",
    },
  ];

  const initialValues = state.fn028 || defaultValues;

  const { register, handleSubmit, control } = useForm({
    defaultValues: { fn028: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn028",
  });

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./result");
  };

  return (
    <div className="card">
      <div className="card-header">Fishing Mode - FN028</div>
      <div className="card-body">
        <p>
          This form will be used to capture information on the fishing modes
          used in this project. Fishing modes define how the gear will be
          deployed. Particularly with respect to water depth and depth contours.
        </p>

        <p>
          It may be helpful to think of modes as quick descriptions of how your
          gear will be deployed (and reported on at the end of the project) for
          example:
        </p>

        <ul>
          <li>GL50 set on bottom across depth contours</li>
          <li>GL89 canned in the thermocline along depth contours</li>
          <li>TP08 set on bottom perpendicular to shore</li>
        </ul>

        <p>
          The number of modes is limited to the combination of gears, orients,
          and set types used in your project. Generally fewer modes are better
          than more, and at least one mode is required for each gear.
          Additionally, modes must be consistent with these constraints:
        </p>
        <ul>
          <li>each mode code must be unique within a project</li>
          <li>combinaions of gear, orient, and set-type must be unique</li>
          <li>every sample must belong to one, and only one mode</li>
        </ul>

        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-1 mb-3">
                  <label htmlFor={`mode-${index}`} className="form-label">
                    Mode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`mode-${index}`}
                    {...register(`fn028.${index}.mode`)}
                    defaultValue="00"
                    required
                  />
                </div>

                <div className="col-3 mb-3">
                  <label htmlFor={`mode-des-${index}`} className="form-label">
                    Mode Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`mode-des-${index}`}
                    {...register(`fn028.${index}.mode_des`)}
                    defaultValue={state.mode_des || "Default Mode"}
                    required
                  />
                </div>

                <div className="col-2 mb-3">
                  <label
                    htmlFor={`select-gear-${index}`}
                    className="form-label"
                  >
                    Gear
                  </label>

                  <select
                    id={`select-gear-${index}`}
                    {...register(`fn028.${index}.gear`)}
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
                    <option value="na1">NA1 - BSM Large Mesh Gillnet</option>
                    <option value="on2">ON2 - BSM Small Mesh Gillnet</option>
                    <option value="tp08">TP08 - 8' NCSIN Trapnet </option>
                    <option value="gl38">GL38 - 38 mm SLIN/FLIN Gillnet</option>
                    <option value="gl51">GL51 - 51 mm SLIN/FLIN Gillnet</option>
                    <option value="gl64">GL64 - 64 mm SLIN/FLIN Gillnet</option>
                  </select>
                </div>

                <div className="col-2 mb-3">
                  <label
                    htmlFor={`select-orient-${index}`}
                    className="form-label"
                  >
                    Orient
                  </label>

                  <select
                    id={`select-orient-${index}`}
                    {...register(`fn028.${index}.orient`)}
                    className="form-select"
                    aria-label="Select Orient"
                    required
                    defaultValue=""
                  >
                    <option value="">Select orient...</option>
                    <option value="1">1 - Across Contours</option>
                    <option value="2">2 - With Contours</option>
                    <option value="9">9 - No Reported</option>
                    <option value="u">U - Upstream</option>
                    <option value="d">D - Downstream </option>
                  </select>
                </div>

                <div className="col-2 mb-3">
                  <label
                    htmlFor={`select-set-type-${index}`}
                    className="form-label"
                  >
                    Set Type
                  </label>

                  <select
                    id={`select-set-type-${index}`}
                    {...register(`fn028.${index}.set_type`)}
                    className="form-select"
                    aria-label="Select Set Type"
                    required
                  >
                    <option value="">Select set type...</option>
                    <option value="b">B - Bottom</option>
                    <option value="c">C - Canned</option>
                    <option value="k">K - Kited</option>
                    <option value="s">S - Stepped</option>
                    <option value="t">T - Thermocline</option>
                    <option value="9">9 - Not Reported</option>
                  </select>
                </div>

                <div className="col-2 mb-3 align-self-end">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Move or delete modes"
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
            );
          })}

          <hr />

          <div className="row justify-content-between">
            <div className="col-2">
              <Link to="/gear">
                <button type="button" className="btn btn-primary">
                  <FaArrowLeft />
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
                <FaPlus />
                Add Another Mode
              </button>
            </div>

            <div className="col-2">
              <button type="" className="btn btn-primary">
                Create Project
                <FaArrowRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(FN028);
