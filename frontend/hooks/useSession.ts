import { useQuery } from "@tanstack/react-query";
import { loadSession, type Session } from "@/lib/session";

export function useSession() {
  return useQuery<Session | null>({
    queryKey: ["session"], // chave única para cache
    queryFn: loadSession, // função que busca a sessão no AsyncStorage
    staleTime: Infinity, // nunca expira (até o usuário fazer logout)
    gcTime: Infinity, // mantém no cache
  });
}
