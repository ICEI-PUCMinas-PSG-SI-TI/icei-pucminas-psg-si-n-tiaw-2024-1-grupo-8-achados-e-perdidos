var tipo_tags = [
    "Eletrônico",
    "Camisa",
    "Calça",
    "Acessório",
    "Livro",
    "Caderno",
    "Casaco",
    "Outro"
];

function preenche_select(id, nome, select) {
    let text = `<option value="${id}">${nome}</option>`;
    select.innerHTML += text;
}

export {preenche_select, tipo_tags}