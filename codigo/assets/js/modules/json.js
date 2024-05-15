async function carregarJSON(caminhoArquivo) {
  try {
    const resposta = await fetch(caminhoArquivo);
    if (!resposta.ok) {
      throw new Error('Erro ao carregar o JSON');
    }
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error(erro);
  }
}



export {carregarJSON}