/* Arquivo de Javascript da página de cadastro de um item */

/* ----------- Funções ----------- */
function preenche_select(req, select) {
    // Passa por cada elemento de instituições para adicionar no select
    req.instituicoes.forEach(element => {
        let text = `<option value="${element.id}">${element.nome}</option>`;
        select.innerHTML += text;
    });
}

/*
function valida_cadastro_item(nome, tel, localizacao) {
    
}
*/

function encontra_instituicao(id, req) {
    for (let i = 0; i < req.instituicoes.length; i++) {
        if (req.instituicoes[i].id == id) {
            return req.instituicoes[i];
        }
    }
    // Caso não encontre a instituicao
    return null;
}

function cadastra_item(req) {
    // Procura a instituição
    let instituicao = encontra_instituicao(document.getElementById("select_instituicao").value, req);

    // To-do: alerta cadastro errado
    if(instituicao === null) {

    } else {
        // Variaveis que serão utilizadas
        let nome = document.getElementById("nome_item").value;
        let contato = document.getElementById("contato_item").value;
        let local = document.getElementById("local_item").value;
        let data_atual = new Date();

        // Aumenta a quantidade de itens (para o registro do id)
        req.qnt_item++;

        // Cria o novo objeto de item
        let novo_item = {
            id: req.qnt_item,
            tags: ["tag1", "tag2", "tag3"],
            nome: `${nome}`,
            descricao: "descrição Genérica",
            contato: contato,
            link_img: "https://exemplo.com.br",
            username_encontrou: "Usuário exemplo",
            encontrado: false,
            data_encontrado: `${data_atual.getDate()}/${data_atual.getMonth() + 1}/${data_atual.getFullYear()}`,
            data_devolvido: null,
            localizacao_encontrado: local
        }

    }
}

// Declara variaveis
var form_cadastro = document.getElementById("cadastro_item");
var lista_input = document.getElementsByClassName("item_input");
var caminho_JSON = "../assets/json/instituicao.json";
var requisicao = new XMLHttpRequest();

// Leitura dos dados do json
requisicao.open("GET", caminho_JSON);
requisicao.responseType = "json";
requisicao.send();

requisicao.onload = function () {
    let resposta_requisicao = requisicao.response;

    // Preenche o select de instituições
    let select = document.getElementById("select_instituicao");
    preenche_select(resposta_requisicao, select);

    form_cadastro.addEventListener("submit", (event) => {
        event.preventDefault();
        cadastra_item(resposta_requisicao);
    });
};
