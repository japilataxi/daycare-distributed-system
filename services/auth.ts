export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return response.json();
}
