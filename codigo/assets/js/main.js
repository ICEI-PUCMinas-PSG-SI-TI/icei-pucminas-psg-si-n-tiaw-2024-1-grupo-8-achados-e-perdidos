/* JavaScript geral do projeto */
import { getJSON, caminho_JSON} from "./modules/json.js";

const json = await getJSON(caminho_JSON+"instituicoes")

// Localhost
// const caminho_JSON = "http://localhost:8080/codigo/assets/json/instituicao.json";
// let json = await getJSON(caminho_JSON)
// json = json.instituicoes


let instituicoesEl = document.getElementById('instituicoes')

/**
 * Carrega os cards com as instituições
 */
Inicializar()

function Inicializar() {
  // Verifica se encontrou instituições
  if (json != undefined && json.length > 0)
    instituicoesEl.innerHTML = ''
  else
    alert('Não foram encontrados instituições!')

  // Preenche o HTML com os conteúdos do banco
  json.map((el, index) => {
    instituicoesEl.innerHTML += 
      `<div class="col mb-3 d-flex justify-content-center">
        <div class="card card-instituicao" href="instituicao.html" id="${el.id}">
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
  });

  let instituicoesTable = document.querySelectorAll('.card-instituicao')
  // Redireciona para um item ID
  instituicoesTable.forEach(child => {
    child.addEventListener('click', (e) => {
      window.location.href = "./pages/itensPerdidos.html?id=" + child.id ;
    })
  })
}
