import React from "react";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

import { FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const FN028 = (props) => {
  const { register, handleSubmit } = useForm();
  const { state, actions } = useStateMachine({ updateAction });
  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./result");
  };

  return (
    <div className="card">
      <div className="card-header">Fishing Mode - FN028</div>
      <div className="card-body">
        <p>
          This form will be used to capture information on the fishing modes
          used in this project. Fishing modes define how the gear will be
          deployed. Particularly with respect to water depth and depth contours.
        </p>

        <p>
          It may be helpful to thing of modes as quick descriptions of how you
          gear will be deployed (and reported on at the end of the project):
        </p>

        <ul>
          <li>GL50 set on bottom across depth contours</li>
          <li>GL89 canned in the thermocline along depth contours</li>
          <li>TP08 set on bottom perpendicular to shore</li>
        </ul>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-2 mb-3">
              <label htmlFor="mode" className="form-label">
                Mode
              </label>
              <input
                type="text"
                className="form-control"
                id="mode"
                {...register("mode")}
                defaultValue={state.mode || "00"}
                required
              />
            </div>

            <div className="col-3 mb-3">
              <label htmlFor="mode-des" className="form-label">
                Mode Description
              </label>
              <input
                type="text"
                className="form-control"
                id="mode-des"
                {...register("mode_des")}
                defaultValue={state.mode_des || "Default Mode"}
                required
              />
            </div>

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

            <div className="col-2 mb-3">
              <label htmlFor="select-orient" className="form-label">
                Orient
              </label>

              <select
                id="select-orient"
                {...register("orient")}
                className="form-select"
                aria-label="Select Orient"
                required
              >
                <option selected>Select orient...</option>
                <option value="1">1 - Across Contours</option>
                <option value="2">2 - With Contours</option>
                <option value="9">9 - No Reported</option>
                <option value="u">U - Upstream</option>
                <option value="d">D - Downstream </option>
              </select>
            </div>

            <div className="col-2 mb-3">
              <label htmlFor="select-set-type" className="form-label">
                Set Type
              </label>

              <select
                id="select-set-type"
                {...register("set-type")}
                className="form-select"
                aria-label="Select Set Type"
                required
              >
                <option selected>Select set type...</option>
                <option value="b">B - Bottom</option>
                <option value="c">C - Canned</option>
                <option value="k">K - Kited</option>
                <option value="s">S - Stepped</option>
                <option value="t">T - Thermocline</option>
                <option value="9">9 - Not Reported</option>
              </select>
            </div>
          </div>

          <hr />

          <div className="row justify-content-between">
            <div className="col-2">
              <Link to="/gear">
                <button type="button" className="btn btn-primary">
                  <FaArrowLeft />
                  Back
                </button>
              </Link>
            </div>

            <div className="col-2">
              <button type="button" className="btn btn-secondary">
                <FaPlus />
                Add Another Mode
              </button>
            </div>

            <div className="col-2">
              <button type="" className="btn btn-primary">
                Create Project
                <FaArrowRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(FN028);
