import { config } from "@/config";
import { getToken } from "@/lib/auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  url: string,
  options: {
    method: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
  } = { method: "GET" }
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method: options.method,
    headers,
    body:
      options.body instanceof FormData
        ? options.body
        : options.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return (await res.text()) as unknown as T;
  }

  return (await res.json()) as T;
}

/* =======================
   DTOs / Types
======================= */


export type CreateChildDto = {
  firstName: string;
  lastName: string;
  birthDate: string;
  tutorId: string;
};

export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  tutorId: string;
  active?: boolean;
  createdAt?: string;
};


export type RegisterDto = {
  email: string;
  fullName: string;
  password: string;
  role: "ADMIN" | "STAFF" | "PARENT";
};

export type MeDto = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

export type CreateStaffDto = {
  firstName: string;
  lastName: string;
  role: string;
};

/* =======================
   API
======================= */

export const api = {
  /* ---------- AUTH ---------- */

  register: (payload: RegisterDto) =>
    request<{ id: string; email: string; fullName: string; role: string }>(
      `${config.authBaseUrl}/auth/register`,
      { method: "POST", body: payload }
    ),

  login: (email: string, password: string) =>
    request<{ accessToken: string }>(
      `${config.authBaseUrl}/auth/login`,
      {
        method: "POST",
        body: { email, password },
      }
    ),

  me: () =>
    request<MeDto>(`${config.authBaseUrl}/auth/me`, { method: "GET" }),

  /* ---------- CHILDREN ---------- */

  listChildren: () =>
    request<any[]>(`/api/proxy/children/children`, { method: "GET" }),

  createChild: (payload: any) =>
    request<any>(`/api/proxy/children/children`, {
      method: "POST",
      body: payload,
    }),
  /* ---------- ATTENDANCE ---------- */

  checkIn: (payload: { childId: string; checkedInBy: string }) =>
    request<any>(`${config.attendanceBaseUrl}/attendance/check-in`, {
      method: "POST",
      body: payload,
    }),

  checkOut: (
    attendanceId: string,
    payload: { checkedOutBy: string }
  ) =>
    request<any>(
      `${config.attendanceBaseUrl}/attendance/${attendanceId}/check-out`,
      {
        method: "POST",
        body: payload,
      }
    ),

  /* ---------- TRACKING ---------- */

  getChildStatus: (childId: string) =>
    request<any>(
      `${config.trackingBaseUrl}/tracking/children/${childId}/status`,
      { method: "GET" }
    ),

  setChildStatus: (
    childId: string,
    payload: { status: string; updatedBy: string }
  ) =>
    request<any>(
      `${config.trackingBaseUrl}/tracking/children/${childId}/status`,
      {
        method: "POST",
        body: payload,
      }
    ),

  /* ---------- TUTORS (Next proxy) ---------- */

  listTutors: () =>
    request<any[]>(`/api/proxy/tutors/tutors`, { method: "GET" }),

  createTutor: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) =>
    request<any>(`/api/proxy/tutors/tutors`, {
      method: "POST",
      body: payload,
    }),

  getTutorById: (id: string) =>
    request<any>(`/api/proxy/tutors/tutors/${id}`, { method: "GET" }),

  /* ---------- FILES ---------- */

  // FILES
listFiles: () =>
  request<any[]>(`/api/proxy/files/files`, { method: "GET" }),

uploadFile: (file: File) => {
  const form = new FormData();
  form.append("file", file);

  return request<any>(`/api/proxy/files/files/upload`, {
    method: "POST",
    body: form,
    headers: {}, // browser sets multipart boundary
  });
},

/////////////////// STAFF ---------- //

listStaff: () => request<any[]>(`/api/proxy/staff/staff`, { method: "GET" }),

  createStaff: (payload: CreateStaffDto) =>
    request<any>(`/api/proxy/staff/staff`, {
      method: "POST",
      body: payload,
    }),

};
