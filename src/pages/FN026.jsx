import React, { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaMapMarkerAlt } from "react-icons/fa";

import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";

import schema from "../schemas/FN026";
import { updateAction } from "../actions";
import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";
import { Input } from "../components/FormControls";

import { ClickableMap } from "../components/ClickableMap";
import { PointMap } from "../components/PointMap";
import { MyMarker } from "../components/MyMarker";

const FN026 = (props) => {
  const { state, actions } = useStateMachine({ updateAction });

  const [showRules, setShowRules] = useState(false);

  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [popupInfo, setPopupInfo] = useState();
  const [point, setPoint] = useState([]);

  const defaultValues = [
    {
      space: "00",
      space_des: "Project Study Area",
      dd_lat: "",
      dd_lon: "",
    },
  ];

  const initialValues = state.fn026 || defaultValues;

  // yup context will need to get the extent for the selected lake to put bounds on lat-lon.

  const { bbox } = state;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { fn026: initialValues },
    resolver: yupResolver(schema, bbox),
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn026",
  });

  const values = useWatch({
    control,
    name: "fn026",
  });

  const markers = React.useMemo(
    () =>
      values
        .map((pt, i) => {
          const lon = pt.dd_lon ? parseFloat(pt.dd_lon) : null;
          const lat = pt.dd_lat ? parseFloat(pt.dd_lat) : null;
          if (lon && lat) {
            return (
              <MyMarker
                key={`marker-${i}`}
                lat={lat}
                lon={lon}
                onClick={() => {
                  setPopupInfo(values[i]);
                }}
              />
            );
          }
        })
        .filter((x) => typeof x !== "undefined"),
    [values]
  );

  const ShowMap = (index) => {
    // set the current point if it exists:
    setCurrentIndex(index);
    const dd_lon = getValues(`fn026.${index}.dd_lon`);
    const dd_lat = getValues(`fn026.${index}.dd_lat`);
    if (dd_lon && dd_lat) {
      setPoint([Number.parseFloat(dd_lon), Number.parseFloat(dd_lat)]);
    }
    setShow(true);
  };

  const handleHide = () => {
    if (point.length) {
      setValue(`fn026.${currentIndex}.dd_lon`, point[0].toPrecision(7));
      setValue(`fn026.${currentIndex}.dd_lat`, point[1].toPrecision(7));
      //addPoint(point);
    }
    setCurrentIndex();
    setPoint([]);
    setShow(false);
  };

  const onSubmit = (data) => {
    actions.updateAction(data);
    props.history.push("./gear");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                Spatial Strata - FN026
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setShowRules(!showRules)}
                >
                  Validation Rules
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="alert alert-warning" role="alert">
                This form is likely to change as the modernization process
                progresses and we collectively decide on how we want to capture
                spatial information associated with our projects. For now, the
                minimal requirement is a space name, description, and coordinate
                to plot a point on a map for each spatial strata.
              </div>

              <p>
                This form will be used to identify spatial strata used in the
                design of the project. If no spatial strata are defined, a
                single default strata will be created using the spatial extent
                of the sampling points. Multiple spatial strata can be defined.
                For now, they will be simple records, but in future could
                include interactive map to select points, or dynamic select
                widget that can be populated from known/existing spatial strata
                that have been used in previous projects.
              </p>
              <p>
                Like seasons, there is no limit on the number of spatial strata
                that can be specified.
              </p>

              {showRules && (
                <div className="card mt-2 mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Validation Rules</h5>
                    <ul>
                      <li>Space code must be unique within a project</li>
                      <li>
                        Every sample must belong to one, and only one spatial
                        strata
                      </li>
                      <li>Spatial strata cannot overlap.</li>
                      <li>
                        Spatial strata can be either points or polygons (some
                        day)
                      </li>
                      <li>
                        Latidude and longitude represent the centroid of the
                        spatial strata and must be within the envelope of the
                        lake
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <hr />

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {fields.map((item, index) => (
                  <div key={index} className="card my-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-2 mb-3">
                          <Input
                            name={`fn026.${index}.space`}
                            label="Space"
                            type="text"
                            register={register}
                            error={errors?.fn026?.[index]?.space}
                            index={index}
                          />
                        </div>

                        <div className="col-7 mb-3">
                          <Input
                            name={`fn026.${index}.space_des`}
                            label="Space Description"
                            type="text"
                            register={register}
                            error={errors?.fn026?.[index]?.space_des}
                            index={index}
                          />
                        </div>

                        <FieldArrayButtons
                          index={index}
                          fields={fields}
                          remove={remove}
                          move={move}
                        />
                      </div>

                      <div className="row  align-items-end">
                        <div className="col-5">
                          <Input
                            name={`fn026.${index}.dd_lat`}
                            placeholder="Latitude"
                            type="text"
                            register={register}
                            error={errors?.fn026?.[index]?.dd_lat}
                            index={index}
                          />
                        </div>

                        <div className="col-5">
                          <Input
                            name={`fn026.${index}.dd_lon`}
                            placeholder="Longitude"
                            type="text"
                            register={register}
                            error={errors?.fn026?.[index]?.dd_lon}
                            index={index}
                          />
                        </div>

                        <div className="col-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-info"
                            onClick={() => ShowMap(index)}
                          >
                            <span className="mx-1">
                              <FaMapMarkerAlt />
                            </span>
                            Map
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <hr />

                <ButtonBar
                  append_values={defaultValues[0]}
                  button_label="Add Another Space"
                  back_link="/fn022"
                  append={append}
                />
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h5>
            <PointMap
              markers={markers}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
              height={600}
              width={700}
              bbox={bbox}
            />
          </h5>
        </div>
      </div>

      <Modal show={show} dialogClassName="modal-xl" onHide={() => handleHide()}>
        <Modal.Header>
          <Modal.Title>Modal</Modal.Title>
          <Button variant="primary" onClick={handleHide}>
            Done
          </Button>
        </Modal.Header>
        <Modal.Body>
          <ClickableMap point={point} setPoint={setPoint} bbox={bbox} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(FN026);
