/* JavaScript geral do projeto */
import { carregarJSON } from "./modules/json.js";

let json = await carregarJSON('./assets/json/instituicao.json')
let instituicoesEl = document.getElementById('instituicoes')

/**
 * Carrega os cards com as instituições
 */
Inicializar()

function Inicializar() {
  // Verifica se encontrou instituições
  if (json.instituicoes != undefined && json.instituicoes.length > 0)
    instituicoesEl.innerHTML = ''
  else
    alert('Não foram encontrados instituições!')

  // Preenche o HTML com os conteúdos do banco
  json.instituicoes.map((el, index) => {
    instituicoesEl.innerHTML += 
      `<div class="col mb-3 d-flex justify-content-center">
        <div class="card card-instituicao" href="instituicao.html" id="instituicao-${el.id}">
          <div class="card-body">
            <img
              src="${el.link_img}"
              class="item_img" alt="imagem do item perido">
            <div class="">
              <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 border border-2">${el.nome}</div>
              <p class="fs-5 endereco text-start">${el.endereco}</p>
              <p class="fs-5 bairro-cidade">${el.cidade}</p>
            </div>
          </div>
        </div>
      </div>`
    // Redireciona para um item ID
    instituicoesEl.children[0].addEventListener('click', (el) => {
      window.location.href = './pages/itensPerdidos.html?id=' + el.id
    })
  });
}