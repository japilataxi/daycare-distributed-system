export const config = {
  authBaseUrl: process.env.NEXT_PUBLIC_AUTH_BASE_URL || "http://localhost:3000",
  childrenBaseUrl: process.env.NEXT_PUBLIC_CHILDREN_BASE_URL || "http://localhost:3005",
  attendanceBaseUrl: process.env.NEXT_PUBLIC_ATTENDANCE_BASE_URL || "http://localhost:3002",
  trackingBaseUrl: process.env.NEXT_PUBLIC_TRACKING_BASE_URL || "http://localhost:3003",
  filesBaseUrl: process.env.NEXT_PUBLIC_FILES_BASE_URL || "http://localhost:3008",
  tutorsBaseUrl: process.env.NEXT_PUBLIC_TUTORS_BASE_URL || "http://localhost:3006",
  staffBaseUrl: process.env.NEXT_PUBLIC_STAFF_BASE_URL || "http://localhost:3007",

};
