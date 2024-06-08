import { carregarJSON } from "./modules/json.js";
const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
if (usuarioLogadoJSON){
    window.location.href = "itensPerdidos.html?id=" + 1;

}
else{
    const caminho_JSON = "https://7632dd34-2094-462f-97e8-638cefefbbfe-00-xy9ocks2w8wk.riker.replit.dev/";

async function login() {
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    try {
        const dados = await carregarJSON(caminho_JSON + "usuarios");
        const usuarios = dados || [];

        const usuarioEncontrado = usuarios.find(usuario => 
            usuario.cpf === cpf && usuario.senha === senha
        );

        if (usuarioEncontrado) {
            // Login bem-sucedido
            alert("Login realizado com sucesso!");
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            window.location.href = "itensPerdidos.html?id=" + 1 ;

            // Redirecionar para a página principal ou realizar outras ações
        } else {
            // Credenciais inválidas
            alert("Nome de usuário ou senha incorretos.");
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        alert("Ocorreu um erro durante o login.");
    }
}

const formLogin = document.getElementById("form_login");
formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
});
}