import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export const Input = ({ name, label, type, register, errors, ...rest }) => {
  return (
    <>
      <label htmlFor="{name}" className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={
          errors && errors[`${name}`]
            ? "form-control is-invalid"
            : "form-control"
        }
        id={name}
        {...register(name)}
        {...rest}
      />
      {errors && errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
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
}) => {
  const id = `select-${name}`;
  const _placeholder = placeholder ? placeholder : `Select ${name} ...`;
  return (
    <>
      <label htmlFor="{id}" className="form-label">
        {label}
      </label>

      <select
        id={id}
        {...register(name)}
        defaultValue=""
        className={
          errors && errors[name] ? "form-control is-invalid" : "form-control"
        }
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
      {errors && errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
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
}) => {
  const htmlFor = `select-${name}`;
  return (
    <>
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name, ref } }) => (
          <>
            <ReactSelect
              inputRef={ref}
              options={options}
              className={
                errors && errors[name] ? "form-control is-invalid" : null
              }
              placeholder={placeholder}
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val.value)}
            />

            {errors && errors[name] && (
              <div className="invalid-feedback">{errors[name].message}</div>
            )}
          </>
        )}
      />
    </>
  );
};
