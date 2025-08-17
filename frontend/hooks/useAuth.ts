import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/services/auth";
import { saveSession, type Session } from "@/lib/session";

export function useRegisterMutation(options?: {
  onSuccess?: (s: Session) => void;
  onError?: (e: Error) => void;
}) {
  return useMutation({
    mutationFn: async (b: { name: string; email: string; password: string }) => {
      const session = await register(b);
      await saveSession(session);
      return session;
    },
    ...options,
  });
}

export function useLoginMutation(options?: {
  onSuccess?: (s: Session) => void;
  onError?: (e: Error) => void;
}) {
  return useMutation({
    mutationFn: async (b: { email: string; password: string }) => {
      const session = await login(b);
      await saveSession(session);
      return session;
    },
    ...options,
  });
}
