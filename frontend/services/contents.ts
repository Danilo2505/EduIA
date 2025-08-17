import { http } from "./http";

export type Category =
  | "PLANO_AULA" | "ATIVIDADE" | "HISTORIA" | "PROVA" | "PROJETO"
  | "JOGO" | "INCLUSAO" | "PLANEJAMENTO" | "MATERIAL";

export type ContentItem = {
  id: number;
  title: string;
  body: string;
  category: Category;
  tag?: string | null;
  emoji?: string | null;
  created_at: string;
};

export async function listContents(category?: Category): Promise<ContentItem[]> {
  const url = category ? `/contents?category=${encodeURIComponent(category)}` : "/contents";
  const { data } = await http.get(url);
  return data;
}

export async function createContent(payload: {
  title: string;
  body: string;
  category: Category;
  tag?: string;
  emoji?: string;
}): Promise<{ id: number }> {
  const { data } = await http.post("/contents", payload);
  return data;
}

export async function updateContent(id: number, payload: {
  title: string;
  body: string;
  tag?: string;
  emoji?: string;
}): Promise<{ ok: true }> {
  const { data } = await http.put(`/contents/${id}`, payload);
  return data;
}

export async function deleteContent(id: number): Promise<{ ok: true }> {
  const { data } = await http.delete(`/contents/${id}`);
  return data;
}
