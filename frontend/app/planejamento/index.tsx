import makeListScreen from "@/components/makeListScreen";
export default makeListScreen({
  titulo: "Planejamento Semanal",
  ctaRotulo: "Novo Planejamento",
  ctaRota: "/planejamento/novo",
  seed: [
    { id: "1", titulo: "Semana 34 - 1º ano", tag: "Planejamento", emoji: "🗓️" },
  ],
});
