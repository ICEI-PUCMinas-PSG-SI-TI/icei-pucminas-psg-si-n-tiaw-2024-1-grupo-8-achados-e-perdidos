const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
if (usuarioLogadoJSON) {    

}
else{
    window.location.href = "login.html";
}