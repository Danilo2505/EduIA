import { Request, Response } from "express";
import { Content, Category } from "../models/Content";
import { openai } from "../lib/openai";

export const ContentController = {
  async list(req: Request, res: Response) {
    const cat = (req.query.category as Category | undefined) || undefined;
    const data = await Content.listByUser(req.user!.id, cat);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const { title, body, category, tag, emoji } = req.body || {};
    if (!title || !body || !category)
      return res
        .status(400)
        .json({ error: "title, body e category são obrigatórios" });

    const id = await Content.create(
      req.user!.id,
      title,
      body,
      category,
      tag,
      emoji
    );
    res.status(201).json({ id });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, body, tag, emoji } = req.body || {};
    if (!id || !title || !body)
      return res
        .status(400)
        .json({ error: "id, title e body são obrigatórios" });

    const ok = await Content.update(req.user!.id, id, title, body, tag, emoji);
    if (!ok) return res.status(404).json({ error: "Não encontrado" });
    res.json({ ok: true });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "id é obrigatório" });

    const ok = await Content.remove(req.user!.id, id);
    if (!ok) return res.status(404).json({ error: "Não encontrado" });
    res.json({ ok: true });
  },
  async generate(req: Request, res: Response) {
    try {
      const { prompt, category, tag, emoji } = req.body || {};
      if (!prompt || !category)
        return res
          .status(400)
          .json({ error: "prompt e category são obrigatórios" });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente pedagógico que gera planos, atividades e recursos educativos.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 800, // limita resposta -> mais rápido/mais barato
        temperature: 0.7,
      });

      const generated =
        completion.choices[0]?.message?.content ?? "Sem resposta.";

      // Salva no banco
      const id = await Content.create(
        req.user!.id,
        prompt, // título baseado no prompt
        generated, // corpo vindo do GPT
        category,
        tag,
        emoji
      );

      res
        .status(201)
        .json({ id, title: prompt, body: generated, category, tag, emoji });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Falha ao gerar conteúdo" });
    }
  },
};
