import { http } from "./http";

export async function generateAI(prompt: string): Promise<string> {
  const { data } = await http.post<{ text: string }>(
    "/openai/generate",
    { prompt },
    { timeout: 90000 } 
  );
  return data.text;
}
