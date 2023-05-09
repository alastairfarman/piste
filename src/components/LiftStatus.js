import React from "react";

export default function LiftStatus({ liftStatusData }) {
  if (!liftStatusData) {
    return <p>Loading lift status...</p>;
  }

  return (
    <div>
      <img src="./lifts.png" alt="Lifts" width="25px" />
      <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
        <span style={{ color: "green" }}>&bull;</span> {liftStatusData.open}
      </span>
      <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
        <span style={{ color: "red" }}>&bull;</span> {liftStatusData.closed}
      </span>
      <span style={{ padding: "0 0.5rem 0 0.5rem" }}>
        <span style={{ color: "grey" }}>&bull;</span> {liftStatusData.ooo}
      </span>
    </div>
  );
}
