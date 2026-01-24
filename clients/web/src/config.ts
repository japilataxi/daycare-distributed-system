function env(serviceKey: string, publicKey: string, fallback: string) {
  // Prefer internal (Docker/EC2) env vars first
  return process.env[serviceKey] || process.env[publicKey] || fallback;
}

export const config = {
  authBaseUrl: env("AUTH_BASE_URL", "NEXT_PUBLIC_AUTH_BASE_URL", "http://localhost:3000"),
  childrenBaseUrl: env("CHILDREN_BASE_URL", "NEXT_PUBLIC_CHILDREN_BASE_URL", "http://localhost:3005"),
  attendanceBaseUrl: env("ATTENDANCE_BASE_URL", "NEXT_PUBLIC_ATTENDANCE_BASE_URL", "http://localhost:3002"),
  trackingBaseUrl: env("TRACKING_BASE_URL", "NEXT_PUBLIC_TRACKING_BASE_URL", "http://localhost:3003"),
  filesBaseUrl: env("FILES_BASE_URL", "NEXT_PUBLIC_FILES_BASE_URL", "http://localhost:3008"),
  tutorsBaseUrl: env("TUTORS_BASE_URL", "NEXT_PUBLIC_TUTORS_BASE_URL", "http://localhost:3006"),
  staffBaseUrl: env("STAFF_BASE_URL", "NEXT_PUBLIC_STAFF_BASE_URL", "http://localhost:3007"),
  notificationsBaseUrl: env("NOTIFICATIONS_BASE_URL", "NEXT_PUBLIC_NOTIFICATIONS_BASE_URL", "http://localhost:3004"),
};
