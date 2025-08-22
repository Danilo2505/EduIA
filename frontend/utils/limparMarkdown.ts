export function limparMarkdown(texto: string) {
  let contador = 1;

  return texto
    .replace(/^#{1,6}\s?/gm, "")          // títulos (#, ##, ###)
    .replace(/\*\*(.*?)\*\*/g, "$1")      // negrito **
    .replace(/\*(.*?)\*/g, "$1")          // itálico *
    .replace(/_{1,3}(.*?)_{1,3}/g, "$1")  // underline com _
    .replace(/`{1,3}(.*?)`{1,3}/g, "$1")  // inline code
    .replace(/^-{3,}$/gm, "")             // linhas ---
    .replace(/^\s*-\s+/gm, () => `• `)    // listas com - → bolinha
    .replace(/^\s*\*\s+/gm, () => `• `)   // listas com * → bolinha
    .replace(/^\s*\d+\.\s+/gm, () => `${contador++}. `) // listas numeradas
    .replace(/>\s?/g, "")                 // blockquote >
    .trim();
}
