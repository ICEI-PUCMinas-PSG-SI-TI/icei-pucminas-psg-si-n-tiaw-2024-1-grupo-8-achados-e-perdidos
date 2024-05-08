/* Arquivo de Javascript da página de cadastro de um item */

/* ----------- Funções ----------- */
function preenche_select(req, select) {
    // Passa por cada elemento de instituições para adicionar no select
    req.instituicoes.forEach(element => {
        let text = `<option value="${element.id}">${element.nome}</option>`;
        select.innerHTML += text;
    });
}

function cadastra_item() {

}

// Declara variaveis
var form_cadastro = document.getElementById("cadastro_item");
var lista_input = document.getElementsByClassName("item_input");
var caminho_JSON = "../assets/json/instituicao.json"
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
};

/*form_cadastro.addEventListener("submit", (event) => {
    event.preventDefault();
});*/