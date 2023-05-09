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
      <h1>Toggle Buttons</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          style={{
            all: "unset",
            border: "solid 1px white",
            padding: "2px",
            borderRadius: "5px",
          }}
          onClick={toggleRuns}
        >
          <img src="./run.png" alt="Runs" style={{ width: "25px" }} />
        </button>
        {toggleState.runs ? "Hide" : "Show"}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          style={{
            all: "unset",
            border: "solid 1px white",
            padding: "2px",
            borderRadius: "5px",
          }}
          onClick={toggleSatellite}
        >
          <img
            src="./satellite.png"
            alt="Satellite"
            style={{ width: "25px" }}
          />
        </button>
        {toggleState.satellite ? "Hide" : "Show"}
      </div>
      <button
        style={{
          all: "unset",
          border: "solid 1px white",
          padding: "2px",
          borderRadius: "5px",
        }}
        onClick={toggleLiftLabels}
      >
        <img src="./lifts.png" alt="Lifts" style={{ width: "25px" }} />
      </button>
    </div>
  );
}
