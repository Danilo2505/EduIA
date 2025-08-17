import makeListScreen from "@/layouts/makeListScreen";
export default makeListScreen({
  titulo: "Planos de Aula",
  ctaRotulo: "Criar Plano",
  ctaRota: "/plano-aula/novo",
  seed: [
    {
      id: "1",
      titulo: "Matemática - Adição (1º ano)",
      tag: "Matemática",
      emoji: "📐",
    },
  ],
});
