import React from "react";
import { useStateMachine } from "little-state-machine";
import { updateAction } from "../actions";

const Result = () => {
  const { state } = useStateMachine(updateAction);

  return (
    <>
      <h2>That&lsquo;s it.</h2>

      <p>
        Your project has been created with the following information. You can
        download a pre-populated template database from the the projects detail
        page here:{" "}
        <button type="button" className="btn btn-link">
          {state.fn011.prj_cd}
        </button>
      </p>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

export default Result;
