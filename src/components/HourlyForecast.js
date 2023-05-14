import React, { useEffect, useRef, useState } from "react";

export default function HourlyForecast({ hourlyData }) {
  const dropdown = useRef(null);
  const [maxHeight, setMaxHeight] = useState("none");
  const [rotate, setRotate] = useState("0deg");
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      setMaxHeight("24px");
      setArrowVisible(true);
    } else {
      setMaxHeight("none");
      setArrowVisible(false);
    }

    const handler = (e) => {
      if (e.matches) {
        setMaxHeight("24px");
        setArrowVisible(true);
      } else {
        setMaxHeight("none");
        setArrowVisible(false);
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!hourlyData) {
    return <p>Loading hourly forecast...</p>;
  }

  const nextEightHoursData = hourlyData.slice(0, 8);

  const handleOnClick = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      setMaxHeight((prevMaxHeight) => (prevMaxHeight === "24px" ? "1000px" : "24px"));
      setRotate((prevRotate) => (prevRotate === "0deg" ? "180deg" : "0deg"));
    }
  };

  return (
    <div
      style={{ width: "100%", maxHeight: maxHeight, overflow: "hidden", transition: "max-height 0.3s ease" }}
      id="forecast-container"
      onClick={handleOnClick}
    >
      <h2
        id="dropdown"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Mountain Forecast
        <span
          style={{
            fontSize: "1rem",
            cursor: "pointer",
            display: arrowVisible ? "inline" : "none",
            transform: `rotate(${rotate})`,
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
      </h2>
      <div
        id="hourly-forecast"
        ref={dropdown}
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
