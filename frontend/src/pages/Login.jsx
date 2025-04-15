import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isLoggedIn } = useContext(AuthContext); // Added isLoggedIn to manage the check
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Automatically redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const token = await res.text(); // Get plain text token from response
      login(token); // Store token in context and localStorage
      navigate("/dashboard"); // Navigate to the dashboard page after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#F5F7FA" }}
    >
      <form
        className="p-5 rounded shadow"
        onSubmit={handleLogin}
        style={{ backgroundColor: "white", width: "350px" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#4A90E2" }}>
          Login
        </h3>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#4A90E2", color: "white" }}
        >
          Login
        </button>

        <div className="mt-3 text-center">
          <span>Don’t have an account? </span>
          <a href="/signup" style={{ color: "#FFB200" }}>
            Signup
          </a>
        </div>
      </form>
    </div>
  );
}
