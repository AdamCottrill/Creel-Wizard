import React from "react";
import { useStateMachine } from "little-state-machine";

import { resetState } from "./actions";
import { useHistory } from "react-router-dom";

const ResetLink = (props) => {
  const history = useHistory();
  const { actions } = useStateMachine({ resetState });

  const gohome = () => {
    actions.resetState();
    history.push("/");
  };
  return (
    <button type="button" className="btn btn-link" onClick={gohome}>
      Reset
    </button>
  );
};

export default ResetLink;
