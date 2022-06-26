var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    buttonBuscarAPI = document.querySelector('#buscar_api'),
    loginButton = document.querySelector('#login_button'),
    confirmButton = document.querySelector('#confirm'),
    resultados_api = document.querySelector('#search_results'),
    isLogged = false;

var cadastrarButton = document.querySelector('#cadastrar_button'),
    cancelarLogin = document.querySelector('#cancel_login');
    cancelarCadastro = document.querySelector('#cancel_cadastro');

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

// Botoões para cancelar o login ou o cadastro
cancelarLogin.addEventListener('click', () => {
  document.querySelector('.login_box').style.display = 'none'; 
})

cancelarCadastro.addEventListener('click', () => {
  document.querySelector('.cadastro_box').style.display = 'none';
})

var confirmCadastro = document.getElementById('#confirm_cadastro');
// function fazer_cadastro(auxNome, auxEmail, auxSenha){
  confirmCadastro.addEventListener('click', () => {
    alert("entrou no botão"); 
  })

// Função que realiza o login
function fazer_login(auxEmail, auxSenha){
  var erro_no_login = document.querySelector('#erro_senha');
  erro_no_login.innerHTML = "";

  axios.post('https://reqres.in/api/login',{
    "email": auxEmail,
    "password": auxSenha
  })
  .then( function (res) {
    isLogged = true;
    document.querySelector('.container_busca').style.display = 'flex';
    document.querySelector('#login_button').innerHTML = 'Logout';

    localStorage.setItem("login", isLogged);
  })
  .catch( () => {
    erro_no_login.innerHTML = "Erro ao realizar login";
  });
}

// Checa os inputs do usuário e senha e chama a função de login
confirmButton.addEventListener('click', () => {
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

// confirmButton_cadastro.addEventListener('click', () => {
//   var cadastroNome = document.querySelector('#cadastro_nome').value,
//       cadastroEmail = document.querySelector('#cadastro_email').value,
//       cadastroSenha = document.querySelector('#cadastro_senha').value,
//       erroEmail_cadastro = document.querySelector('#erro_email_cadastro'),
//       erroSenha_cadastro = document.querySelector('#erro_senha_cadastro');

//   if(cadastroEmail.length <= 3){
//     erroEmail_cadastro.innerHTML = "O E-mail precisa ter no mínimo 3 caracteres!";
//     erroSenha_cadastro.innerHTML = "";
    
//   } else if(cadastroSenha.length <= 3){
//     erroEmail_cadastro.innerHTML = "";
//     erroSenha_cadastro.innerHTML = "A senha precisa ter no mínimo 3 caracteres!";

//   } else{
//     erroEmail_cadastro.innerHTML = "";
//     erroSenha_cadastro.innerHTML = "";
//     fazer_cadastro(cadastroNome, cadastroEmail, cadastroSenha);
//   }
// });

// Realizar uma busca com base na API selecionada

buttonBuscarAPI.addEventListener('click', () => {
  var input = document.querySelector('#input_api'),
      input_tamanho = document.querySelector('#input_api').value,
      erroBusca = document.querySelector('#erro_busca'),
      charName = input.value;

  resultados_api.innerHTML = "";
  erroBusca.innerHTML = " ";

  if(input_tamanho.length <= 3){
    erroBusca.innerHTML = "A busca precisa ter no mínimo 3 caracteres!";
  } else{
    erroBusca.innerHTML = "";
    request.open('GET', 'https://amiiboapi.com/api/amiibo/?name=' + charName, true)

    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        let resposta = JSON.parse(request.responseText);
        let resposta_tamanho = resposta.amiibo.length;

        for( var i = 0; i < resposta_tamanho; i++){
          var nome_amiibo = document.createElement('p'),
              img_amiibo = document.createElement('img');

          nome_amiibo.innerHTML = resposta.amiibo[i].character;
          img_amiibo.src = resposta.amiibo[i].image;

          nome_amiibo.style.color = 'white';
          nome_amiibo.style.fontSize = '20px';
          nome_amiibo.style.fontFamily = 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, Verdana, sans-serif';
          nome_amiibo.style.textAlign = 'center';
          nome_amiibo.style.margin = '20px';

          img_amiibo.style.borderBottom = '3px solid white';
          img_amiibo.style.paddingBottom = '15px';

          resultados_api.appendChild(nome_amiibo);
          resultados_api.appendChild(img_amiibo);
        };

      } 
    }  
    request.send()
  }
});
