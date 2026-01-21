"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { requireAuthOrRedirect, logout } from "@/lib/auth";

export default function HomePage() {
  const [me, setMe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requireAuthOrRedirect();
    api.me().then(setMe).catch((e) => setError(e.message));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: 32,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <h1 style={{ fontSize: 32 }}>Daycare Dashboard</h1>

          <button
            onClick={logout}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: "#dc3545",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* INTRO */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Welcome</h2>
          <p style={{ fontSize: 16, color: "#555" }}>
            Use the navigation menu to manage children, attendance, tracking,
            tutors, and files.
          </p>
        </div>

        {/* USER INFO */}
        <div style={{ ...cardStyle, marginTop: 24 }}>
          <h2 style={cardTitle}>Your Account</h2>

          {error && <p style={{ color: "crimson" }}>{error}</p>}

          {me ? (
            <pre
              style={{
                marginTop: 12,
                padding: 16,
                background: "#f8f9fa",
                borderRadius: 8,
                fontSize: 14,
                overflowX: "auto",
              }}
            >
              {JSON.stringify(me, null, 2)}
            </pre>
          ) : (
            <p style={{ color: "#777" }}>Loading user information...</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =======================
   Styles
======================= */

const cardStyle: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const cardTitle: React.CSSProperties = {
  fontSize: 22,
  marginBottom: 12,
};
