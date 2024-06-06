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


