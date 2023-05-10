import React from "react";

export default function ToggleButtons({
  toggleState,
  toggleRuns,
  toggleSatellite,
  toggleResortLabels,
  toggleLiftLabels,
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", margin: "1rem" }}>
        <button
          style={{
            border: "solid 1px white",
            padding: "5px",
            borderRadius: "5px",
            width: "25px",
            height: "25px",
          }}
          className="toggle-button"
          onClick={toggleRuns}
        >
          <img src="./run.png" alt="Runs" style={{ width: "25px" }} />
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{
              border: "solid 1px white",
              padding: "5px",
              borderRadius: "5px",
              width: "25px",
              height: "25px",
            }}
            className="toggle-button"
            onClick={toggleSatellite}
          >
            <img
              src="./satellite.png"
              alt="Satellite"
              style={{ width: "25px" }}
            />
          </button>
        </div>
        <button
          style={{
            border: "solid 1px white",
            padding: "5px",
            borderRadius: "5px",
            width: "25px",
            height: "25px",
          }}
          className="toggle-button"
          onClick={toggleLiftLabels}
        >
          <img src="./lifts.png" alt="Lifts" style={{ width: "25px" }} />
        </button>
      </div>
    </div>
  );
}
