import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ReactSelect from "react-select";

import { useQuery } from "react-query";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";

import schema from "../schemas/Gear";
import { getGears } from "../services/api";
import { ControlledSelect } from "../components/FormControls";
import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";

import { updateAction } from "../actions";

const Gear = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

  const {
    data: gear_options,
    error: gears_error,
    isLoading: gears_loading,
  } = useQuery("gears", getGears);

  const defaultValues = [
    {
      gear: "",
      process_types: [],
    },
  ];

  const initialValues = state.gear_array || defaultValues;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { gear_array: initialValues },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "gear_array",
  });

  const gear_array = watch("gear_array");

  if (gears_loading) return "Loading...";

  if (gears_error) return "An error has occurred: " + gears_error.message;

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./fn028");
  };

  if (gear_options) {
    console.log("gear_options = ", gear_options);
  }

  const getProcessTypes = (field) => {
    const ptypes = gear_options.filter((x) => x.value === field)[0];

    if (typeof ptypes !== "undefined") {
      return ptypes.process_types;
    } else {
      return [];
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          Gear and Process Types
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
          This form will capture which gears are going to be used in this
          project and how the catch in those gears will be processed. Available
          gear choices will be dependent on the selected protocol, and available
          process types will be limited to those that are known for the selected
          gears - e.g. - Trap nets have a single process type, FWIN nets can be
          by net or by panel.
        </p>

        {showRules && (
          <div className="card mt-2 mb-3">
            <div className="card-body">
              <h5 className="card-title">Validation Rules</h5>
              <ul>
                <li>at least one gear and one process type is required.</li>
                <li>gears must be unique ('GL50' can't be selected twice)</li>
              </ul>
            </div>
          </div>
        )}

        <hr />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((field, index) => {
            return (
              <div className="card mb-2" key={field.id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 mb-3">
                      <ControlledSelect
                        name={`gear_array.${index}.gear`}
                        label="Gear"
                        defaultValue=""
                        options={gear_options}
                        control={control}
                        errors={errors}
                        placeholder="Select gear..."
                        index={index}
                      />
                    </div>

                    <div className="col-6 mb-3">
                      <div className="row">
                        <div className="col-12">
                          <label
                            htmlFor={`process-types.${index}`}
                            className="form-label"
                          >
                            Process Types:
                          </label>
                          <Controller
                            name={`gear_array.${index}.process_types`}
                            control={control}
                            defaultValue={[]}
                            render={({
                              field: { onChange, value, name, ref },
                            }) => (
                              <ReactSelect
                                //isDisabled={gear_array[index].gear === ""}
                                inputRef={ref}
                                onChange={onChange}
                                value={[...value]}
                                name={name}
                                options={getProcessTypes(
                                  gear_array[index].gear
                                )}
                                getOptionValue={(option) => option.process_type}
                                isMulti
                              />
                            )}
                          />
                          {errors?.gear_array?.[index]?.process_types && (
                            <div className="invalid-feedback">
                              {errors.gear_array[index].process_types.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <FieldArrayButtons
                      index={index}
                      fields={fields}
                      remove={remove}
                      move={move}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <hr />

          <ButtonBar
            append_values={defaultValues[0]}
            button_label="Add Another Gear"
            back_link="/fn026"
            append={append}
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(Gear);
