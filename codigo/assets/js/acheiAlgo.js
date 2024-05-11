/* Arquivo de Javascript da página de cadastro de um item */

/* ----------- Funções ----------- */
function preenche_select(id, nome, select) {
    let text = `<option value="${id}">${nome}</option>`;
    select.innerHTML += text;
}

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
        let tag = tipo_tags[document.getElementById("select_tag").value];
        let descricao = document.getElementById("desc_item").value;
        let data_atual = new Date();

        // Aumenta a quantidade de itens (para o registro do id)
        req.qnt_item++;

        // Cria o novo objeto de item
        let novo_item = {
            id: req.qnt_item,
            tag: `${tag}`,
            nome: `${nome}`,
            descricao: `${descricao}`,
            contato: contato,
            link_img: "https://exemplo.com.br",
            username_encontrou: "Usuário exemplo",
            encontrado: false,
            data_encontrado: `${data_atual.getDate()}/${data_atual.getMonth() + 1}/${data_atual.getFullYear()}`,
            data_devolvido: null,
            localizacao_encontrado: local
        }
        
        instituicao.itens_perdidos.push(novo_item);
        // Escreve no arquivo json
        /*
        let nova_req = new XMLHttpRequest();
        nova_req.open("POST", caminho_JSON);
        nova_req.send(JSON.stringify(req));
        */
    }
}

// Declara variaveis
var form_cadastro = document.getElementById("cadastro_item");
var lista_input = document.getElementsByClassName("item_input");
const caminho_JSON = "../assets/json/instituicao.json";
var requisicao = new XMLHttpRequest();
var tipo_tags = [
    "Eletrônico",
    "Camisa",
    "Calça",
    "Acessório",
    "Livro",
    "Caderno",
    "Outro"
]

// Leitura dos dados do json
requisicao.open("GET", caminho_JSON);
requisicao.responseType = "json";
requisicao.send();

requisicao.onload = function () {
    let resposta_requisicao = requisicao.response;

    // Preenche o select de instituições
    let select_instituicao = document.getElementById("select_instituicao");
    resposta_requisicao.instituicoes.forEach(element => {
        preenche_select(element.id, element.nome, select_instituicao);
    });

    // Preenche o select de tags
    let select_tag = document.getElementById("select_tag");
    for(let i = 0; i < tipo_tags.length; i++) {
        preenche_select(i, tipo_tags[i], select_tag)
    }

    form_cadastro.addEventListener("submit", (event) => {
        event.preventDefault();
        cadastra_item(resposta_requisicao);
    });
};
