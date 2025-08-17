import makeListScreen from "@/layouts/makeListScreen";
export default makeListScreen({
  titulo: "Histórias",
  ctaRotulo: "Nova História",
  ctaRota: "/historias/novo",
  seed: [
    {
      id: "1",
      titulo: "A Galinha dos Ovos de Ouro",
      tag: "Clássico",
      emoji: "📖",
    },
  ],
});
