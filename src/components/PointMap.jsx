import React, { useState } from "react";

import ReactMapGL, {
  WebMercatorViewport,
  Popup,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export const PointMap = ({
  markers,
  height,
  width,
  popupInfo,
  setPopupInfo,
  bbox,
}) => {
  const navStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  };

  const wmViewport = new WebMercatorViewport({
    width: width,
    height: height,
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

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {markers}

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.dd_lon}
            latitude={popupInfo.dd_lat}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <div className="popup-marker-content">
              {popupInfo.space} - {popupInfo.space_des}
            </div>
          </Popup>
        )}

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </>
  );
};
