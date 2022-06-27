var isLogged = false;

// Botões para chamar as caixas de login e de cadastro
var loginButton = document.querySelector('#login_button'),
    cadastrarButton = document.querySelector('#cadastrar_button');

// Checa se o usuário já esta logado
if(localStorage.getItem("login")){
  isLogged = true;
  document.querySelector('#login_button').innerHTML = 'Logout';
  document.querySelector('.container_busca').style.display = 'flex';
}

// Processa o clique no botão de login
loginButton.addEventListener('click', () => {

  if(isLogged===true){
    localStorage.removeItem("login");
    isLogged=false;
    document.querySelector('.container_busca').style.display = 'none';
    document.querySelector('.login_box').style.display = 'none';
    document.querySelector('#login_button').innerHTML = 'Login';
  } else {
    document.querySelector('.login_box').style.display = 'flex';
    document.querySelector('.cadastro_box').style.display = 'none';
  }

});

// Abre o container com as opções para realizar o cadastro
cadastrarButton.addEventListener('click', () => {
  document.querySelector('.cadastro_box').style.display = 'flex';
  document.querySelector('.login_box').style.display = 'none';
});