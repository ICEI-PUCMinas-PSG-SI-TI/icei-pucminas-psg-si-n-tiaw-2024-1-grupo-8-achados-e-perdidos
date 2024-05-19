import { getJSON } from "./modules/json.js";
// se não estiver aberto substituir link por: https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/, https://022fc133-6630-4faf-a608-6f27ba35597b-00-198fyfed8wtqd.janeway.replit.dev/
// ou link propio que pode ser criado dando um fork e iniciando o servidor (usando replit)
//mude em ItensPerdidos.js, Main.js e detalhes.js
const caminho_JSON = "https://022fc133-6630-4faf-a608-6f27ba35597b-00-198fyfed8wtqd.janeway.replit.dev/";



let dadosJson = await getJSON(caminho_JSON+"instituicoes");
let cardsEl = document.getElementById('cards');





      // Função para obter os parâmetros da URL
function obterParametroComoInt(parametroNome) {
        let parametrosURL = new URLSearchParams(window.location.search);
        let valorParametro = parametrosURL.get(parametroNome);
        return valorParametro !== null ? parseInt(valorParametro, 10) : null;
      }

      // Função para mostrar os itens perdidos da instituição selecionada
function mostrarItensPerdidos(data, idInstituicao) {
        let instituicao = data.find(inst => inst.id === idInstituicao);
        if (instituicao) {
          let saida = "";
          for (let item of instituicao.itens_perdidos) {
            saida += 
            `<div class="col mb-3 d-flex justify-content-center">
            <div class="card card-instituicao" href="instituicao.html" id="instituicao-${item.id}">
              <div class="card-body">
                <img
                  src="${item.link_img}"
                  class="item_img" alt="imagem do item perido">
                <div class="">
                  <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 ">${item.nome}</div>
                  <p class="fs-5 endereco text-start">${item.descricao}</p>
                  <p class="fs-5 bairro-cidade">${item.cidade}</p>
                </div>
              </div>
            </div>
          </div>`;
          }
          cardsEl.innerHTML = saida;
          let instituicoesTable = document.querySelectorAll('.card-instituicao');

          instituicoesTable.forEach(child => {
              child.addEventListener('click', (e) => {
                  let itemId = child.id.replace('instituicao-', ''); // Remove o prefixo 'instituicao-'
                  window.location.href = "detalhamentossobreitem.html?id=" + itemId + "?id=" + 23;
              });
          });
        } else {
          cardsEl.innerHTML = `<p>Instituição não encontrada</p>`;
        }
      }

      // Obtém o ID da instituição da URL e mostra os itens perdidos correspondentes
let idInstituicao = obterParametroComoInt('id');
if (idInstituicao !== null) {

        mostrarItensPerdidos(dadosJson, idInstituicao);

    }

