/*
//import { getJSON } from "./modules/json.js";

//const caminho_JSON = "https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/";



//let dadosJson = await getJSON(caminho_JSON+"instituicoes");




function obterParametroComoInt(parametroNome) {
    let parametrosURL = new URLSearchParams(window.location.search);
    let valorParametro = parametrosURL.get(parametroNome);
    return valorParametro !== null ? parseInt(valorParametro, 10) : null;
  }


  let item = {
    id: 1,
    descricao: "Objeto Perdido",
    encontrado: false
};

// Referência aos elementos HTML
const itemContainer = document.getElementById('item-container');
const encontradoBtn = document.getElementById('encontrado-btn');

// Função para atualizar a exibição do item
function atualizarExibicao() {
    if (item.encontrado) {
        itemContainer.classList.remove('perdido');
        itemContainer.classList.add('encontrado');
        itemContainer.textContent = "Objeto Encontrado";
        encontradoBtn.textContent = "Desfazer";
    } else {
        itemContainer.classList.remove('encontrado');
        itemContainer.classList.add('perdido');
        itemContainer.textContent = "Objeto Perdido";
        encontradoBtn.textContent = " Objeto Encontrado";
    }
}

// Event listener para o botão
encontradoBtn.addEventListener('click', () => {
    // Altera o valor de 'encontrado' no objeto JSON
    item.encontrado = !item.encontrado;

    atualizarExibicao();
});

// Inicializa a exibição do item
atualizarExibicao();
*/

import { getJSON, putJSON } from "./modules/json.js";


const caminho_JSON = "https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/";
async function main() {
    // To-do: testar se o usuario está logado ou não
    
    const cpf_usuario_logado = "12345678901"; // To-do: pegar o cpf do usuario da sessão
    var meus_itens = [];

    // Lê a requisição
    try {
        let json = await getJSON(caminho_JSON + "instituicoes");
        let cardsEl = document.getElementById('cards');
        let saida = "";

        json.forEach(inst => {
            inst.itens_perdidos.forEach(item => {
                if(item.cpf_encontrou == cpf_usuario_logado) {
                    meus_itens.push(item);
                }
            });
        });

        meus_itens.forEach(item => {
            saida += 
            `<div class="col mb-3 d-flex justify-content-center cartao_item">
            <div class="card card-instituicao" href="instituicao.html" id="instituicao-${item.id}">
              <div class="card-body">
                <img
                  src="${item.link_img}"
                  class="item_img" alt="imagem do item perido">
                <div class="">
                  <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 item_nome">${item.nome}</div>
                  <p class="fs-5 endereco text-start">${item.descricao}</p>
                </div>
                <div class="card-tag">
                  ${item.tag}
                </div>
                <button class="botao_devolvido">Marcar como devolvido</button>
              </div>
            </div>
          </div>`;
        });
        cardsEl.innerHTML = saida;

    } catch(e) {
        console.log("Problema ao efetuar requisição: " + e);
    }
}

main();