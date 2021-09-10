import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

const Result = (props) => {
  const { state } = useStateMachine(updateAction);

  return (
    <>
      <h2>That's it.</h2>

      <p>
        Your project has been created with the following information. You can
        download a pre-populated template database from the the projects detail
        page here: <a href="#">{state.prj_cd}</a>{" "}
      </p>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

export default Result;
