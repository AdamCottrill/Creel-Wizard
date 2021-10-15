import React, { useState } from "react";

import ReactMapGL, {
  WebMercatorViewport,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { MyMarker } from "./MyMarker";

export const ClickableMap = ({ point, setPoint, bbox }) => {
  const navStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  };

  const dims = {
    width: 1000,
    height: 800,
  };

  const wmViewport = new WebMercatorViewport({ ...dims }).fitBounds(
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
      return <MyMarker lon={lon} lat={lat} onClick={() => {}} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <h5>Please select a point.</h5>
      <ReactMapGL
        {...{ ...viewport, ...dims }}
        onClick={(e) => setPoint(e.lngLat)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        getCursor={(e) => "pointer"}
      >
        {marker(point)}
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </>
  );
};
