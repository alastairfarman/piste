import React from "react";

export default function HourlyForecast({ hourlyData }) {
  if (!hourlyData) {
    return <p>Loading hourly forecast...</p>;
  }

  const nextEightHoursData = hourlyData.slice(0, 8);

  return (
    <div>
      <h2 style={{ width: "100%" }}>Mountain Forecast</h2>
      <div
        id="hourly-forecast"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {nextEightHoursData.map((hour, index) => (
          <div key={index}>
            <h2>{hour.time}</h2>
            <p>{hour.summary}</p>
            <p>{hour.maxTemp}</p>
            <p>{hour.windSpeed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
