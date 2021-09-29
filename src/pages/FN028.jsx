import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";

import { updateAction } from "../actions";
import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";
import { Input, Select } from "../components/FormControls";

const FN028 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { fn028: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn028",
  });

  const orient_options = [
    //{ value: "", label: "Select orient..." },
    { value: "1", label: "1 - Across Contours" },
    { value: "2", label: "2 - With Contours" },
    { value: "9", label: "9 - No Reported" },
    { value: "u", label: "U - Upstream" },
    { value: "d", label: "D - Downstream " },
  ];

  const settype_options = [
    { value: "", label: "Select set type..." },
    { value: "b", label: "B - Bottom" },
    { value: "c", label: "C - Canned" },
    { value: "k", label: "K - Kited" },
    { value: "s", label: "S - Stepped" },
    { value: "t", label: "T - Thermocline" },
    { value: "9", label: "9 - Not Reported" },
  ];

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./result");
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          Fishing Mode - FN028
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
        </p>

        {showRules && (
          <div className="card mt-2 mb-3">
            <div className="card-body">
              <h5 className="card-title">Validation Rules</h5>
              <ul>
                <li>each mode code must be unique within a project</li>
                <li>each mode descriptions must be unique</li>
                <li>each gear is presented at least once.</li>
                <li>
                  combinaions of gear, orient, and set-type must be unique
                </li>
                <li>all fields are required</li>
                <li>every sample must belong to one, and only one mode</li>
              </ul>
            </div>
          </div>
        )}

        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-1 mb-3">
                  <Input
                    name={`fn028.${index}.mode`}
                    label="Mode"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-3 mb-3">
                  <Input
                    name={`fn028.${index}.mode_des`}
                    label="Mode Description"
                    type="text"
                    register={register}
                    errors={errors}
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
                  <Select
                    name={`fn028.${index}.orient`}
                    label="Orient"
                    defaultValue=""
                    placeholder="Select orient..."
                    register={register}
                    options={orient_options}
                    errors={errors}
                  />
                </div>

                <div className="col-2 mb-3">
                  <Select
                    name={`fn028.${index}.set_type`}
                    label="Set Type"
                    defaultValue=""
                    placeholder="Select Set Type..."
                    register={register}
                    options={settype_options}
                    errors={errors}
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

          <hr />

          <ButtonBar
            append_values={defaultValues[0]}
            button_label="Add Another Mode"
            back_link="/gear"
            append={append}
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(FN028);
