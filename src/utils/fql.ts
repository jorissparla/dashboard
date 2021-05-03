export function fql(chunks: TemplateStringsArray, ...variables: any[]): string {
  return chunks.reduce((accumulator, chunk, index) => `${accumulator}${chunk}${index in variables ? variables[index] : ""}`, "");
}
