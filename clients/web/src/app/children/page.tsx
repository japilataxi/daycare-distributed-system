"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function ChildrenPage() {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [tutorId, setTutorId] = useState("");

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const data = await api.listChildren();
      setChildren(data);
    } catch (e: any) {
      setError(e.message || "Failed to fetch children");
    } finally {
      setLoading(false);
    }
  }

  async function createChild(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api.createChild({ firstName, lastName, birthDate, tutorId });
      setFirstName("");
      setLastName("");
      setBirthDate("");
      setTutorId("");
      await load();
    } catch (e: any) {
      setError(e.message || "Create failed");
    }
  }

  useEffect(() => {
    requireAuthOrRedirect();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>Children</h1>

        {/* CREATE */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Create Child</h2>

          <form
            onSubmit={createChild}
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
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Tutor ID"
              value={tutorId}
              onChange={(e) => setTutorId(e.target.value)}
              style={inputStyle}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <button type="submit" style={buttonStyle}>
                Create Child
              </button>
            </div>
          </form>
        </div>

        {/* LIST */}
        <div style={{ ...cardStyle, marginTop: 32 }}>
          <h2 style={cardTitle}>Children List</h2>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "crimson" }}>{error}</p>}

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["ID", "First name", "Last name", "Birth date", "Tutor ID"].map(
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
                {children.map((c) => (
                  <tr key={c.id}>
                    <td style={cellStyle}>{c.id}</td>
                    <td style={cellStyle}>{c.firstName}</td>
                    <td style={cellStyle}>{c.lastName}</td>
                    <td style={cellStyle}>{c.birthDate}</td>
                    <td style={cellStyle}>{c.tutorId}</td>
                  </tr>
                ))}

                {!loading && children.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: 16,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      No children found
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
  background: "#0d6efd",
  color: "#fff",
  cursor: "pointer",
};

const cellStyle: React.CSSProperties = {
  padding: 10,
  borderBottom: "1px solid #f0f0f0",
  fontSize: 14,
};
