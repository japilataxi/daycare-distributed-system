"use client";

import { useEffect, useState } from "react";
import { api, type Notification } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requireAuthOrRedirect();
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    setError(null);
    setLoading(true);
    try {
      const data = await api.listNotifications();
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Notifications</h1>

      <button onClick={refresh} disabled={loading} style={{ marginBottom: 12 }}>
        {loading ? "Loading..." : "Refresh"}
      </button>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th align="left">Created</th>
            <th align="left">Message</th>
            <th align="left">Source</th>
            <th align="left">Child ID</th>
            <th align="left">ID</th>
          </tr>
        </thead>
        <tbody>
          {items.map((n) => (
            <tr key={n.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td>{new Date(n.createdAt).toLocaleString()}</td>
              <td>{n.message}</td>
              <td>{n.source}</td>
              <td>{n.childId}</td>
              <td style={{ fontFamily: "monospace", fontSize: 12 }}>{n.id}</td>
            </tr>
          ))}

          {!loading && items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ paddingTop: 12 }}>
                No notifications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
