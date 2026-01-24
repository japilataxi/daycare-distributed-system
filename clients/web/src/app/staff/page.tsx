"use client";

import { useEffect, useState } from "react";
import { api, CreateStaffDto } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function StaffPage() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("STAFF");

  async function load() {
    setError(null);
    try {
      const data = await api.listStaff();
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e.message || "Failed to fetch staff");
    }
  }

  async function create() {
    setError(null);
    try {
      const payload: CreateStaffDto = { firstName, lastName, role };
      await api.createStaff(payload);
      setFirstName("");
      setLastName("");
      setRole("STAFF");
      await load();
    } catch (e: any) {
      setError(e.message || "Failed to create staff");
    }
  }

  useEffect(() => {
    requireAuthOrRedirect();
    load();
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
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>Staff</h1>

        {/* CREATE */}
        <div style={cardStyle}>
          <h2 style={cardTitle}>Create Staff</h2>

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
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={inputStyle}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <button
                onClick={create}
                disabled={!firstName || !lastName || !role}
                style={buttonStyle}
              >
                Create Staff
              </button>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div style={{ ...cardStyle, marginTop: 32 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <h2 style={cardTitle}>Staff List</h2>

            <button
              onClick={load}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          </div>

          {error && <p style={{ color: "crimson" }}>{error}</p>}

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["ID", "First name", "Last name", "Role"].map((h) => (
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
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id}>
                    <td style={cellStyle}>{s.id}</td>
                    <td style={cellStyle}>{s.firstName}</td>
                    <td style={cellStyle}>{s.lastName}</td>
                    <td style={cellStyle}>{s.role}</td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: 16,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      No staff members found
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
