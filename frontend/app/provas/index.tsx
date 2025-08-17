import makeListScreen from "@/layouts/makeListScreen";
export default makeListScreen({
  titulo: "Provas e Questões",
  ctaRotulo: "Gerar Prova",
  ctaRota: "/provas/novo",
  seed: [
    {
      id: "1",
      titulo: "Ciências - 5º ano (10 questões)",
      tag: "Ciências",
      emoji: "📝",
    },
  ],
});
