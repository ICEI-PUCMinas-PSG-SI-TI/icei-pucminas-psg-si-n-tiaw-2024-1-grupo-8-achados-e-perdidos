/* Arquivo de Javascript da página de cadastro de um item */
import {putJSON, getJSON, caminho_JSON} from "./modules/json.js";
import {preenche_select, tipo_tags} from "./modules/geral.js";

var link_preenchido = false;
var link_img = null;

/* ----------- Funções inicio ----------- */
function encontra_instituicao(id, intituicoes) {
    for (let i = 0; i < intituicoes.length; i++) {
        if (intituicoes[i].id == id) {
            return intituicoes[i];
        }
    }
    // Caso não encontre a instituicao
    return null;
}

function itemCadastradoComSucesso() {
    alert("Item cadastrado com sucesso");
    let div_img = document.getElementsByClassName("form_upload_img")[0];
    let select_tag = document.getElementById("select_tag");
    let select_instituicao = document.getElementById("select_instituicao");

    div_img.innerHTML = "+";
    select_tag.innerHTML = '<option value="" disabled selected hidden>Tag do item</option>';
    select_instituicao.innerHTML = '<option value="" disabled selected hidden>Instituição</option>';
    
    document.getElementById("nome_item").value = "";
    document.getElementById("desc_item").value = "";
    document.getElementById("contato_item").value = "";
    document.getElementById("local_item").value = "";
}

async function cadastra_item(intituicoes, usuarioLogado) {
    // Procura a instituição
    let id_instituicao = document.getElementById("select_instituicao").value;
    let instituicao = encontra_instituicao(id_instituicao, intituicoes);
    let cpf_usuario_logado = JSON.parse(usuarioLogado).cpf;

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
            let cpf = cpf_usuario_logado.replace(/\D/g, ''); // Guarda apenas os numeros no json

            // Cria o novo objeto de item
            let novo_item = {
                id: meta.qnt_item,
                tag: `${tag}`,
                nome: `${nome}`,
                descricao: `${descricao}`,
                contato: contato,
                link_img: link_img,
                cpf_encontrou: cpf,
                encontrado: false,
                data_encontrado: `${data_atual.getDate()}/${data_atual.getMonth() + 1}/${data_atual.getFullYear()}`,
                data_devolvido: null,
                localizacao_encontrado: local
            }
            
            instituicao.itens_perdidos.push(novo_item);

            try{
                // Escreve no arquivo json
                putJSON(caminho_JSON + `instituicoes/${id_instituicao}`, JSON.stringify(instituicao))
                // escreve no arquivo meta
                putJSON(caminho_JSON + "meta", JSON.stringify(meta))
                window.location.href = "../index.html";
            }catch(e){
                console.log('Erro ao salvar novo item')
            }
        }
    }
}
/* ----------- Funções fim ----------- */

async function main() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Declara variaveis
    var form_cadastro = document.getElementById("cadastro_item");
    var div_img = document.getElementsByClassName("form_upload_img")[0];

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

    try{
        // Leitura dos dados do json
        let resposta_requisicao = await getJSON(caminho_JSON+"instituicoes");
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
            // Idenfifica se o usuario está logado
            if(usuarioLogado) {
                if(link_preenchido) {
                    cadastra_item(resposta_requisicao,usuarioLogado);
                    itemCadastradoComSucesso();           
                } else {
                    alert("O link da imagem está vazio ou não é valido");
                }
            } else {
                alert("Você precisa estar logado para fazer cadastro do item");
            }
        });
    } catch(e) {
        console.log("Problema ao efetuar requisição: " + e);
    }
}

main();