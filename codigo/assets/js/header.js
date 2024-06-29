//nav bar


const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});




const loginSair = document.getElementById('loginSair');
const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');

function atualizarNavbar() {
    loginSair.innerHTML = '';

    if (usuarioLogadoJSON) {
        loginSair.innerHTML = `
            <li><a href="#" onclick="logout()">Sair</a></li>
        `;
    } else {
        if (document.getElementById('instituicoes') != null){
            loginSair.innerHTML += `
                <li><a href="pages/login.html">Logar</a></li>
            `;
        }
        else{
            loginSair.innerHTML = `
            <li><a href="login.html">Logar</a></li>
        `;
        }
        
    }
}


atualizarNavbar();

function logout() {
    localStorage.removeItem('usuarioLogado');
    atualizarNavbar();
    window.location.reload();

}