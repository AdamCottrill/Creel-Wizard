import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export const ButtonBar = ({
  append_values,
  button_label,
  back_link,
  append,
}) => {
  return (
    <div className="row justify-content-between">
      <div className="col-3">
        <Link to={back_link} tabIndex="-1">
          <button type="button" className="btn btn-primary">
            <span className="px-1">
              <FaArrowLeft />
            </span>
            Back
          </button>
        </Link>
      </div>

      <div className="col-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            append(append_values);
          }}
        >
          <span className="mx-1">
            <FaPlus />
          </span>
          {button_label}
        </button>
      </div>
      <div className="col-3">
        <button type="submit" className="btn btn-primary">
          Next
          <span className="ps-2">
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};
