import makeListScreen from "@/layouts/makeListScreen";
export default makeListScreen({
  titulo: "Recursos Inclusivos",
  ctaRotulo: "Novo Recurso",
  ctaRota: "/inclusao/novo",
  seed: [
    {
      id: "1",
      titulo: "Texto em Leitura Fácil",
      tag: "Acessibilidade",
      emoji: "♿",
    },
  ],
});
