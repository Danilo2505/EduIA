import PromptScreen from "@/layouts/Prompt";

export default function NovaProva() {
  return (
    <PromptScreen
      titulo="Gerar Prova/Questões com IA"
      placeholder="Informe disciplina, série, quantidade de questões, nível de dificuldade, habilidades (BNCC)..."
      destinoLista="/provas"
      prefixoResultado="📝 Prova/questões geradas:"
      category="PROVA"
    />
  );
}
