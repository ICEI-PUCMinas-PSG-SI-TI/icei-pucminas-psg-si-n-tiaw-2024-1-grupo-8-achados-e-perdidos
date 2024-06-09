import {putJSON, getJSON, caminho_JSON} from "./modules/json.js";


function aparecerTela (){
    // URL da nova tela
    const novaTelaURL = 'detalhamentossobreitem.html';
       
    // Abre a nova tela em uma nova janela
    window.open(novaTelaURL, '_blank');
}
function obterParametroComoInt(parametroNome) {
    let parametrosURL = new URLSearchParams(window.location.search);
    let valorParametro = parametrosURL.get(parametroNome);
    return valorParametro !== null ? parseInt(valorParametro, 10) : null;
  }


 async function carregarDados() {
    try {
        // Leitura dos dados do json
        let resposta_requisicao = await getJSON(caminho_JSON + "instituicoes");
        var itensPerdidosDiv = document.getElementById('itensPerdidos');
          console.log(resposta_requisicao)
        resposta_requisicao.forEach(function(instituicao) {
            if (instituicao.id==obterParametroComoInt("InstiId")){
                    
            
                instituicao.itens_perdidos.forEach(function(item) {
                    if (item.id==obterParametroComoInt("ItemId")){
            
                var itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <h2 class="nomeitem" id="titulo">${item.nome}</h2>
                    <p class="nomeitem"><strong>Descrição:</strong> ${item.descricao}</p>
                    <p class="nomeitem"><strong>Contato:</strong> ${item.contato}</p>
                    <p class="nomeitem"><strong>Localização Encontrado:</strong> ${item.localizacao_encontrado}</p>
                    <p class="nomeitem"><strong>Data Encontrado:</strong> ${item.data_encontrado}</p>
                    <p class="nomeitem"><strong>Data Devolvido:</strong> ${item.data_devolvido}</p>
                    <img class="nomeitem" id="imagem" src="${item.link_img}" alt="${item.nome}">
                `;
                itensPerdidosDiv.appendChild(itemDiv);}
            });}
        });
    } catch (error) {
        console.error("Erro ao carregar os dados do JSON:", error);
    }
}  console.log(obterParametroComoInt("ItemId"))

// Chamando a função para carregar os dados
carregarDados();

 /* var json = {
   itens_perdidos: [
   {
     "id": 1,
     "tag": "Casaco",
     "nome": "Casaco Vermelho Grande",
     "descricao": "Um casaco vermelho grande perdido em uma das ruas próximas.",
     "contato": "(31) 992479328",
     "link_img": "https://example.com/item123.png",
     "username_encontrou": "usuario123",
     "encontrado": true,
     "data_encontrado": "2024-05-01",
     "data_devolvido": "2024-05-03",
     "localizacao_encontrado": "Rua A, Cidade Grande"
   }
 ]
}   */

