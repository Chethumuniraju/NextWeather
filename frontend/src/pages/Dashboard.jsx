import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [selectedPage, setSelectedPage] = useState("page1");

  const primaryColor = "#4A90E2";
  const secondaryColor = "#FFB200";
  const backgroundColor = "#F5F7FA";

  // Auto-fetch current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const current = {
            formattedAddress: "Current Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setSelectedLocation(current);
          setLat(current.latitude);
          setLong(current.longitude);
          setSearchQuery("Current Location");
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 2) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/geocoding/autocomplete?text=${e.target.value}`
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching autocomplete results", error);
      }
    } else {
      setLocations([]);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLat(location.latitude);
    setLong(location.longitude);
    setSearchQuery(location.formattedAddress);
    setLocations([]);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const current = {
            formattedAddress: "Current Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setSelectedLocation(current);
          setLat(current.latitude);
          setLong(current.longitude);
          setSearchQuery("Current Location");
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="p-4 bg-light"
          style={{
            width: "250px",
            minHeight: "calc(100vh - 80px)",
            boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4 className="text-center" style={{ color: primaryColor }}>
            Dashboard
          </h4>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search places..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                border: `1px solid ${primaryColor}`,
                borderRadius: "4px",
                padding: "10px",
              }}
            />
            {/* Autocomplete dropdown */}
            {locations.length > 0 && (
              <ul
                className="list-group mt-2"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ddd",
                }}
              >
                {locations.map((location, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location.formattedAddress}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Use Current Location Button */}
          <button
            className="btn w-100 mb-3"
            style={{
              backgroundColor: secondaryColor,
              color: "white",
              borderRadius: "4px",
            }}
            onClick={handleCurrentLocation}
          >
            Use Current Location
          </button>

          {/* Navigation Buttons */}
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${
                selectedPage === "page1" ? "active" : ""
              }`}
              onClick={() => setSelectedPage("page1")}
            >
              Weather Info
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                selectedPage === "page2" ? "active" : ""
              }`}
              onClick={() => setSelectedPage("page2")}
            >
              Air Pollution
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                selectedPage === "page3" ? "active" : ""
              }`}
              onClick={() => setSelectedPage("page3")}
            >
              Weather Prediction
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4" style={{ backgroundColor }}>
          {selectedPage === "page1" && <Page1 lat={lat} lon={long} />}
          {selectedPage === "page2" && <Page2 lat={lat} lon={long} />}
          {selectedPage === "page3" && <Page3 lat={lat} lon={long} />}

          {!selectedPage && (
            <>
              <h5>Selected Location:</h5>
              {selectedLocation ? (
                <div>
                  <p>
                    <strong>Location:</strong> {selectedLocation.formattedAddress}
                  </p>
                  <p>
                    <strong>Latitude:</strong> {lat}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {long}
                  </p>
                </div>
              ) : (
                <p>No location selected yet.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
