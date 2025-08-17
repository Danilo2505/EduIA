import PromptScreen from "@/layouts/Prompt";

export default function NovaHistoria() {
  return (
    <PromptScreen
      titulo="Criar História com IA"
      placeholder="Conte os elementos: tema, personagens, cenário, moral, tamanho desejado..."
      destinoLista="/historias"
      prefixoResultado="📖 História gerada:"
    />
  );
}
