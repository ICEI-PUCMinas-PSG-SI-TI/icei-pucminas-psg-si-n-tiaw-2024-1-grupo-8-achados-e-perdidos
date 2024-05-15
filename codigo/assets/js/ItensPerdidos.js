// Verificar se os dados já estão armazenados no localStorage
var storedData = localStorage.getItem('storedData');

// Se os dados não estiverem armazenados, fazer a requisição HTTP

  let http = new XMLHttpRequest();
  http.open('get', '../assets/json/instituicao.json', true);
  http.send();

  http.onload = function(){
    if(this.readyState == 4 && this.status == 200){
      // Armazenar os dados no localStorage como uma string JSON
      localStorage.setItem('storedData', this.responseText);

      // Chamar a função para criar os cards com os dados carregados
      criarCards(JSON.parse(this.responseText).instituicoes);
    }
  }

  // Se os dados estiverem armazenados, chamar a função para criar os cards diretamente
  criarCards(JSON.parse(storedData).instituicoes);

// Função para criar os cards com os dados do JSON
function criarCards(data) {
  var output = "";

  for(let instituicao of data){
    for(let item of instituicao.itens_perdidos){
      output += `
        <a href="">
          <div class="product"> 
            <img src="${item.link_img}" alt="${item.descricao}">
            <p class="title">${item.nome}</p>  
            <p class="description">${item.descricao}</p>
            <input type="checkbox" id="" disabled checked>
          </div>
        </a>
      `;
    }
  }
  document.getElementById('cards').innerHTML = output;
}