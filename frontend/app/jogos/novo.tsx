import PromptScreen from "@/components/Prompt";

export default function NovoJogo() {
  return (
    <PromptScreen
      titulo="Criar Jogo Educativo com IA"
      placeholder="Explique o jogo: conteúdo a reforçar, regras, materiais, tempo, variações..."
      destinoLista="/jogos/index"
      prefixoResultado="🎮 Jogo educativo gerado:"
    />
  );
}
