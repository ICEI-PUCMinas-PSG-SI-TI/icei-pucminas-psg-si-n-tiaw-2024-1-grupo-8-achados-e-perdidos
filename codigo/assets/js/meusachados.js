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
                <div class="card card-instituicao flex-grow-1" href="instituicao.html" id="instituicao-${item.id}">
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
                    <div class="row justify-content-between m-1">
                      <button class="botao_editar mt-3 align-self-start" onclick="window.location.href='/codigo/pages/editarItem.html?id=${item.id}'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                      </button>
                      <button class="botao_devolvido mt-3 align-self-end">Devolvido</button>
                    </div>
                  </div>
                </div>
              </div>
              `;
            } else {
              saida += 
              `<div class="col col-lg-3 mb-3 d-flex justify-content-center cartao_item">
                <div class="card card-instituicao achado flex-grow-1" href="instituicao.html" id="instituicao-${item.id}">
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
                    <div class="row justify-content-between m-1">
                      <button class="botao_editar mt-3 align-self-start" onclick="window.location.href='/codigo/pages/editarItem.html?id=${item.id}'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                      </button>
                      <button class="botao_perdido mt-3 align-self-end">Perdido</button>
                    </div>
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