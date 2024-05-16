/* Arquivo de Javascript da página de cadastro de um item */


/* ----------- Funções ----------- */
function preenche_select(id, nome, select) {
    let text = `<option value="${id}">${nome}</option>`;
    select.innerHTML += text;
}


function encontra_instituicao(id, intituicoes) {
    for (let i = 0; i < intituicoes.length; i++) {
        if (intituicoes[i].id == id) {
            return intituicoes[i];
        }
    }
    // Caso não encontre a instituicao
    return null;
}


function cadastra_item(intituicoes) {
    // Procura a instituição
    let id_instituicao =document.getElementById("select_instituicao").value;
    let instituicao = encontra_instituicao(id_instituicao, intituicoes);

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
        let meta_req = new XMLHttpRequest();
        meta_req.open("GET", caminho_JSON + "meta/");
        meta_req.send();

        meta_req.onload = function () {
            let meta = JSON.parse(meta_req.response);
            meta.qnt_item++;

            // Cria o novo objeto de item
            let novo_item = {
                id: meta.qnt_item,
                tag: `${tag}`,
                nome: `${nome}`,
                descricao: `${descricao}`,
                contato: contato,
                link_img: link_img,
                username_encontrou: "Usuário exemplo",
                encontrado: false,
                data_encontrado: `${data_atual.getDate()}/${data_atual.getMonth() + 1}/${data_atual.getFullYear()}`,
                data_devolvido: null,
                localizacao_encontrado: local
            }
            
            instituicao.itens_perdidos.push(novo_item);

            // Escreve no arquivo json
            let req_put_instituicao = new XMLHttpRequest();
            req_put_instituicao.open("PUT", caminho_JSON + `instituicoes/${id_instituicao}`);
            req_put_instituicao.setRequestHeader("Content-Type", "application/json");
            req_put_instituicao.send(JSON.stringify(instituicao));

            // escreve no arquivo meta
            let req_put_meta = new XMLHttpRequest();
            req_put_meta.open("PUT", caminho_JSON + "meta");
            req_put_meta.setRequestHeader("Content-Type", "application/json");
            req_put_meta.send(JSON.stringify(meta));
        }
    }
}

// Declara variaveis
var form_cadastro = document.getElementById("cadastro_item");
var lista_input = document.getElementsByClassName("item_input");
var div_img = document.getElementsByClassName("form_upload_img")[0];
var link_preenchido = false;
const caminho_JSON = "https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/";
var requisicao = new XMLHttpRequest();
var link_img = null;
var tipo_tags = [
    "Eletrônico",
    "Camisa",
    "Calça",
    "Acessório",
    "Livro",
    "Caderno",
    "Outro"
]

// Esse trecho de código implementa a função do input de imagem 
div_img.addEventListener("click", () => {
    link_img = prompt("Digite o link da imagem:");
    if(link_img !== null) {
        var img = new Image();
        
        // Para saber se o link é válido
        img.src = link_img;
        img.onload = function() {
            div_img.innerHTML = `<img src="${link_img}" id="img_uploaded" alt="Imagem não carregou">`;
            document.getElementById("img_uploaded").src = link_img;
            link_preenchido = true;
        };
        img.onerror = function() {
            alert("Link incorreto");
            link_preenchido = false;
        };
    }
});

// Leitura dos dados do json
requisicao.open("GET", caminho_JSON + "instituicoes");
requisicao.responseType = "json";
requisicao.send();

requisicao.onload = function () {
    let resposta_requisicao = requisicao.response;

    // Preenche o select de instituições
    let select_instituicao = document.getElementById("select_instituicao");
    resposta_requisicao.forEach(element => {
        preenche_select(element.id, element.nome, select_instituicao);
    });

    // Preenche o select de tags
    let select_tag = document.getElementById("select_tag");
    for(let i = 0; i < tipo_tags.length; i++) {
        preenche_select(i, tipo_tags[i], select_tag)
    }

    form_cadastro.addEventListener("submit", (event) => {
        event.preventDefault();
        if(link_preenchido) {
            cadastra_item(resposta_requisicao);
        } else {
            alert("O link da imagem está vazio ou não é valido");
        }
    });
};
