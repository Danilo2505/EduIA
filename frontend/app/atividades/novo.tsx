import PromptScreen from "@/layouts/Prompt";

export default function NovaAtividade() {
  return (
    <PromptScreen
      titulo="Criar Atividade Lúdica com IA"
      placeholder="Descreva a atividade: objetivo, faixa etária, materiais, tempo, regras, avaliação..."
      destinoLista="/atividades"
      prefixoResultado="🎲 Atividade gerada:"
    />
  );
}
