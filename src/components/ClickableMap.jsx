import React, { useState } from "react";

import ReactMapGL, { WebMercatorViewport } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { MyMarker } from "./MyMarker";

export const ClickableMap = ({ point, setPoint, bbox }) => {
  const wmViewport = new WebMercatorViewport({
    width: 1000,
    height: 800,
  }).fitBounds(
    [
      [bbox.minLon, bbox.minLat],
      [bbox.maxLon, bbox.maxLat],
    ],
    {
      padding: 30,
    }
  );

  const [viewport, setViewport] = useState(wmViewport);

  const marker = (point) => {
    const [lon, lat] = point;
    if (lon && lat) {
      //const [cx, cy] = project([lon, lat]);
      return <MyMarker lon={lon} lat={lat} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <h5>Please select a point.</h5>
      <div className="container-fluid">
        <div className="row">
          <div className="col align-self-center">
            <ReactMapGL
              {...viewport}
              onClick={(e) => setPoint(e.lngLat)}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
              {marker(point)}
            </ReactMapGL>
          </div>
        </div>
      </div>
    </>
  );
};
