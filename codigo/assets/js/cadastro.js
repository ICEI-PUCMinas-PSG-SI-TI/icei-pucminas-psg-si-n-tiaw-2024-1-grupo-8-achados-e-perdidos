import { carregarJSON, putJSON, caminho_JSON, postJSON } from "./modules/json.js";

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
        if (admin && !certificacao_admin) {
            alert("Certificação de admin é obrigatória para administradores!");
            return;
        }

        const novoUsuario = {
            cpf: cpf,
            username: username,
            senha: senha,
            certificacao_admin: certificacao_admin,
            admin: admin
        };

        //usuarios.push(novoUsuario);

        try {
            await postJSON(caminho_JSON + "usuarios", JSON.stringify(novoUsuario));
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "login.html";
        } catch (error) {
            console.error("Erro ao salvar o novo usuário", error);
        }
    } catch (error) {
        console.error("Erro ao buscar usuários", error);
    }
}

function toggleCertificacaoAdmin() {
    const certificacaoAdminInput = document.getElementById("certificacao_admin_usuario");
    const adminCheckbox = document.getElementById("admin_usuario");

    certificacaoAdminInput.disabled = !adminCheckbox.checked;

    if (!adminCheckbox.checked) {
        certificacaoAdminInput.value = "";
    }
}

function main() {
    const formCadastro = document.getElementById("cadastro_usuario");
    formCadastro.addEventListener("submit", async (event) => {
        event.preventDefault();
        await cadastraUsuario();
    });

    // Adiciona o evento no checkbox
    const adminCheckbox = document.getElementById("admin_usuario");
    adminCheckbox.addEventListener("click", toggleCertificacaoAdmin);

    // Chama a função para configurar o estado inicial da certificação
    toggleCertificacaoAdmin(); 
}

main();