import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { clearSession } from "@/lib/session";

export function useLogout() {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    await clearSession(); 
    queryClient.removeQueries({ queryKey: ["session"] });
  }, [queryClient]);
}
