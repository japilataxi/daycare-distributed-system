"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function AttendancePage() {
  const [childId, setChildId] = useState("");
  const [checkedInBy, setCheckedInBy] = useState("staff-001");

  const [attendanceId, setAttendanceId] = useState("");
  const [checkedOutBy, setCheckedOutBy] = useState("staff-001");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requireAuthOrRedirect();
  }, []);

  async function doCheckIn() {
    setError(null);
    setResult(null);
    try {
      const res = await api.checkIn({ childId, checkedInBy });
      setResult(res);
      if (res?.id) setAttendanceId(res.id);
    } catch (e: any) {
      setError(e.message || "Check-in failed");
    }
  }

  async function doCheckOut() {
    setError(null);
    setResult(null);
    try {
      const res = await api.checkOut(attendanceId, { checkedOutBy });
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Check-out failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: 32,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>Attendance</h1>

        {/* CHECK IN */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Check-in</h2>

          <div style={{ display: "grid", gap: 16 }}>
            <input
              placeholder="Child ID"
              value={childId}
              onChange={(e) => setChildId(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Checked in by"
              value={checkedInBy}
              onChange={(e) => setCheckedInBy(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={doCheckIn}
              disabled={!childId || !checkedInBy}
              style={buttonStyle}
            >
              Check-in
            </button>
          </div>
        </div>

        {/* CHECK OUT */}
        <div style={{ ...cardStyle, marginTop: 32 }}>
          <h2 style={cardTitle}>Check-out</h2>

          <div style={{ display: "grid", gap: 16 }}>
            <input
              placeholder="Attendance ID"
              value={attendanceId}
              onChange={(e) => setAttendanceId(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Checked out by"
              value={checkedOutBy}
              onChange={(e) => setCheckedOutBy(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={doCheckOut}
              disabled={!attendanceId || !checkedOutBy}
              style={{ ...buttonStyle, background: "#dc3545" }}
            >
              Check-out
            </button>
          </div>
        </div>

        {/* RESULT */}
        {error && (
          <p style={{ color: "crimson", marginTop: 20, textAlign: "center" }}>
            {error}
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: 32,
              padding: 24,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              fontSize: 15,
            }}
          >
            <h3 style={{ marginBottom: 16 }}>Attendance Record</h3>

            {/* STATUS */}
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
                background: result.checkOutAt ? "#dc3545" : "#198754",
                color: "#fff",
              }}
            >
              {result.checkOutAt ? "CHECKED OUT" : "CHECKED IN"}
            </div>

            <p><strong>ID:</strong> {result.id}</p>
            <p><strong>Child ID:</strong> {result.childId}</p>

            <p><strong>Checked in by:</strong> {result.checkedInBy}</p>
            <p>
              <strong>Check-in at:</strong>{" "}
              {new Date(result.checkInAt).toLocaleString()}
            </p>

            {result.checkOutAt && (
              <>
                <p><strong>Checked out by:</strong> {result.checkedOutBy}</p>
                <p>
                  <strong>Check-out at:</strong>{" "}
                  {new Date(result.checkOutAt).toLocaleString()}
                </p>
              </>
            )}
          </div>
        )}

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
  marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
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
