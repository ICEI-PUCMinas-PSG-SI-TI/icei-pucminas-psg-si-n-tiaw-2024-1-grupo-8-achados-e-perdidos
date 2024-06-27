import { carregarJSON, putJSON, caminho_JSON, postJSON } from "./modules/json.js";

var link_preenchido = false;
var link_img = null;

/* ----------- Funções início ----------- */


async function cadastraInstituicao() {
    try {
        const dados = await carregarJSON(caminho_JSON + "instituicoes");
        const instituicoes = dados || [];

        const nome = document.getElementById("nome_instituicao").value;
        const endereco = document.getElementById("end_insti").value;

        // Verificação de existência de instituição com o mesmo nome
        const instituicaoExistente = instituicoes.some(instituicao => instituicao.nome === nome);
        if (instituicaoExistente) {
            alert("Uma instituição com este nome já está cadastrada!");
            return;
        }

        // Aumenta a quantidade de instituição (para o registro do id)
        const meta = await carregarJSON(caminho_JSON + "meta");
        meta.qnt_instituicao++;

        // Cria o novo objeto de instituição
        const novaInstituicao = {
            id: meta.qnt_instituicao,
            nome: nome,
            endereco: endereco,
            link_img: link_img,
            itens_perdidos: []
        };

        // Atualiza os dados no servidor
        try {
            await postJSON(caminho_JSON + "instituicoes", JSON.stringify(novaInstituicao));
            await putJSON(caminho_JSON + "meta", JSON.stringify(meta));
            alert("Instituição cadastrada com sucesso!");
            window.location.href = "../index.html"; // Redireciona após o cadastro
        } catch (error) {
            console.error("Erro ao salvar a nova instituição", error);
        }
    } catch (error) {
        console.error("Erro ao buscar instituições", error);
    }
}

function main() {
    const formCadastro = document.getElementById("cadastro_insti");
    const divImg = document.getElementsByClassName("form_upload_img")[0];

    // Implementa a função do input de imagem 
    divImg.addEventListener("click", () => {
        link_img = prompt("Digite o link da imagem:");
        if (link_img !== null) {
            const img = new Image();

            // Para saber se o link é válido
            img.src = link_img;
            img.onload = function () {
                divImg.innerHTML = `<img src="${link_img}" id="img_uploaded" alt="Imagem não carregou">`;
                document.getElementById("img_uploaded").src = link_img;
                link_preenchido = true;
            };
            img.onerror = function () {
                alert("Link incorreto");
                link_preenchido = false;
            };
        }
    });

    // Leitura dos dados do JSON
    carregarJSON(caminho_JSON + "instituicoes").then(respostaRequisicao => {
        // Preenche o select de instituições
        const selectInstituicao = document.getElementById("select_instituicao");
        formCadastro.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (link_preenchido) {
                await cadastraInstituicao();
            } else {
                alert("O link da imagem está vazio ou não é válido");
            }
        });
    }).catch(error => {
        console.error("Erro ao buscar instituições", error);
    });
}

main();