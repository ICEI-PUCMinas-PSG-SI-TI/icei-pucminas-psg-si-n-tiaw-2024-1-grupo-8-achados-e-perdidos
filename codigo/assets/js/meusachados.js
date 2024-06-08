import { getJSON, putJSON } from "./modules/json.js";

const caminho_JSON = "https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/";

async function main() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Se o usuario está logado realiza a listagem dos seus itens cadastrados
    if(usuarioLogado) {
      const cpf_usuario_logado = JSON.parse(usuarioLogado).cpf;
      var meus_itens = [];
      var saida = "";
  
      // Lê a requisição
      try {
          let json = await getJSON(caminho_JSON + "instituicoes");
  
          json.forEach(inst => {
              inst.itens_perdidos.forEach(item => {
                  if(item.cpf_encontrou == cpf_usuario_logado) {
                      meus_itens.push(item);
                  }
              });
          });
          if(meus_itens.length === 0) {
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
          } else {
            saida="<h2>Você não cadastrou nenhum item</h2>";
          }
      } catch(e) {
          console.log("Problema ao efetuar requisição: " + e);
      }
    } 
    else {
      saida="<h2>Faça o login para ver os itens cadastrados por você</h2>";
    }
    let cardsEl = document.getElementById('cards');
    cardsEl.innerHTML = saida;
}

main();