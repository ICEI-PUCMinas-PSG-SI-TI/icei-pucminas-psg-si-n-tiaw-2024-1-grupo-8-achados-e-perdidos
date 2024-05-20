async function carregarJSON(caminhoArquivo) {
 console.log("chegou aqui")
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

// Função que define o onreadystatechange de uma requisição para capturar erros
function setRequisicaoState(req) {
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
        if (req.status >= 200 && req.status < 300) {
            console.log("Requisição ocorreu corretamente")
        } else {
            console.error('Erro na requisição:', req.status, req.statusText);
        }
    }
  };
  return req;
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

export {carregarJSON, putJSON, getJSON}