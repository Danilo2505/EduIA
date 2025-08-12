import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const AuthController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email e password são obrigatórios' });

    const exists = await User.findByEmail(email);
    if (exists) return res.status(400).json({ error: 'E-mail já cadastrado' });

    const hash = await bcrypt.hash(password, 10);
    const id = await User.create(name, email, hash);
    const token = jwt.sign({ id, email, name }, env.jwtSecret, { expiresIn: '1d' });
    res.status(201).json({ id, name, email, token });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email e password são obrigatórios' });

    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: 'Credenciais inválidas' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, env.jwtSecret, { expiresIn: '1d' });
    res.json({ id: user.id, name: user.name, email: user.email, token });
  },
};
