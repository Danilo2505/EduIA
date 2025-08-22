import PromptScreen from "@/layouts/Prompt";

export default function NovaAtividade() {
  return (
    <PromptScreen
      titulo="Criar Atividade com IA"
      placeholder="Tema, objetivo, nível escolar, materiais necessários, instruções..."
      destinoLista="/atividades"
      prefixoResultado="📝 Atividade:"
      category="ATIVIDADE"
    />
  );
}
