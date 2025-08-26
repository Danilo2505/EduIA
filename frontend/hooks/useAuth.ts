import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "@/services/auth";
import { type Session } from "@/lib/session";

export function useRegisterMutation(options?: {
  onSuccess?: (s: Session) => void;
  onError?: (e: Error) => void;
}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (b: {
      name: string;
      email: string;
      password: string;
    }) => {
      const session = await register(b, qc); // <-- passar qc aqui
      return session;
    },
    ...options,
  });
}

export function useLoginMutation(options?: {
  onSuccess?: (s: Session) => void;
  onError?: (e: Error) => void;
}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (b: { email: string; password: string }) => {
      const session = await login(b, qc); // <-- passar qc aqui
      return session;
    },
    ...options,
  });
}
