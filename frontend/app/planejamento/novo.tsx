// app/planejamento/novo.tsx
import PromptScreen from "@/layouts/Prompt";

export default function NovoPlanejamento() {
  return (
    <PromptScreen
      titulo="Criar Planejamento com IA"
      placeholder="Descreva o planejamento: objetivos, atividades, tempo, avaliação..."
      destinoLista="/planejamento"
      prefixoResultado="🗓️ Planejamento gerado:"
      category="PLANEJAMENTO"
    />
  );
}
