import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export const Input = ({ name, label, type, register, errors, ...rest }) => {
  let error;
  const { index, helpText } = { ...rest };

  if (typeof index === "undefined") {
    error = errors?.[name];
  } else {
    const [table, idx, field] = name.split(".");
    error = errors[table]?.[idx]?.[field];
  }

  return (
    <>
      <label htmlFor="{name}" className="form-label">
        {label}
      </label>
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

export const Select = ({
  name,
  label,
  options,
  register,
  errors,
  placeholder,
  ...rest
}) => {
  const id = `select-${name}`;
  const _placeholder = placeholder ? placeholder : `Select ${name} ...`;

  let error;
  const { index } = { ...rest };

  if (typeof index === "undefined") {
    error = errors?.[name];
  } else {
    const [table, idx, field] = name.split(".");
    error = errors[table]?.[idx]?.[field];
  }

  return (
    <>
      <label htmlFor="{id}" className="form-label">
        {label}
      </label>

      <select
        id={id}
        {...register(name)}
        defaultValue=""
        className={error ? "form-control is-invalid" : "form-control"}
      >
        <option value=""> {_placeholder} </option>
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
  placeholder,
  control,
  options,
  errors,
  ...rest
}) => {
  const htmlFor = `select-${name}`;

  let error;
  const { index } = { ...rest };

  if (typeof index === "undefined") {
    error = errors?.[name];
  } else {
    const [table, idx, field] = name.split(".");
    error = errors[table]?.[idx]?.[field];
  }

  return (
    <>
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name, ref, ...rest } }) => (
          <>
            <ReactSelect
              inputRef={ref}
              options={options}
              className={error ? "form-control is-invalid" : null}
              placeholder={placeholder}
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val.value)}
            />

            {error && <div className="invalid-feedback">{error.message}</div>}
          </>
        )}
      />
    </>
  );
};
