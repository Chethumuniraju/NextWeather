import React, { useEffect, useState } from "react";

export default function Page1({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat && lon) {
        try {
          const token = localStorage.getItem("weather_token");

          const res = await fetch(
            `http://localhost:8080/api/users/weather?lat=${lat}&lon=${lon}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const data = await res.text();
          const parsed = JSON.parse(data);
          setWeatherData(parsed);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchWeather();
  }, [lat, lon]);

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          🌤️ Weather Report
        </h1>

        {error && (
          <p style={{ fontSize: "1.4rem", color: "#ffcccc", textAlign: "center" }}>
            ⚠️ Error: {error}
          </p>
        )}

        {!lat || !lon ? (
          <p style={{ fontSize: "1.4rem", textAlign: "center" }}>
            Please select a location first.
          </p>
        ) : !weatherData ? (
          <p style={{ fontSize: "1.4rem", textAlign: "center" }}>
            Loading weather data...
          </p>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "25px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              backdropFilter: "blur(12px)",
              fontSize: "1.3rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.2rem",
                marginBottom: "1.2rem",
                textAlign: "center",
              }}
            >
              📍 {weatherData.name}, {weatherData.sys.country}
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1.5rem",
                justifyContent: "center",
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt="weather icon"
                style={{ width: "120px", marginRight: "1.5rem" }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: "1.8rem" }}>
                  {weatherData.weather[0].main}
                </h3>
                <p
                  style={{
                    fontSize: "1.2rem",
                    textTransform: "capitalize",
                    opacity: 0.85,
                  }}
                >
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>

            <div style={{ lineHeight: "2.2rem" }}>
              🌡 <strong>Temp:</strong> {kelvinToCelsius(weatherData.main.temp)} °C <br />
              🧍‍♂️ <strong>Feels Like:</strong>{" "}
              {kelvinToCelsius(weatherData.main.feels_like)} °C <br />
              📉 <strong>Min/Max:</strong>{" "}
              {kelvinToCelsius(weatherData.main.temp_min)} °C /{" "}
              {kelvinToCelsius(weatherData.main.temp_max)} °C <br />
              💧 <strong>Humidity:</strong> {weatherData.main.humidity}% <br />
              ☁️ <strong>Clouds:</strong> {weatherData.clouds.all}% <br />
              💨 <strong>Wind:</strong> {weatherData.wind.speed} m/s, Gust:{" "}
              {weatherData.wind.gust ?? "-"} m/s <br />
              📍 <strong>Pressure:</strong> {weatherData.main.pressure} hPa <br />
              🌅 <strong>Sunrise:</strong>{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} <br />
              🌇 <strong>Sunset:</strong>{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
