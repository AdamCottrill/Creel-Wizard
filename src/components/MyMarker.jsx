import React from "react";
import { Marker } from "react-map-gl";

export const MyMarker = ({ lat, lon, onClick }) => {
  const SIZE = 20;
  return (
    <Marker longitude={lon} latitude={lat}>
      <svg
        transform="translate(-5,-11)"
        height={SIZE}
        width={SIZE}
        onClick={() => onClick()}
      >
        <circle cx={4} cy={4} r={4} opacity="0.5" stroke="black" fill="red" />
      </svg>
    </Marker>
  );
};
