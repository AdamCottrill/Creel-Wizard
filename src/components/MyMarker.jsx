import React from "react";
import { Marker } from "react-map-gl";

export const MyMarker = ({ lat, lon, onClick }) => {
  const radius = 7;
  const size = radius * 2;

  return (
    <Marker longitude={lon} latitude={lat}>
      <div style={{ transform: `translate(${-size / 2}px,${-size}px)` }}>
        <svg
          //transform="translate(-5,-11)"
          height={size}
          width={size}
          onClick={() => onClick()}
          viewBox={`0 0 ${size + 2} ${size + 2}`}
          style={{ padding: "2px" }}
        >
          <circle
            cx={radius + 1}
            cy={radius + 1}
            r={radius}
            opacity="0.7"
            strokeWidth="2"
            stroke="black"
            fill="#FF0000"
          />
        </svg>
      </div>
    </Marker>
  );
};
