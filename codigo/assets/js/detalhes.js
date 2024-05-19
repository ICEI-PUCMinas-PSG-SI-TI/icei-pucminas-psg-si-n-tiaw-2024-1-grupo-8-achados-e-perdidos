import { carregarJSON } from "./modules/json.js";

function aparecerTela (){
    // URL da nova tela
    const novaTelaURL = 'detalhamentossobreitem.html';
       
    // Abre a nova tela em uma nova janela
    window.open(novaTelaURL, '_blank');
}

var json = {
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
} 

var itensPerdidosDiv = document.getElementById('itensPerdidos');

    json.itens_perdidos.forEach(function(item) {
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
        itensPerdidosDiv.appendChild(itemDiv);
});