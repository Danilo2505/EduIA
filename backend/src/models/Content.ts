import { pool } from "../db/mysql";

export type Category =
  | "PLANO_AULA"
  | "ATIVIDADE"
  | "HISTORIA"
  | "PROVA"
  | "PROJETO"
  | "JOGO"
  | "INCLUSAO"
  | "PLANEJAMENTO"
  | "MATERIAL";

export type ContentRow = {
  id: number;
  user_id: number;
  title: string;
  body: string;
  category: Category;
  tag: string | null;
  emoji: string | null;
  created_at: Date;
  updated_at: Date;
};

export const Content = {
  async listByUser(userId: number, category?: Category) {
    if (category) {
      const [rows] = await pool.query(
        "SELECT id,title,body,category,tag,emoji,created_at FROM contents WHERE user_id=? AND category=? ORDER BY id DESC",
        [userId, category]
      );
      return rows as ContentRow[];
    }
    const [rows] = await pool.query(
      "SELECT id,title,body,category,tag,emoji,created_at FROM contents WHERE user_id=? ORDER BY id DESC",
      [userId]
    );
    return rows as ContentRow[];
  },

  async findById(userId: number, id: number) {
    const [rows]: any = await pool.query(
      "SELECT * FROM contents WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return rows[0] ?? null;
  },

  async create(
    userId: number,
    title: string,
    body: string,
    category: Category,
    tag?: string,
    emoji?: string
  ) {
    const [r] = await pool.query(
      "INSERT INTO contents (user_id,title,body,category,tag,emoji) VALUES (?,?,?,?,?,?)",
      [userId, title, body, category, tag ?? null, emoji ?? null]
    );
    return (r as any).insertId as number;
  },
  async update(
    userId: number,
    id: number,
    title: string,
    body: string,
    tag?: string,
    emoji?: string
  ) {
    const [r] = await pool.query(
      "UPDATE contents SET title=?, body=?, tag=?, emoji=? WHERE id=? AND user_id=?",
      [title, body, tag ?? null, emoji ?? null, id, userId]
    );
    return (r as any).affectedRows > 0;
  },
  async remove(userId: number, id: number) {
    const [r] = await pool.query(
      "DELETE FROM contents WHERE id=? AND user_id=?",
      [id, userId]
    );
    return (r as any).affectedRows > 0;
  },
};
