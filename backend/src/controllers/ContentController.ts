import { Request, Response } from 'express';
import { Content, Category } from '../models/Content';

export const ContentController = {
  async list(req: Request, res: Response) {
    const cat = (req.query.category as Category | undefined) || undefined;
    const data = await Content.listByUser(req.user!.id, cat);
    res.json(data);
  },

  async create(req: Request, res: Response) {
    const { title, body, category, tag, emoji } = req.body || {};
    if (!title || !body || !category) return res.status(400).json({ error: 'title, body e category são obrigatórios' });

    const id = await Content.create(req.user!.id, title, body, category, tag, emoji);
    res.status(201).json({ id });
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, body, tag, emoji } = req.body || {};
    if (!id || !title || !body) return res.status(400).json({ error: 'id, title e body são obrigatórios' });

    const ok = await Content.update(req.user!.id, id, title, body, tag, emoji);
    if (!ok) return res.status(404).json({ error: 'Não encontrado' });
    res.json({ ok: true });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'id é obrigatório' });

    const ok = await Content.remove(req.user!.id, id);
    if (!ok) return res.status(404).json({ error: 'Não encontrado' });
    res.json({ ok: true });
  },
};
