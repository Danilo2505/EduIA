import { useQuery } from "@tanstack/react-query";
import { loadSession, type Session } from "@/lib/session";

export function useSession() {
  return useQuery<Session | null>({
    queryKey: ["session"],
    queryFn: loadSession, 
    staleTime: Infinity, 
    gcTime: Infinity, 
  });
}
