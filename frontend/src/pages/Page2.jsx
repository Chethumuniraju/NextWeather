import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaWind, FaCloudSun, FaCloudRain } from "react-icons/fa";

export default function Page2({ lat, lon }) {
  const [pollutionData, setPollutionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPollution = async () => {
      if (lat && lon) {
        try {
          const token = localStorage.getItem("weather_token");

          const res = await fetch(
            `http://localhost:8080/api/users/air-pollution?lat=${lat}&lon=${lon}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch air pollution data");
          }

          const data = await res.text();
          const parsed = JSON.parse(data);
          setPollutionData(parsed);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchPollution();
  }, [lat, lon]);

  // Function to determine AQI icon and color
  const getAQI = (aqi) => {
    if (aqi <= 50) return { icon: <FaCloudSun />, color: "green", label: "Good" };
    if (aqi <= 100) return { icon: <FaCloudSun />, color: "yellow", label: "Moderate" };
    if (aqi <= 150) return { icon: <FaCloudRain />, color: "orange", label: "Unhealthy for Sensitive" };
    if (aqi <= 200) return { icon: <FaCloudRain />, color: "red", label: "Unhealthy" };
    return { icon: <FaExclamationCircle />, color: "purple", label: "Very Unhealthy" };
  };

  const renderPollutant = (label, value, unit, icon) => (
    <div style={styles.pollutantContainer}>
      <div style={styles.pollutantLabel}>
        {icon}
        {label}:
      </div>
      <div style={styles.pollutantValue}>
        {value} {unit}
      </div>
    </div>
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌫️ Air Pollution Report</h1>

        {error && <p style={styles.errorText}>Error: {error}</p>}

        {!lat || !lon ? (
          <p style={styles.infoText}>Please select a location first.</p>
        ) : !pollutionData ? (
          <p style={styles.infoText}>Loading air pollution data...</p>
        ) : (
          <div style={styles.dataContainer}>
      
            <div style={{ ...styles.aqiContainer, backgroundColor: getAQI(pollutionData.list[0].main.aqi).color }}>
              <h3 style={styles.aqiLabel}>
                {getAQI(pollutionData.list[0].main.aqi).icon} AQI: {getAQI(pollutionData.list[0].main.aqi).label}
              </h3>
            </div>
            {renderPollutant("CO", pollutionData.list[0].components.co, "µg/m³", <FaWind />)}
            {renderPollutant("NO2", pollutionData.list[0].components.no2, "µg/m³", <FaWind />)}
            {renderPollutant("O3", pollutionData.list[0].components.o3, "µg/m³", <FaCloudSun />)}
            {renderPollutant("PM2.5", pollutionData.list[0].components.pm2_5, "µg/m³", <FaCloudSun />)}
            {renderPollutant("PM10", pollutionData.list[0].components.pm10, "µg/m³", <FaCloudRain />)}
            {renderPollutant("SO2", pollutionData.list[0].components.so2, "µg/m³", <FaCloudRain />)}
            {renderPollutant("NH3", pollutionData.list[0].components.nh3, "µg/m³", <FaCloudSun />)}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    background: "linear-gradient(to right, #232526, #414345)",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "1rem",
  },
  errorText: {
    fontSize: "1.3rem",
    color: "#ffaaaa",
  },
  infoText: {
    fontSize: "1.3rem",
  },
  subTitle: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  dataContainer: {
    fontSize: "1.3rem",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },
  aqiContainer: {
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  aqiLabel: {
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  pollutantContainer: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pollutantLabel: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
  pollutantValue: {
    fontSize: "1.4rem",
  },
};
