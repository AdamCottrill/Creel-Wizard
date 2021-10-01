import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
      //process_types: []
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
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "gear_array",
  });

  if (gears_loading) return "Loading...";

  if (gears_error) return "An error has occurred: " + gears_error.message;

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

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((field, index) => {
            return (
              <div className="card mb-2" key={field.id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-3 mb-3">
                      <ControlledSelect
                        name={`gear_array.${index}.gear`}
                        label="Gear"
                        options={gear_options}
                        control={control}
                        errors={errors}
                        placeholder="Select gear..."
                        index={index}
                      />
                      {/*   <Controller */}
                      {/*     key={field.id} */}
                      {/*     name={`gear_array.${index}.gear_code`} */}
                      {/*     control={control} */}
                      {/*     render={({ field }) => ( */}
                      {/*       <Select {...field} options={gears} /> */}
                      {/*     )} */}
                      {/*   /> */}
                      {/*   {errors.gear && ( */}
                      {/*     <div className="invalid-feedback"> */}
                      {/*       Please select a gear. */}
                      {/*     </div> */}
                      {/*   )} */}
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
