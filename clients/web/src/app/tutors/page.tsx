"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function TutorsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requireAuthOrRedirect();
    load();
  }, []);

  async function load() {
    setError(null);
    try {
      const data = await api.listTutors();
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e.message || "Failed to load tutors");
    }
  }

  async function create() {
    setError(null);
    try {
      await api.createTutor({ firstName, lastName, email, phone });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      await load();
    } catch (e: any) {
      setError(e.message || "Failed to create tutor");
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
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>Tutors</h1>

        {/* CREATE */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Create Tutor</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <button
                onClick={create}
                disabled={!firstName || !lastName || !email || !phone}
                style={buttonStyle}
              >
                Create Tutor
              </button>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div style={{ ...cardStyle, marginTop: 32 }}>
          <h2 style={cardTitle}>Tutors List</h2>

          {error && <p style={{ color: "crimson" }}>{error}</p>}

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["ID", "First name", "Last name", "Email", "Phone"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: 10,
                          borderBottom: "2px solid #e0e0e0",
                          fontSize: 14,
                          color: "#555",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((t) => (
                  <tr key={t.id}>
                    <td style={cellStyle}>{t.id}</td>
                    <td style={cellStyle}>{t.firstName}</td>
                    <td style={cellStyle}>{t.lastName}</td>
                    <td style={cellStyle}>{t.email}</td>
                    <td style={cellStyle}>{t.phone}</td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: 16,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      No tutors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
  marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 20px",
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 8,
  border: "none",
  background: "#198754",
  color: "#fff",
  cursor: "pointer",
};

const cellStyle: React.CSSProperties = {
  padding: 10,
  borderBottom: "1px solid #f0f0f0",
  fontSize: 14,
};
