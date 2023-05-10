import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MapControls, Stars, Environment, Html } from "@react-three/drei";

import Model from "./components/Model";
import ResortInfo from "./components/ResortInfo";
import HourlyForecast from "./components/HourlyForecast";
import LiftStatus from "./components/LiftStatus";
import ToggleButtons from "./components/ToggleButtons";

import liftData from "./liftData";

function App() {
  const [resortData, setResortData] = useState({
    resort: {
      name: null,
      country: null,
      freshSnowfall: null,
      lastSnowfallDate: null,
    },
    top: { snowDepth: 0, temperature: 0, elevation: 0 },
    bottom: { snowDepth: 0, temperature: 0, elevation: 0 },
  });
  const [hourlyData, setHourlyData] = useState([
    { time: "1PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "2PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "3PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "4PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "5PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "6PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "7PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
    { time: "8PM", summary: "Sunny", maxTemp: "2°C", windSpeed: "8km/h" },
  ]);
  const [liftStatusData, setLiftStatusData] = useState({
    open: liftData().statusSummary.open,
    closed: liftData().statusSummary.closed,
    ooo: liftData().statusSummary.ooo,
  });
  const [toggleState, setToggleState] = useState({
    runs: true,
    satellite: true,
    resortLabels: true,
    liftLabels: true,
  });

  const toggleRuns = () => {
    setToggleState((prevState) => ({ ...prevState, runs: !prevState.runs }));
  };

  const toggleSatellite = () => {
    setToggleState((prevState) => ({
      ...prevState,
      satellite: !prevState.satellite,
    }));
    console.log(toggleState)
  };

  const toggleResortLabels = () => {
    setToggleState((prevState) => ({
      ...prevState,
      resortLabels: !prevState.resortLabels,
    }));
  };

  const toggleLiftLabels = () => {
    setToggleState((prevState) => ({
      ...prevState,
      liftLabels: !prevState.liftLabels,
    }));
  };

  // API calls

  const findNearestTimeIndex = (timeArray, currentTime) => {
    return timeArray.reduce((nearestIndex, currentTimeObj, index) => {
      const currentDiff = Math.abs(
        parseInt(currentTime, 10) - parseInt(currentTimeObj.time, 10)
      );
      const nearestDiff = Math.abs(
        parseInt(currentTime, 10) - parseInt(timeArray[nearestIndex].time, 10)
      );
      return currentDiff < nearestDiff ? index : nearestIndex;
    }, 0);
  };

  useEffect(() => {
    const fetchResortData = async () => {
      const url =
        "https://ski-resort-forecast.p.rapidapi.com/La%20Plagne/snowConditions?units=m";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "625e8c3452mshb467e7695aba98fp1d8b3ajsnb88b69f5e950",
          "X-RapidAPI-Host": "ski-resort-forecast.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log("Resort Data API: ", result);

        const resortData = {
          resort: {
            name: result.basicInfo.name,
            country: result.basicInfo.region,
            freshSnowfall: result.freshSnowfall,
            lastSnowfallDate: result.lastSnowfallDate,
          },
          top: {
            snowDepth: result.topSnowDepth,
            elevation: result.basicInfo.topLiftElevation,
          },
          bottom: {
            snowDepth: result.botSnowDepth,
            elevation: result.basicInfo.botLiftElevation,
          },
        };

        setResortData(resortData);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchHourlyData = async () => {
      const url =
        "https://ski-resort-forecast.p.rapidapi.com/La%20Plagne/hourly?units=m&c=true";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "625e8c3452mshb467e7695aba98fp1d8b3ajsnb88b69f5e950",
          "X-RapidAPI-Host": "ski-resort-forecast.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log("Hourly Data API: ", result);

        const currentDateTime = new Date();
        const currentTime = currentDateTime.toLocaleString("en-US", {
          timeZone: "Europe/Paris",
          hour: "numeric",
          hour12: true,
        });

        const topLiftIndex = findNearestTimeIndex(result.topLift, currentTime);
        const botLiftIndex = findNearestTimeIndex(result.botLift, currentTime);

        setResortData((prevState) => ({
          ...prevState,
          top: {
            ...prevState.top,
            temperature: result.topLift[topLiftIndex].maxTemp,
          },
          bottom: {
            ...prevState.bottom,
            temperature: result.botLift[botLiftIndex].maxTemp,
          },
        }));

        if (result.midLift) {
          const midLiftData = result.midLift.splice(
            findNearestTimeIndex(result.midLift, currentTime)
          );

          setHourlyData(midLiftData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchResortData();
    fetchHourlyData();
  }, []);

  return (
    <>
      <div className="App">
        <div
          id="info-panel"
          style={{
            position: "absolute",
            zIndex: "2",
            color: "white",
            right: 0,
            height: "100%",
            padding: "1rem",
            backgroundColor: "rgba(0,0,0,1)",
            fontFamily: "Rubik",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <ResortInfo resortData={resortData} />
          <HourlyForecast hourlyData={hourlyData} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LiftStatus liftStatusData={liftStatusData} />
            <ToggleButtons
              toggleState={toggleState}
              toggleRuns={toggleRuns}
              toggleSatellite={toggleSatellite}
              toggleResortLabels={toggleResortLabels}
              toggleLiftLabels={toggleLiftLabels}
            />
          </div>
        </div>
        <Canvas
          style={{ position: "absolute", top: 0, left: 0 }}
          camera={{ position: [0, 20, -10] }}
          gl={{ antialias: true, toneMappingExposure: 1 }}
          shadows
        >
          <fogExp2 attach="fog" args={["#ffffff", 0.05]} />
          <Environment
            files={
              "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/syferfontein_18d_clear_puresky_2k.hdr"
            }
            background
          />

          <MapControls
            enableDamping
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 4} // limits the angle of rotation
            minPolarAngle={0} // limits the angle of rotation
            minDistance={4} // minimum distance to the target
            maxDistance={30} // maximum distance to the target
          />
          <Suspense
            fallback={
              <Html>
                <img
                  src="./icon.png"
                  alt="loading"
                  style={{
                    position: "fixed",
                    width: "50px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: "loading 2s ease-in-out infinite",
                  }}
                />
              </Html>
            }
          >
            <Model toggleState={toggleState} liftData={liftData} />
          </Suspense>
          <Stars />
        </Canvas>
        <div
          style={{
            position: "fixed",
            bottom: "0",
            width: "100dvw",
            color: "white",
            zIndex: "2",
            fontFamily: "Rubik",
            fontSize: "0.7rem",
          }}
        >
          Topography by Xavier Fischer used and modified under CC BY-NC-SA 4.0.
          Weather API by{" "}
          <a href="https://rapidapi.com/joeykyber/api/ski-resort-forecast">
            Joey Kyber
          </a>
          . Lift Status API is simulated for demonstration purposes and not
          reflective of real-world data. *Snow depth data reported by resort may
          be innacurate due to end of season.
        </div>
      </div>
    </>
  );
}

export default App;
