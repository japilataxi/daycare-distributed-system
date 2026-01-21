"use client";

import { useState } from "react";
import { api, RegisterDto } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  // login
  const [email, setEmail] = useState("parent@uce.edu.ec");
  const [password, setPassword] = useState("ChangeMe123!");

  // register
  const [rFullName, setRFullName] = useState("Jefferson Perez");
  const [rEmail, setREmail] = useState("parent@uce.edu.ec");
  const [rPassword, setRPassword] = useState("ChangeMe123!");
  const [rRole, setRRole] = useState<RegisterDto["role"]>("ADMIN");

  const [error, setError] = useState<string | null>(null);

  async function doRegister() {
    setError(null);
    try {
      await api.register({
        email: rEmail,
        fullName: rFullName,
        password: rPassword,
        role: rRole,
      });

      const loginRes = await api.login(rEmail, rPassword);
      setToken(loginRes.accessToken);
      window.location.href = "/";
    } catch (e: any) {
      setError(e.message || "Register failed");
    }
  }

  async function doLogin() {
    setError(null);
    try {
      const res = await api.login(email, password);
      setToken(res.accessToken);
      window.location.href = "/";
    } catch (e: any) {
      setError(e.message || "Login failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ width: 420 }}>
        <h1 style={{ fontSize: 32, textAlign: "center", marginBottom: 24 }}>
          Welcome
        </h1>

        {/* LOGIN */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Login</h2>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={doLogin}
            disabled={!email || !password}
            style={buttonStyle}
          >
            Login
          </button>
        </div>

        {/* REGISTER */}
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <h2 style={cardTitle}>Register</h2>

          <input
            placeholder="Full name"
            value={rFullName}
            onChange={(e) => setRFullName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={rEmail}
            onChange={(e) => setREmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={rPassword}
            onChange={(e) => setRPassword(e.target.value)}
            style={inputStyle}
          />

          <select
            value={rRole}
            onChange={(e) => setRRole(e.target.value as any)}
            style={inputStyle}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="STAFF">STAFF</option>
            <option value="PARENT">PARENT</option>
          </select>

          <button
            onClick={doRegister}
            disabled={!rFullName || !rEmail || !rPassword}
            style={{ ...buttonStyle, background: "#0d6efd" }}
          >
            Register & Login
          </button>
        </div>

        {error && (
          <p
            style={{
              color: "crimson",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

/* =======================
   Styles (inline, simple)
======================= */

const cardStyle: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  display: "grid",
  gap: 12,
};

const cardTitle: React.CSSProperties = {
  fontSize: 22,
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: 16,
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 8,
  padding: "12px",
  fontSize: 16,
  fontWeight: 600,
  color: "#fff",
  background: "#198754",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
