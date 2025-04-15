import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // This clears token + localStorage
    navigate("/");       // Navigate AFTER token is cleared
  };

  return (
    <nav
      className="d-flex align-items-center justify-content-between px-4"
      style={{
        backgroundColor: "#4A90E2",
        color: "white",
        height: "60px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      {/* Center Title */}
      <div className="w-100 text-center">
        <h5 className="m-0" style={{ fontWeight: "bold" }}>
          NextWeather
        </h5>
      </div>

      {/* Logout Button on Right (only if logged in) */}
      <div className="ml-auto">
        {token && (
          <button
            className="btn btn-light"
            onClick={handleLogout}
            style={{ fontWeight: "bold" }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
