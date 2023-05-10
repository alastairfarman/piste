import React from "react";

export default function ResortInfo({ resortData }) {
  if (!resortData) {
    return <p>Loading resort data...</p>;
  }

  return (
    <div>
      <h1>{resortData.resort.name}</h1>
      <div>
        <img src="top.png" alt="Top" style={{ width: "25px" }} />
        <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
          {resortData.top.elevation}
        </span>
        <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
          {resortData.top.snowDepth == null ? "0cm*" : resortData.top.snowDepth}
        </span>
        <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
          {resortData.top.temperature}
        </span>
      </div>
      <div>
        <img src="bottom.png" alt="Resort" style={{ width: "25px" }} />
        <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
          {resortData.bottom.elevation}
        </span>
        <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
          {resortData.bottom.snowDepth == null
            ? "0cm*"
            : resortData.bottom.snowDepth}
        </span>
        <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
          {resortData.bottom.temperature}
        </span>
      </div>
      <div>
        {resortData.resort.freshSnowfall} {resortData.resort.lastSnowfallDate}
      </div>
    </div>
  );
}
