// services/auth.ts
import { http } from "./http";
import { saveSession, clearSession, type Session } from "@/lib/session";
import { QueryClient } from "@tanstack/react-query";

type RegisterBody = { name: string; email: string; password: string };
type LoginBody = { email: string; password: string };

/** Normaliza a resposta do backend para o tipo Session */
function mapToSession(raw: any, headers?: Record<string, any>): Session {
  const token =
    raw?.token ??
    raw?.accessToken ??
    raw?.access_token ??
    raw?.jwt ??
    (headers?.authorization
      ? String(headers.authorization).replace(/^Bearer\s+/i, "")
      : "");

  const user =
    raw?.user ?? raw?.usuario ?? raw?.data?.user ?? raw?.profile ?? raw;

  const id = Number(user?.id ?? raw?.id ?? 0) || 0;

  const nameFromFields =
    user?.name ??
    user?.nome ??
    [user?.firstName ?? user?.first_name, user?.lastName ?? user?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

  const email = user?.email ?? raw?.email ?? "";

  const name =
    (nameFromFields && String(nameFromFields).trim()) ||
    (email ? String(email).split("@")[0] : "Usuário");

  return { id, name, email, token };
}

/** Aplica ou remove o token no axios */
export function applyAuthToken(token: string | null) {
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common.Authorization;
  }
}

export async function register(
  body: RegisterBody,
  qc: QueryClient
): Promise<Session> {
  const res = await http.post("/auth/register", body);
  const session = mapToSession(res.data, res.headers);
  await saveSession(session);
  applyAuthToken(session.token);
  qc.setQueryData(["session"], session);
  return session;
}

export async function login(
  body: LoginBody,
  qc: QueryClient
): Promise<Session> {
  const res = await http.post("/auth/login", body);
  const session = mapToSession(res.data, res.headers);
  await saveSession(session);
  applyAuthToken(session.token);
  qc.setQueryData(["session"], session);
  return session;
}

export async function logout(qc: QueryClient) {
  await clearSession();
  applyAuthToken(null);
  qc.removeQueries({ queryKey: ["session"] });
}
