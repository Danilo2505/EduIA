import PromptScreen from "@/layouts/Prompt";

export default function NovoProjeto() {
  return (
    <PromptScreen
      titulo="Criar Projeto Pedagógico com IA"
      placeholder="Descreva o projeto: tema, objetivos, etapas, recursos, avaliação, interdisciplinaridade..."
      destinoLista="/projetos"
      prefixoResultado="💡 Projeto gerado:"
    />
  );
}
