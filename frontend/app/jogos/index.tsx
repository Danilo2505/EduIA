import makeListScreen from "@/components/makeListScreen";
export default makeListScreen({
  titulo: "Jogos Educativos",
  ctaRotulo: "Adicionar Jogo",
  ctaRota: "/jogos/novo",
  seed: [
    { id: "1", titulo: "Memória das Frações", tag: "Matemática", emoji: "🎮" },
  ],
});
