import PromptScreen from "@/layouts/Prompt";

export default function NovoJogo() {
  return (
    <PromptScreen
      titulo="Criar Jogo Educativo com IA"
      placeholder="Explique o jogo: conteúdo a reforçar, regras, materiais, tempo, variações..."
      destinoLista="/jogos"
      prefixoResultado="🎮 Jogo educativo gerado:"
    />
  );
}
