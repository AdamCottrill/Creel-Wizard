import React from "react";
import { FaTrash, FaArrowDown, FaArrowUp } from "react-icons/fa";

export const FieldArrayButtons = ({ index, fields, move, remove }) => {
  return (
    <div className="col-2 mb-3 align-self-end">
      <div className="btn-group" role="group" aria-label="Move or delete modes">
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
  );
};
