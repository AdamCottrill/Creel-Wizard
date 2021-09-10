import React from "react";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import updateAction from "../updateAction";

const Gear = (props) => {
  const { register, handleSubmit } = useForm();
  const { state, actions } = useStateMachine({ updateAction });
  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./fn028");
  };

  return (
    <div className="card">
      <div className="card-header">Gear and Process Types</div>
      <div className="card-body">
        <p>
          This form will capture which gears are going to be used in this
          project and how the catch in those gears will be processed. Available
          gear choices will be dependent on the selected protocol, and available
          process types will be limited to those that are known for the selected
          gear types - e.g. - Trap nets have a single process type, FWIN nets
          can be by net or by panel.
        </p>

        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-3 mb-3">
                  <label htmlFor="select-protocol" className="form-label">
                    Gear
                  </label>

                  <select
                    id="select-protocol"
                    {...register("gear")}
                    className="form-select"
                    aria-label="Select Gear"
                    required
                  >
                    <option selected>Select gear...</option>
                    <option value="gl21">
                      GL21 - Huron Offshore Index Gillnet
                    </option>
                    <option value="gl50">GL50 - FWIN Gillnet</option>
                    <option value="na1">NA1 - BSM Large Mesh Gillnet</option>
                    <option value="on2">ON2 - BSM Small Mesh Gillnet</option>
                    <option value="tp08">TP08 - 8' NCSIN Trapnet </option>
                    <option value="gl38">GL38 - 38 mm SLIN/FLIN Gillnet</option>
                    <option value="gl51">GL51 - 51 mm SLIN/FLIN Gillnet</option>
                    <option value="gl64">GL64 - 64 mm SLIN/FLIN Gillnet</option>
                  </select>
                </div>

                <div className="col-9 mb-3">
                  <div className="row">
                    <p>Process Type:</p>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          value="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheckbox1"
                        >
                          By Net
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheckbox2"
                        >
                          By Mesh
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox3"
                          value="option3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheckbox3"
                        >
                          By Panel
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox4"
                          value="option4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheckbox4"
                        >
                          Panel Group
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="row justify-content-between">
            <div className="col-2">
              <Link to="/fn026">
                <button type="button" className="btn btn-primary">
                  <span className="px-1">
                    <FaArrowLeft />
                  </span>
                  Back
                </button>
              </Link>
            </div>

            <div className="col-2">
              <button type="button" className="btn btn-secondary">
                <span className="px-1">
                  <FaPlus />
                </span>
                Add Another Gear
              </button>
            </div>

            <div className="col-2">
              <button type="submit" className="btn btn-primary">
                Next
                <span className="px-1">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Gear);
