import PromptScreen from "@/layouts/Prompt";

export default function NovoPlanoAula() {
  return (
    <PromptScreen
      titulo="Criar Plano de Aula com IA"
      placeholder="Explique o plano: série/ano, tema, objetivos (BNCC), duração, recursos, etapas..."
      destinoLista="/plano-aula"
      prefixoResultado="🧭 Plano de aula gerado:"
    />
  );
}
