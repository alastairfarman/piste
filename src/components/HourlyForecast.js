import React from "react";

export default function HourlyForecast({ hourlyData }) {
  if (!hourlyData) {
    return <p>Loading hourly forecast...</p>;
  }

  return (
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    }}>
      {hourlyData.map((hour, index) => (
        <div key={index}>
          <h2>{hour.time}</h2>
          <p>{hour.description}</p>
          <p>{hour.windSpeed} km/h</p>
        </div>
      ))}
    </div>
  );
}
