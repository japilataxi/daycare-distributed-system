"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function TrackingPage() {
  const [childId, setChildId] = useState("");

  const [newStatus, setNewStatus] = useState("IN_DAYCARE");
  const [updatedBy, setUpdatedBy] = useState("staff-001");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requireAuthOrRedirect();
  }, []);

  /** 🔧 Limpia espacios / tabs del ID */
  const cleanChildId = childId.trim();

  async function loadStatus() {
    setError(null);
    setResult(null);
    try {
      const data = await api.getChildStatus(cleanChildId);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to load status");
    }
  }

  async function updateStatus() {
    setError(null);
    setResult(null);
    try {
      const res = await api.setChildStatus(cleanChildId, {
        status: newStatus,
        updatedBy,
      });
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Update failed");
    }
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={pageTitle}>Child Tracking</h1>

        {/* SEARCH STATUS */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Current Status</h2>

          <input
            placeholder="Child ID"
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={loadStatus}
            disabled={!cleanChildId}
            style={buttonStyle}
          >
            Get current status
          </button>
        </div>

        {/* UPDATE STATUS */}
        <div style={{ ...cardStyle, marginTop: 32 }}>
          <h2 style={cardTitle}>Update Status</h2>

          <div style={{ display: "grid", gap: 16 }}>
            <input
              placeholder="Status (e.g. IN_DAYCARE, PICKED_UP)"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Updated by"
              value={updatedBy}
              onChange={(e) => setUpdatedBy(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={updateStatus}
              disabled={!cleanChildId || !newStatus || !updatedBy}
              style={{ ...buttonStyle, background: "#0d6efd" }}
            >
              Update status
            </button>
          </div>
        </div>

        {/* ERRORS */}
        {error && (
          <p style={{ color: "crimson", marginTop: 20, textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* RESULT */}
        {result && (
          <pre style={resultStyle}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

/* =======================
   Styles
======================= */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f4f6f8",
  padding: 32,
  fontFamily: "system-ui, sans-serif",
};

const pageTitle: React.CSSProperties = {
  fontSize: 32,
  marginBottom: 24,
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  display: "grid",
  gap: 16,
};

const cardTitle: React.CSSProperties = {
  fontSize: 22,
};

const inputStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 8,
  border: "none",
  background: "#198754",
  color: "#fff",
  cursor: "pointer",
};

const resultStyle: React.CSSProperties = {
  marginTop: 24,
  padding: 16,
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  overflowX: "auto",
  fontSize: 14,
};
