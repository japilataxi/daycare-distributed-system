import { config } from "../config";

type HttpMethod = "GET" | "POST";

async function request<T>(url: string, options: { method: HttpMethod; body?: any } = { method: "GET" }) {
  const res = await fetch(url, {
    method: options.method,
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  tutorId: string;
  active?: boolean;
  createdAt?: string;
};

export type Attendance = {
  id: string;
  childId: string;
  checkedInBy: string;
  checkInAt: string;
  checkedOutBy?: string | null;
  checkOutAt?: string | null;
};

export const api = {
  // CHILDREN
  listChildren: () => request<Child[]>(`${config.childrenBaseUrl}/children`),
  createChild: (payload: { firstName: string; lastName: string; birthDate: string; tutorId: string }) =>
    request<Child>(`${config.childrenBaseUrl}/children`, { method: "POST", body: payload }),

  // ATTENDANCE (según tu swagger)
  checkIn: (payload: { childId: string; checkedInBy: string }) =>
    request<Attendance>(`${config.attendanceBaseUrl}/attendance/check-in`, { method: "POST", body: payload }),

  // OJO: tu swagger dice POST /attendance/{id}/check-out con body { checkedOutBy }
  checkOut: (attendanceId: string, payload: { checkedOutBy: string }) =>
    request<Attendance>(`${config.attendanceBaseUrl}/attendance/${attendanceId}/check-out`, {
      method: "POST",
      body: payload,
    }),
};
