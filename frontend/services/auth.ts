import { http } from "./http";
import type { Session } from "@/lib/session";

type RegisterBody = { name: string; email: string; password: string };
type LoginBody = { email: string; password: string };

export async function register(body: RegisterBody): Promise<Session> {
  const { data } = await http.post("/auth/register", body);
  return data;
}

export async function login(body: LoginBody): Promise<Session> {
  const { data } = await http.post("/auth/login", body);
  return data;
}
