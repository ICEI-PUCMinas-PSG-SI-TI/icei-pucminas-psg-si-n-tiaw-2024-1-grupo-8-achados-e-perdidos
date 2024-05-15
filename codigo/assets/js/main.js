/* JavaScript geral do projeto */
import {carregarJSON} from "./modules/json.js";

let instituicoes = await carregarJSON('./assets/json/instituicao.json')
let instituicoesEl = document.getElementById('instituicoes')

instituicoesEl.innerHTML = []

instituicoes.instituicoes.forEach(el => {
  instituicoes.innerHTML += `
    <div class="col d-flex justify-content-center">
    <div class="card card-instituicao" href="instituicao.html">
      <div class="card-body">
        <img
          src="${el.link_img}"
          class="item_img" alt="imagem do item perido">
        <div>
          <div class="card-title text-center w-100">${el.link_img}</div>
          <p class="fs-5 endereco text-start">Rua Walter Ianni, 255</p>
          <p class="fs-5 bairro-cidade">São Gabriel, Belo Horizonte - MG, 31980-110</p>
        </div>
      </div>
    </div>
    </div>`
});