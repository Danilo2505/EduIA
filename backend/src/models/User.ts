import { pool } from '../db/mysql';

export type UserRow = {
  id: number; name: string; email: string; password_hash: string;
  created_at: Date; updated_at: Date;
};

export const User = {
  async findByEmail(email: string) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=? LIMIT 1', [email]);
    const arr = rows as UserRow[];
    return arr[0] || null;
  },
  async create(name: string, email: string, passwordHash: string) {
    const [r] = await pool.query('INSERT INTO users (name,email,password_hash) VALUES (?,?,?)',
      [name, email, passwordHash]);
    return (r as any).insertId as number;
  },
};
