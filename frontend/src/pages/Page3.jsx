import React, { useState } from "react";

export default function Page3() {
  const [dateMonth, setDateMonth] = useState(new Date());
  const [precipitation, setPrecipitation] = useState(1);
  const [tempMax, setTempMax] = useState(15.6);
  const [tempMin, setTempMin] = useState(0.0);
  const [wind, setWind] = useState(2.5);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const token = localStorage.getItem("weather_token");

      const res = await fetch("http://localhost:8080/api/weather/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date_month: dateMonth.getMonth() + 1, // Get the month (1-12)
          precipitation,
          temp_max: tempMax,
          temp_min: tempMin,
          wind,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch weather prediction");
      }

      const data = await res.json();
      setWeatherData(data);

      // Map the prediction value to weather type
      switch (data.prediction) {
        case "0":
          setWeather("Drizzle");
          break;
        case "1":
          setWeather("Fog");
          break;
        case "2":
          setWeather("Rain");
          break;
        case "3":
          setWeather("Snow");
          break;
        default:
          setWeather("Sun");
          break;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading state to false after response
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌤️ Weather Prediction</h1>

        {error && <p style={styles.errorText}>Error: {error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Date: </label>
            <input
              type="date"
              value={dateMonth.toISOString().split("T")[0]}
              onChange={(e) => setDateMonth(new Date(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Precipitation (mm): </label>
            <input
              type="number"
              value={precipitation}
              onChange={(e) => setPrecipitation(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Max Temperature (°C): </label>
            <input
              type="number"
              value={tempMax}
              onChange={(e) => setTempMax(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Min Temperature (°C): </label>
            <input
              type="number"
              value={tempMin}
              onChange={(e) => setTempMin(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Wind Speed (m/s): </label>
            <input
              type="number"
              value={wind}
              onChange={(e) => setWind(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Get Weather Prediction
          </button>
        </form>

        {loading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Model is predicting...</p>
            <div style={styles.spinner}></div>
          </div>
        ) : (
          weatherData && (
            <div style={styles.responseContainer}>
              <h2 style={styles.responseTitle}>Weather Prediction:</h2>
              <p style={styles.weatherText}>
                <strong>The weather is:</strong> {weather}
              </p>
            </div>
          )
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "1.2rem",
    marginRight: "1rem",
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "200px",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#414345",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: "2rem",
  },
  loadingText: {
    fontSize: "1.5rem",
    color: "#fff",
    marginBottom: "1rem",
  },
  spinner: {
    border: "4px solid rgba(255, 255, 255, 0.1)",
    borderTop: "4px solid #fff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 2s linear infinite",
    margin: "0 auto",
  },
  responseContainer: {
    marginTop: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "1rem",
    borderRadius: "10px",
  },
  responseTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  weatherText: {
    fontSize: "1.5rem",
    color: "#e0e0e0",
  },
  responseText: {
    fontSize: "1.3rem",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontFamily: "'Courier New', monospace",
    backgroundColor: "#232526",
    padding: "1rem",
    borderRadius: "10px",
  },
};


