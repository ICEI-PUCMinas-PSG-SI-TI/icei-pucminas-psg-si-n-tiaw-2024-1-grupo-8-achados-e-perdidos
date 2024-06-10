/* JavaScript geral do projeto */
import {putJSON, getJSON, caminho_JSON} from "./modules/json.js";
import { preenche_select, tipo_tags } from "./modules/geral.js";

const formHTML = document.getElementById("cadastro_item");
const usuarioLogado = localStorage.getItem('usuarioLogado');

var item;
let link_preenchido = false;
var novo_link_img = null;

// Cria um objeto URL
const urlObj = new URL(window.location.href);

const params = new URLSearchParams(urlObj.search)
const idURL = params.get('id');

if (usuarioLogado) {
  const cpf_usuario_logado = JSON.parse(usuarioLogado).cpf.replace(/\D/g, '');

  // Lê a requisição
  try {
    var json = await getJSON(caminho_JSON + "instituicoes");
    var meus_itens = [];

    // Declara variaveis
    var form_cadastro = document.getElementById("cadastro_item");
    var div_img = document.getElementsByClassName("form_upload_img")[0];

    // Esse trecho de código implementa a função do input de imagem 
    div_img.addEventListener("click", () => {
      link_img = prompt("Digite o link da imagem:");
      if (link_img !== null) {
        var img = new Image();

        // Para saber se o link é válido
        img.src = link_img;
        img.onload = function () {
          div_img.innerHTML = `<img src="${link_img}" id="img_uploaded" alt="Imagem não carregou">`;
          novo_link_img = document.getElementById("img_uploaded").src
          novo_link_img = link_img;
          link_preenchido = true;
        };
        img.onerror = function () {
          alert("Link incorreto");
          link_preenchido = false;
        };
      }
    });

    // Preenche o select de tags
    let select_tag = document.getElementById("select_tag");
    for (let i = 0; i < tipo_tags.length; i++) {
      preenche_select(i, tipo_tags[i], select_tag)
    }

    json.forEach(inst => {
      inst.itens_perdidos.forEach(item => {
        if (item.cpf_encontrou == cpf_usuario_logado)
          meus_itens.push(item);
      });
    });

    // Editou o item
    form_cadastro.addEventListener("submit", (event) => {
      event.preventDefault();
      // Idenfifica se o usuario está logado
      if (usuarioLogado) {
        edita_item(json, usuarioLogado);
        // window.location.href = "./meusachados.html"
      } else {
        alert("Você precisa estar logado para fazer cadastro do item");
      }
    });


    var item = meus_itens.find(x => x.id == idURL)

    if (item) {
      document.getElementById("nome_item").value = item.nome;
      document.getElementById("desc_item").value = item.descricao;
      document.getElementById("contato_item").value = item.contato;
      document.getElementById("local_item").value = item.localizacao_encontrado;

      let options = select_tag.getElementsByTagName('option')
      for (let i = 0; i < options.length; i++) {
        if (options[i].innerText.toLowerCase() == item.tag.toLowerCase())
          select_tag.value = i - 1
      }
    }
    else {
      alert("Você não tem permissão de editar o item");
      formHTML.innerHTML = ""
    }


  } catch (e) {
    console.log("Problema ao efetuar requisição: " + e);
  }
}

async function edita_item(instituicoes, usuarioLogado) {
  var item_perdido, instituicao
  // Procura a instituição
  instituicoes.find((item) => {
    var item_json = item.itens_perdidos.find(x => x.id == idURL)
    if(item_json){
      item_perdido = item_json;
      instituicao = item;
    }
  })

  // To-do: alerta cadastro errado
  if (instituicao === null) {

  } else {
    // Variaveis que serão utilizadas
    let nome = document.getElementById("nome_item").value;
    let contato = document.getElementById("contato_item").value;
    let local = document.getElementById("local_item").value;
    let tag = tipo_tags[document.getElementById("select_tag").value];
    let descricao = document.getElementById("desc_item").value;

    let req = new XMLHttpRequest();
    req.open("GET", caminho_JSON);
    req.send();

    req.onload = function () {

      // Edita os campos editados
      
      if (item_perdido) {
        item_perdido.nome = nome;
        item_perdido.descricao = descricao;
        item_perdido.contato = contato;
        item_perdido.localizacao_encontrado = local;
        item_perdido.tag = tag;
        novo_link_img ? item_perdido.link_img = novo_link_img : null;


        try {
          // Escreve no arquivo json
          putJSON(caminho_JSON + `instituicoes/${instituicao.id}`, JSON.stringify(instituicao))
          alert("Alterações salvas!");
        } catch (e) {
          console.log('Erro ao salvar novo item')
        }
      }
      else 
        console.log('Erro ao salvar novo item')
    }
  }
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