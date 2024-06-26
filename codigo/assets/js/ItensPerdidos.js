import { getJSON, caminho_JSON } from "./modules/json.js";
import { preenche_select, tipo_tags } from "./modules/geral.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let dadosJson = await getJSON(caminho_JSON + "instituicoes");
        let cardsEl = document.getElementById('cards');
        let idInstituicao = obterParametroComoInt('id');

        mostrarItensPerdidos(dadosJson, idInstituicao);
        pesquisaDeItens();
    } catch (error) {
        console.error("Erro ao carregar dados JSON:", error);
    }
});

// Função para obter os parâmetros da URL
function obterParametroComoInt(parametroNome) {
    let parametrosURL = new URLSearchParams(window.location.search);
    let valorParametro = parametrosURL.get(parametroNome);
    return valorParametro !== null ? parseInt(valorParametro, 10) : null;
}

// Função para mostrar os itens perdidos da instituição selecionada
function mostrarItensPerdidos(data, idInstituicao) {
    let instituicao = data.find(inst => inst.id == idInstituicao);
    let cardsEl = document.getElementById('cards');
    if (instituicao) {
        let saida = "";
        for (let item of instituicao.itens_perdidos) {
            if (!item.encontrado) {
                saida +=
                    `<div class="col col-lg-3 mb-3 d-flex justify-content-center cartao_item">
                        <div class="card card-instituicao" href="instituicao.html" id="instituicao-${item.id}">
                            <div class="card-body d-flex flex-column">
                                <img src="${item.link_img}" class="item_img" alt="imagem do item perido">
                                <div class="flex-grow-1">
                                    <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 item_nome">${item.nome}</div>
                                    <p class="fs-5 endereco text-start">${item.descricao}</p>
                                </div>
                                <div class="card-tag px-2 mt-3 align-self-end">${item.tag}</div>
                            </div>
                        </div>
                    </div>`;
            } else {
                saida +=
                    `<div class="col col-lg-3 mb-3 d-flex justify-content-center cartao_item">
                        <div class="card card-instituicao achado" href="instituicao.html" id="instituicao-${item.id}">
                            <div class="card-body d-flex flex-column">
                                <img src="${item.link_img}" class="item_img" alt="imagem do item perido">
                                <div class="flex-grow-1">
                                    <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 item_nome">${item.nome}</div>
                                    <p class="fs-5 endereco text-start">${item.descricao}</p>
                                    <p class="fs-5 endereco text-start"><strong>Item encontrado</strong></p>
                                </div>
                                <div class="card-tag px-2 mt-3 align-self-end">${item.tag}</div>
                            </div>
                        </div>
                    </div>`;
            }
        }
        cardsEl.innerHTML = saida;

        let instituicoesTable = cardsEl.querySelectorAll('.card-instituicao');
        instituicoesTable.forEach(child => {
            child.addEventListener('click', (e) => {
                let itemId = child.id.replace('instituicao-', '');
                window.location.href = "detalhamentossobreitem.html?ItemId=" + itemId + "&InstiId=" + idInstituicao;
            });
        });
    } else {
        cardsEl.innerHTML = `<p>Instituição não encontrada</p>`;
    }
}

// Funções para busca de itens
function pesquisaDeItens() {
    function carregaSelectTags(select) {
        for (let i = 0; i < tipo_tags.length; i++) {
            preenche_select(i, tipo_tags[i], select);
        }
    }

    const input_pesquisa = document.getElementById("input_pesquisa_item");
    const itens = document.getElementsByClassName("item_nome");
    const select_tag = document.getElementById("select_tag_pesquisa");

    function filtrarItens() {
        let valorInput = input_pesquisa.value.toLowerCase();
        let tagSelecionada = select_tag.value != -1 ? tipo_tags[select_tag.value].toLowerCase().trim() : null;

        for (let i = 0; i < itens.length; i++) {
            let conteudo = itens[i].textContent.toLowerCase();
            let card = itens[i].closest(".cartao_item");
            let tagDoCard = card.querySelector(".card-tag").textContent.toLowerCase().trim();

            let comparacaoInput = conteudo.includes(valorInput);
            let comparacaoTag = tagSelecionada ? tagDoCard === tagSelecionada : true;

            if (comparacaoInput && comparacaoTag) {
                card.style.display = "";
            } else {
                card.style.cssText = "display: none !important";
            }
        }
    }

    input_pesquisa.addEventListener("input", filtrarItens);
    select_tag.addEventListener("change", filtrarItens);

    carregaSelectTags(select_tag);
}