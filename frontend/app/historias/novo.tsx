import PromptScreen from "@/components/Prompt";

export default function NovaHistoria() {
  return (
    <PromptScreen
      titulo="Criar História com IA"
      placeholder="Conte os elementos: tema, personagens, cenário, moral, tamanho desejado..."
      destinoLista="/historias/index"
      prefixoResultado="📖 História gerada:"
    />
  );
}
