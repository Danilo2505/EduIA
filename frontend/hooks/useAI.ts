import { useMutation } from "@tanstack/react-query";
import { generateAI } from "@/services/openai";

export function useAIGenerate(options?: {
  onSuccess?: (text: string) => void;
  onError?: (e: Error) => void;
}) {
  return useMutation({
    mutationFn: (prompt: string) => generateAI(prompt),
    ...options,
  });
}
