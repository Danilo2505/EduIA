import PromptScreen from "@/layouts/Prompt";

export default function NovoRecursoInclusivo() {
  return (
    <PromptScreen
      titulo="Criar Recurso Inclusivo com IA"
      placeholder="Informe a necessidade (visual, auditiva, motora, TEA...), objetivo, adaptações e estratégias..."
      destinoLista="/inclusao"
      prefixoResultado="♿ Recurso inclusivo gerado:"
    />
  );
}
