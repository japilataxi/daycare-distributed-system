"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8001/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) {
    return <p style={{ padding: 40, color: "#000" }}>Cargando...</p>;
  }

  return (
    <div style={{ padding: 40, color: "#000" }}>
      <h1>Dashboard</h1>
      <p><strong>Email:</strong> {user.email}</p>

      <button
        onClick={() => {
          localStorage.removeItem("access_token");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
