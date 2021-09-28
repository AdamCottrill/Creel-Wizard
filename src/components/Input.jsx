import React from "react";

export const Input = ({ name, label, type, register, errors }) => {
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
      />
      {errors && errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
    </>
  );
};
