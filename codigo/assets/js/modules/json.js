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

// Função que define o onreadystatechange de uma requisição para capturar erros
function setRequisicaoState(req) {
  req.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Resposta recebida:', xhr.responseText);
        } else {
            console.error('Erro na requisição:', xhr.status, xhr.statusText);
        }
    }
    return req;
};
}

// Recebe caminho da requisição e um valor no formato de objeto
function putJSON(caminho, data) {
  let req = new XMLHttpRequest();
  req.open("PUT", caminho);
  req = setRequisicaoState(req);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(data));
}

// Recebe caminho da requisição e um valor no formato de objeto
function postJSON(caminho, data) {
  let req = new XMLHttpRequest();
  req.open("POST", caminho);
  req = setRequisicaoState(req);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(data));
}

// Recebe o caminho da requisição e retorna o json no formato de objeto
function getJSON(caminho) {
  let req = new XMLHttpRequest();
  req.open("GET", caminho);
  req = setRequisicaoState(req);
  req.send();
  req.onload = function() {
    return JSON.parse(req.response);
  }
}

export {carregarJSON, putJSON, getJSON, postJSON}