import { Router } from "express";
import { openai } from "../lib/openai";
import { requireAuth } from "../middlewares/auth";

export const openaiRoutes = Router();
openaiRoutes.use(requireAuth);

openaiRoutes.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt é obrigatório" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // modelo rápido e barato
      messages: [
        { role: "system", content: "Você é um assistente educacional." },
        { role: "user", content: prompt },
      ],
    });

    res.json({ text: completion.choices[0].message.content });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar resposta" });
  }
});
