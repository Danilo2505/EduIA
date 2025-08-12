import makeListScreen from "@/components/makeListScreen";
export default makeListScreen({
  titulo: "Atividades Lúdicas",
  ctaRotulo: "Nova Atividade",
  ctaRota: "/atividades/novo",
  seed: [
    { id: "1", titulo: "Bingo das Sílabas", tag: "Linguagem", emoji: "🎲" },
  ],
});
