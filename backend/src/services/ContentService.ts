import { openai } from "../lib/openai";

export const ContentService = {
  async generateContent(prompt: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Você é um assistente pedagógico especializado em criar planos de aula,
atividades, histórias, provas e materiais educativos de apoio para professores
e cuidadores.

Regras de estilo:
- Responda sempre em português.
- Produza respostas claras, bem estruturadas e objetivas.
- Não use Markdown (#, **, etc.). Use apenas texto puro com quebras de linha.
- Organize a resposta em seções, listas numeradas ou tópicos simples.
- Adapte o nível da linguagem ao público (educadores, pais, ou crianças pequenas).
- Seja criativo, mas mantenha aplicabilidade prática.
        `,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content ?? "Sem resposta.";
  },
};
