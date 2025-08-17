import makeListScreen from "@/layouts/makeListScreen";
export default makeListScreen({
  titulo: "Projetos Pedagógicos",
  ctaRotulo: "Novo Projeto",
  ctaRota: "/projetos/novo",
  seed: [
    {
      id: "1",
      titulo: "Horta na Escola (Interdisciplinar)",
      tag: "Projeto",
      emoji: "🌱",
    },
  ],
});
