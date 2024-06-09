import { getJSON, putJSON, caminho_JSON } from "./modules/json.js";

async function main() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Se o usuario está logado realiza a listagem dos seus itens cadastrados
    if(usuarioLogado) {
      const cpf_usuario_logado = JSON.parse(usuarioLogado).cpf.replace(/\D/g, '');
      var meus_itens = [];
      var saida = "";
      
      // Lê a requisição
      try {
          var json = await getJSON(caminho_JSON + "instituicoes");
  
          json.forEach(inst => {
              inst.itens_perdidos.forEach(item => {
                  if(item.cpf_encontrou == cpf_usuario_logado) {
                      meus_itens.push(item);
                  }
              });
          });
          if(meus_itens.length !== 0) {
            saida = "<h2 class='titulo_achados'>Itens achados por mim:</h2>";
            meus_itens.forEach(item => {
            if(!item.encontrado){
              saida += 
              `<div class="col col-lg-3 mb-3 d-flex justify-content-center cartao_item">
                <div class="card card-instituicao" href="instituicao.html" id="instituicao-${item.id}">
                  <div class="card-body d-flex flex-column">
                    <img
                      src="${item.link_img}"
                      class="item_img" alt="imagem do item perido">
                    <div class="flex-grow-1">
                      <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 item_nome">${item.nome}</div>
                      <p class="fs-5 endereco text-start">${item.descricao}</p>
                    </div>
                    <div class="card-tag px-2 mt-3 align-self-end">
                      ${item.tag}
                    </div>
                    <button class="botao_devolvido mt-3 align-self-end">Devolvido</button>
                  </div>
                </div>
              </div>
              `;
            } else {
              saida += 
              `<div class="col col-lg-3 mb-3 d-flex justify-content-center cartao_item">
                <div class="card card-instituicao achado" href="instituicao.html" id="instituicao-${item.id}">
                  <div class="card-body d-flex flex-column">
                    <img
                      src="${item.link_img}"
                      class="item_img" alt="imagem do item perido">
                    <div class="flex-grow-1">
                      <div class="card-title text-center w-100 bg-white p-1 rounded-bottom rounded-4 item_nome">${item.nome}</div>
                      <p class="fs-5 endereco text-start">${item.descricao}</p>
  
                      <p class="fs-5 endereco text-start"><strong>Item encontrado</strong></p>
                    </div>
                    <div class="card-tag px-2 mt-3 align-self-end">
                      ${item.tag}
                    </div>
                  <button class="botao_perdido mt-3 align-self-end">Perdido</button>
                  </div>
                </div>
              </div>`;
            }
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
    marcarComoDevolvido();
}

async function marcarComoDevolvido() {
  let botoes_devolvido = document.getElementsByClassName("botao_devolvido");
  let botoes_perdido = document.getElementsByClassName("botao_perdido");
  
  function marcaEstadoItem(devolvido, event, json) {
    let elemento = event.target;
    let id_item = elemento.closest(".card-instituicao").id;
    // Pega o id do item
    id_item = id_item[id_item.length-1]; 
    id_item = parseInt(id_item, 10);

      
      json.forEach(inst => {
        inst.itens_perdidos.forEach(item => {
          if(item.id == id_item) {
              let data_atual = new Date();
              
              // Escreve no arquivo json
              if(devolvido) {
                item.encontrado = true;
                item.data_devolvido = `${data_atual.getDate()}/${data_atual.getMonth() + 1}/${data_atual.getFullYear()}`;
              } else {
                item.encontrado = false;
                item.data_devolvido = null;
              }

              putJSON(caminho_JSON + `instituicoes/${inst.id}`, JSON.stringify(inst));
            }
        });
      });
      location.reload();
  }

  if(botoes_devolvido) {
    try {
      let json = await getJSON(caminho_JSON + "instituicoes");

      for(let i = 0; i < botoes_devolvido.length; i++) {
        botoes_devolvido[i].addEventListener("click", (event) => {
          marcaEstadoItem(true, event, json);
          alert("Item marcado como encontrado!");
        });
      }

      if(botoes_perdido) {
        for(let i = 0; i < botoes_perdido.length; i++) {
          botoes_perdido[i].addEventListener("click", (event) => {
            marcaEstadoItem(false, event, json);
            alert("Item marcado como não encontrado!");
          });
        }
      }
    } catch(e){
      console.log('Erro ao mudar o status do item');
    }
  } 


}
main();