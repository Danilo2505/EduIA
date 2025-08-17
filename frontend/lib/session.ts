import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "auth";

export type Session = { id: number; name: string; email: string; token: string };

export async function saveSession(session: Session) {
  await AsyncStorage.setItem(KEY, JSON.stringify(session));
}

export async function loadSession(): Promise<Session | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function getToken(): Promise<string | null> {
  const s = await loadSession();
  return s?.token ?? null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(KEY);
}
