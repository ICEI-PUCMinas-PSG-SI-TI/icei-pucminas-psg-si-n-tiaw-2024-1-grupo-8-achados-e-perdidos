/* JavaScript geral do projeto */
import {carregarJSON} from "./modules/json.js";

let instituicoes = await carregarJSON('./assets/json/instituicao.json')
let instituicoesEl = document.getElementById('instituicoes')

if(instituicoes.instituicoes != undefined && instituicoes.instituicoes.length > 0)
  instituicoesEl.innerHTML = ''

instituicoes.instituicoes.map((el, index) => {
  instituicoesEl.addEventListener('click', (el) => {
    window.location.href = 'http://localhost:8080/codigo/pages/itensPerdidos.html?id='+el.id // Será para um item perdido
  })
  instituicoesEl.innerHTML += `
    <div class="col d-flex justify-content-center">
    <div class="card card-instituicao" href="instituicao.html" id="instituicao-${el.id}">
      <div class="card-body">
        <img
          src="${el.link_img}"
          class="item_img" alt="imagem do item perido">
        <div>
          <div class="card-title text-center w-100">${el.nome}</div>
          <p class="fs-5 endereco text-start">${el.endereco}</p>
          <p class="fs-5 bairro-cidade">${el.cidade}</p>
        </div>
      </div>
    </div>
    </div>`
});