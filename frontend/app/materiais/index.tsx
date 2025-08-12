import makeListScreen from "@/components/makeListScreen";
export default makeListScreen({
  titulo: "Materiais de Apoio",
  ctaRotulo: "Adicionar Material",
  ctaRota: "/materiais/novo",
  seed: [
    { id: "1", titulo: "Cartazes de Sílabas (PDF)", tag: "Impressos", emoji: "📂" },
  ],
});
