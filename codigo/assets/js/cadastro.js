import { carregarJSON, putJSON } from "./modules/json.js";

const caminho_JSON = "https://022fc133-6630-4faf-a608-6f27ba35597b-00-198fyfed8wtqd.janeway.replit.dev/";

async function cadastraUsuario() {
    try {
        const dados = await carregarJSON(caminho_JSON + "usuarios");

        const usuarios = dados || [];

        const cpf = document.getElementById("cpf_usuario").value;
        const username = document.getElementById("username_usuario").value;
        const senha = document.getElementById("senha_usuario").value;
        const certificacao_admin = document.getElementById("certificacao_admin_usuario").value || null;
        const admin = document.getElementById("admin_usuario").checked;

        // Verificação do CPF
        const cpfExistente = usuarios.some(usuario => usuario.cpf === cpf);
        if (cpfExistente) {
            alert("CPF já cadastrado!");
            return;
        }

        // Verificação da certificação de admin, se o campo foi preenchido
        const certificacaoExistente = usuarios.some(usuario => usuario.certificacao_admin === certificacao_admin);
        if (certificacaoExistente) {
            if (!certificacaoExistente) {
                alert("Certificação de admin inválida!");
                return;
            }
        }

        const novoUsuario = {
            cpf: cpf,
            username: username,
            senha: senha,
            certificacao_admin: certificacao_admin,
            admin: admin
        };

        usuarios.push(novoUsuario);

        try {
            await putJSON(caminho_JSON + "usuarios", JSON.stringify(usuarios));
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar o novo usuário", error);
        }
    } catch (error) {
        console.error("Erro ao buscar usuários", error);
    }
}

async function main() {
    const formCadastro = document.getElementById("cadastro_usuario");
    formCadastro.addEventListener("submit", async (event) => {
        event.preventDefault();
        await cadastraUsuario();
    });
}

main();