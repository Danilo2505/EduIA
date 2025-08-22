import PromptScreen from "@/layouts/Prompt";
export default function NovaHistoria() {
  return (
    <PromptScreen
      titulo="Criar História com IA"
      placeholder="Tema, personagens, cenário, moral, tamanho..."
      destinoLista="/historias"
      prefixoResultado="📖 História:"
      category="HISTORIA"
    />
  );
}
