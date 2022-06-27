// Botões de confirmar login e cadastro
var confirmLogin = document.querySelector('#loginConfirm'),
    confirmCadastro = document.querySelector('#cadastroConfirm');

// Botões de cancelar login e cadastro
var cancelarLogin = document.querySelector('#loginCancel'),
    cancelarCadastro = document.querySelector('#cadastroCancel');

// Botões para cancelar o login ou o cadastro
cancelarLogin.addEventListener('click', () => {
  document.querySelector('.login_box').style.display = 'none'; 
});
cancelarCadastro.addEventListener('click', () => {
  document.querySelector('.cadastro_box').style.display = 'none';
});

// Função que realiza o login
function fazer_login(auxEmail, auxSenha){
  var erro_no_login = document.querySelector('#erro_senha');
  erro_no_login.innerHTML = "";

  axios.post('https://amiibo-project-api.herokuapp.com/auth/login',{
    "email": auxEmail,
    "password": auxSenha
  })
  .then( function (res) {
    isLogged = true;
    document.querySelector('.container_busca').style.display = 'flex';
    document.querySelector('#login_button').innerHTML = 'Logout';
    document.querySelector('.login_box').style.display = 'none'; 

    localStorage.setItem("login", isLogged);
  })
  .catch( () => {
    erro_no_login.innerHTML = "Erro ao realizar login";
  });
}

// Função que realiza o cadastro
function fazer_cadastro(auxNome, auxEmail, auxSenha){
  var erro_no_cadastro = document.querySelector('#erro_senha_cadastro');
  erro_no_cadastro.innerHTML = "";

  axios.post('https://amiibo-project-api.herokuapp.com/auth/register',{
    "name": auxNome,
    "email": auxEmail,
    "password": auxSenha
  })
  .then( function (res) {
    isLogged = true;
    document.querySelector('.container_busca').style.display = 'flex';
    document.querySelector('#login_button').innerHTML = 'Logout';
    document.querySelector('.cadastro_box').style.display = 'none';

    localStorage.setItem("login", isLogged);
  })
  .catch( () => {
    erro_no_cadastro.innerHTML = "Erro ao realizar cadastro";
  });
}

// Checa os inputs do usuário e senha e chama a função de login
confirmLogin.addEventListener('click', () => {
   
  var loginEmail = document.querySelector('#login_email').value,
      loginSenha = document.querySelector('#login_senha').value,
      erroEmail = document.querySelector('#erro_email'),
      erroSenha = document.querySelector('#erro_senha');

  if(loginEmail.length <= 3){
    erroEmail.innerHTML = "O E-mail precisa ter no mínimo 3 caracteres!";
    erroSenha.innerHTML = "";
    
  } else if(loginSenha.length <= 3){
    erroEmail.innerHTML = "";
    erroSenha.innerHTML = "A senha precisa ter no mínimo 3 caracteres!";

  } else{
    erroEmail.innerHTML = "";
    erroSenha.innerHTML = "";
    fazer_login(loginEmail, loginSenha);
  }
  
});

// Processa o clique no botão de confirmar cadastro e chama a função que faz cadastro
confirmCadastro.addEventListener('click', () => {
  
  var cadastroNome = document.querySelector('#cadastro_nome').value,
      cadastroEmail = document.querySelector('#cadastro_email').value,
      cadastroSenha = document.querySelector('#cadastro_senha').value,
      erroEmail_cadastro = document.querySelector('#erro_email_cadastro'),
      erroSenha_cadastro = document.querySelector('#erro_senha_cadastro');
      erroNome_cadastro = document.querySelector('#erro_nome_cadastro');

  if(cadastroEmail.length <= 3){
    erroNome_cadastro.innerHTML = "";
    erroSenha_cadastro.innerHTML = "";
    erroEmail_cadastro.innerHTML = "O E-mail precisa ter no mínimo 3 caracteres!";
    
  } else if(cadastroSenha.length <= 3){
    erroEmail_cadastro.innerHTML = "";
    erroNome_cadastro.innerHTML = "";
    erroSenha_cadastro.innerHTML = "A senha precisa ter no mínimo 3 caracteres!";

  } else if(cadastroNome.length <= 1){
    erroEmail_cadastro.innerHTML = "";
    erroSenha_cadastro.innerHTML = "";
    erroNome_cadastro.innerHTML = "O nome precisa ter pelo menso 2 caracteres!";

  }else{
    erroEmail_cadastro.innerHTML = "";
    erroSenha_cadastro.innerHTML = "";
    erroNome_cadastro.innerHTML = "";

    fazer_cadastro(cadastroNome, cadastroEmail, cadastroSenha);
  }
  
});