import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(
        "https://what2wear-backend.vercel.app/register",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // Handle successful Register (e.g., store token, redirect to protected route)
      console.log("Register successful:", response.data);
      navigate("/login"); // Replace with your protected route path
    } catch (error) {
      setError(error.response.data.message || "Register failed");
    }
  };

  return (
    <div className="register">
      <div className="register-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">REGISTER</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="register-redirect">
          <p>
            Click <Link to="/login">Login</Link> if you are an existing user
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
