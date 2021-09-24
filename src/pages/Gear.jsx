import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "react-query";
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

import { getGears } from "../services/api";

import { updateAction } from "../actions";

const Gear = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

  const {
    data: gears,
    error: gears_error,
    isLoading: gears_loading,
  } = useQuery("gears", getGears);

  // const process_types = [
  //   { id: 1, name: "whole net" },
  //   { id: 2, name: "by panel by mesh" },
  //   { id: 3, name: "by mesh" },
  //   { id: 4, name: "by panel" },
  //   { id: 5, name: "by panel groups" },
  // ];

  const defaultValues = [
    {
      gear_code: { value: "", label: "Select a gear..." },
    },
  ];

  const initialValues = state.gear_array || defaultValues;

  const {
    //    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { gear_array: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "gear_array",
  });

  if (gears_loading) return "Loading...";

  if (gears_error) return "An error has occurred: " + gears_error.message;

  if (gears) console.log("gears = ", gears);

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./fn028");
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

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <div className="card mb-2" key={field.id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-3 mb-3">
                      <Controller
                        key={field.id}
                        name={`gear_array.${index}.gear_code`}
                        isClearable
                        control={control}
                        render={({ field }) => (
                          <Select {...field} options={gears} />
                        )}
                      />

                      {/* <Controller */}
                      {/*   control={control} */}
                      {/*   defaultValue="" */}
                      {/*   name={`select-gear-${index}`} */}
                      {/*   render={({ field: { onChange, value, name, ref } }) => { */}
                      {/*     //debugger; */}
                      {/*     return ( */}
                      {/*       <Select */}
                      {/*         id={`select-gear-${index}`} */}
                      {/*         //{...register(`gr.${index}.gear_code`)} */}
                      {/*         inputRef={ref} */}
                      {/*         aria-label="Select Gear" */}
                      {/*         placeholder="Select gear..." */}
                      {/*         value={gears.find((c) => c.value === value)} */}
                      {/*         name={name} */}
                      {/*         options={gears} */}
                      {/*         defaultValue={defaultValues.gear_code} */}
                      {/*         onChange={(field) => { */}
                      {/*           onChange(field.value); */}
                      {/*         }} */}
                      {/*       /> */}
                      {/*     ); */}
                      {/*   }} */}
                      {/* /> */}

                      {errors.gear && (
                        <div className="invalid-feedback">
                          Please select a gear.
                        </div>
                      )}
                    </div>

                    {/* <div className="col-7 mb-3"> */}
                    {/*   <div className="row"> */}
                    {/*     <p>Process Type:</p> */}
                    {/*   </div> */}
                    {/*   <div className="row"> */}
                    {/*     <div className="col-12"> */}
                    {/*       {(field.process_types || []).map((ptype) => { */}
                    {/*         return ( */}
                    {/*           <div */}
                    {/*             className="form-check form-check-inline" */}
                    {/*             key={`process-type-${index}-${ptype.id}`} */}
                    {/*           > */}
                    {/*             <input */}
                    {/*               className="form-check-input" */}
                    {/*               type="checkbox" */}
                    {/*               name={`process-type-${index}`} */}
                    {/*               id={`process-type-${index}-${ptype.id}`} */}
                    {/*               value={`process-type-${ptype.selected}`} */}
                    {/*               {...register( */}
                    {/*                 `gear_array.process_types.${index}.${ptype.id}` */}
                    {/*               )} */}
                    {/*             /> */}
                    {/*             <label */}
                    {/*               className="form-check-label" */}
                    {/*               htmlFor={`process-type-${index}-${ptype.id}`} */}
                    {/*             > */}
                    {/*               {ptype.name} */}
                    {/*             </label> */}
                    {/*           </div> */}
                    {/*         ); */}
                    {/*       })} */}
                    {/*     </div> */}
                    {/*   </div> */}
                    {/* </div> */}

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
                          disabled={fields.length === 1}
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
