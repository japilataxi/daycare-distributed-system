"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <NavItem href="/" label="Home" />
        <NavItem href="/children" label="Children" />
        <NavItem href="/attendance" label="Attendance" />
        <NavItem href="/tracking" label="Tracking" />
        <NavItem href="/files" label="Files" />
        <NavItem href="/tutors" label="Tutors" />
        <NavItem href="/staff" label="Staff" />
        <NavItem href="/notifications" label="Notifications" />
      </div>
    </nav>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 15,
        fontWeight: 500,
        color: "#333",
        textDecoration: "none",
        padding: "6px 10px",
        borderRadius: 6,
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "#f1f3f5")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      {label}
    </Link>
  );
}
