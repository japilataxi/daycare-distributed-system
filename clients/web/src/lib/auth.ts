const TOKEN_KEY = "daycare_token";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
}

export function requireAuthOrRedirect() {
  const t = getToken();
  if (!t) window.location.href = "/login";
}
