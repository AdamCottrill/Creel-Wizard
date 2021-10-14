import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-query";
import { useStateMachine } from "little-state-machine";

import { getGears } from "../services/api";

import schema from "../schemas/FN028";
import { updateAction } from "../actions";
import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";
import { Input, Select } from "../components/FormControls";

const FN028 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

  const orient_options = [
    { value: "1", label: "Across Contours (1)" },
    { value: "2", label: "With Contours (2)" },
    { value: "9", label: "No Reported (9)" },
    { value: "u", label: "Upstream (U)" },
    { value: "d", label: "Downstream (d)" },
  ];

  const settype_options = [
    { value: "b", label: "On Bottom (B)" },
    { value: "c", label: "Canned (C)" },
    { value: "k", label: "Kited (K)" },
    { value: "s", label: "Stepped (S)" },
    { value: "t", label: "Thermocline (T)" },
    { value: "9", label: "Not Reported (9)" },
  ];

  const {
    data: gear_options,
    error: gears_error,
    isLoading: gears_loading,
  } = useQuery("gears", getGears);

  const gears_in_state = state.gear_array.map((x) => x.gear);

  // by default we are going to create one record for each gear
  const defaultValues = gears_in_state.map((gr, i) => {
    const orient_val = "1";
    const orient = orient_options.filter((x) => x.value === orient_val)[0];
    const settype_val = "b";
    const settype = settype_options.filter((x) => x.value === settype_val)[0];

    return {
      mode: `${i}0`,
      mode_des: `${gr}-${orient.label}-${settype.label}`,
      gear: gr,
      orient: orient.value,
      set_type: settype.value,
    };
  });

  //const initialValues = state.fn028 || defaultValues;
  const initialValues = defaultValues;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { fn028: initialValues },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn028",
  });

  if (gears_loading) return "Loading...";

  if (gears_error) return "An error has occurred: " + gears_error.message;

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
              <div className="row" key={item.id}>
                <div className="col-1 mb-3">
                  <Input
                    name={`fn028.${index}.mode`}
                    label="Mode"
                    type="text"
                    register={register}
                    error={errors?.fn028?.[index]?.mode}
                  />
                </div>

                <div className="col-3 mb-3">
                  <Input
                    name={`fn028.${index}.mode_des`}
                    label="Mode Description"
                    type="text"
                    register={register}
                    error={errors?.fn028?.[index]?.mode_des}
                  />
                </div>

                <div className="col-2 mb-3">
                  <Select
                    name={`fn028.${index}.gear`}
                    label="Gear"
                    register={register}
                    placeHolder="Select gear..."
                    options={gear_options.filter((x) =>
                      gears_in_state.includes(x.value)
                    )}
                    errors={errors}
                  />
                </div>

                <div className="col-2 mb-3">
                  <Select
                    name={`fn028.${index}.orient`}
                    label="Orient"
                    defaultValue=""
                    placeHolder="Select orient..."
                    register={register}
                    options={orient_options}
                    error={errors?.fn028?.[index]?.orient}
                  />
                </div>

                <div className="col-2 mb-3">
                  <Select
                    name={`fn028.${index}.set_type`}
                    label="Set Type"
                    defaultValue=""
                    placeHolder="Select Set Type..."
                    register={register}
                    options={settype_options}
                    error={errors?.fn028?.[index]?.set_type}
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
