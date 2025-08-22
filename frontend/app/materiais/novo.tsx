import PromptScreen from "@/layouts/Prompt";

export default function NovoMaterial() {
  return (
    <PromptScreen
      titulo="Criar Material de Apoio com IA"
      placeholder="Diga o tipo (cartaz, ficha, lista, roteiro), assunto, formato (tabela, tópicos), tamanho..."
      destinoLista="/materiais"
      prefixoResultado="📂 Material de apoio gerado:"
      category="MATERIAL"
    />
  );
}
