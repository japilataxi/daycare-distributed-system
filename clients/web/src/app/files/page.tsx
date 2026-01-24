"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { requireAuthOrRedirect } from "@/lib/auth";

export default function FilesPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [selected, setSelected] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requireAuthOrRedirect();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const list = await api.listFiles();
      setFiles(list);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function upload() {
    if (!selected) return;
    setError(null);
    try {
      await api.uploadFile(selected);
      setSelected(null);
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Files</h1>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          type="file"
          onChange={(e) => setSelected(e.target.files?.[0] || null)}
        />
        <button onClick={upload} disabled={!selected}>Upload</button>
        <button onClick={load}>Refresh</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>ID</th>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>URL/Path</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id || f._id}>
              <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{f.id || f._id}</td>
              <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{f.originalName || f.name}</td>
              <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{f.url || f.path || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
