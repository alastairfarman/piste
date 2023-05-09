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
    {
      time: "10:00",
      description: "Sunny",
      windSpeed: 5,
    },
    {
      time: "11:00",
      description: "Partly Cloudy",
      windSpeed: 7,
    },
    // Add more objects as needed
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

  useEffect(() => {
    // Resort and snow conditions
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
        console.log(result);

        // setResortData((prevState) => ({
        //   ...prevState,
        //   top: {
        //     ...prevState.top,
        //     temperature: result.topLift[0].maxTemp,
        //   },
        //   bottom: {
        //     ...prevState.bottom,
        //     temperature: result.botLift[0].maxTemp,
        //   },
        // }));
      } catch (error) {
        console.error(error);
      }
    };

    // fetchResortData();
    // fetchHourlyData();
  }, []);

  return (
    <>
      <div className="App">
        <div
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
            alignItems: "center",
          }}
        >
          <ResortInfo resortData={resortData} />
          <HourlyForecast hourlyData={hourlyData} />
          <LiftStatus liftStatusData={liftStatusData} />
          <ToggleButtons
            toggleState={toggleState}
            toggleRuns={toggleRuns}
            toggleSatellite={toggleSatellite}
            toggleResortLabels={toggleResortLabels}
            toggleLiftLabels={toggleLiftLabels}
          />
        </div>
        <Canvas
          style={{ position: "absolute", top: 0, left: 0 }}
          camera={{ position: [0, 20, -10] }}
          gl={{ antialias: true, toneMappingExposure: 1 }}
          shadows
        >
          <fogExp2 attach="fog" args={["#ffffff", 0.02]} />
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
      </div>
    </>
  );
}

export default App;
