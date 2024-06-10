// se não estiver aberto substituir link por: https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/, https://022fc133-6630-4faf-a608-6f27ba35597b-00-198fyfed8wtqd.janeway.replit.dev/
// Danilo: https://c51d8437-a4a7-43f1-a415-c3658c2e0366-00-24j4hia2i4fea.riker.replit.dev/
// ou link propio que pode ser criado dando um fork e iniciando o servidor (usando replit)
const caminho_JSON = "https://c51d8437-a4a7-43f1-a415-c3658c2e0366-00-24j4hia2i4fea.riker.replit.dev/";

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

// Recebe caminho da requisição e um valor no formato de objeto
async function putJSON(caminho, data) {
  try {
    let response = await fetch(caminho, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: data
    })

    if(!response.ok)
      throw new Error(response.statusText);
  } catch(error){
    throw new Error('Erro ao fazer PUT: '+error);
  }

  return true;

}

// Recebe o caminho da requisição e retorna o json no formato de objeto
async function getJSON(caminho) {
  let response = await fetch(caminho);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  let data = await response.json();
  return data;
}

export {carregarJSON, putJSON, getJSON, caminho_JSON}