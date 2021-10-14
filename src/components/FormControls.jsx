import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export const Input = ({ name, label, type, register, error, ...rest }) => {
  const { helpText } = { ...rest };

  return (
    <>
      {label && (
        <label htmlFor="{name}" className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className={error ? "form-control is-invalid" : "form-control"}
        id={name}
        {...register(name)}
        {...rest}
      />
      {helpText && (
        <div id={`${name}-help`} className="form-text">
          {helpText}
        </div>
      )}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </>
  );
};

export const Select = ({ name, label, options, register, error, ...rest }) => {
  const id = `select-${name}`;

  const { placeHolder } = rest;
  let _placeHolder = placeHolder ? placeHolder : "Select ....";

  return (
    <>
      {label && (
        <label htmlFor="{id}" className="form-label">
          {label}
        </label>
      )}
      <select
        id={id}
        {...register(name)}
        defaultValue=""
        className={error ? "form-control is-invalid" : "form-control"}
        {...rest}
      >
        <option value=""> {_placeHolder} </option>
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </>
  );
};

export const ControlledSelect = ({
  name,
  label,
  control,
  options,
  error,
  ...rest
}) => {
  const htmlFor = `select-${name}`;

  return (
    <>
      {label && (
        <label htmlFor={htmlFor} className="form-label">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <ReactSelect
              inputRef={ref}
              options={options}
              className={error ? "form-control is-invalid" : null}
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val.value)}
              {...rest}
            />

            {error && <div className="invalid-feedback">{error.message}</div>}
          </>
        )}
      />
    </>
  );
};
