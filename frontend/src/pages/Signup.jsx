import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Signup successful! Please login.");
      navigate("/");
    } else {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#F5F7FA" }}>
      <form
        className="p-5 rounded shadow"
        onSubmit={handleSignup}
        style={{ backgroundColor: "white", width: "350px" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#4A90E2" }}>Signup</h3>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#4A90E2", color: "white" }}
        >
          Signup
        </button>

        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <a href="/login" style={{ color: "#FFB200" }}>Login</a>
        </div>
      </form>
    </div>
  );
}
