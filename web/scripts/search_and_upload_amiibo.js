var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    buttonBuscarAPI = document.querySelector('#buscar_api'),
    resultados_api = document.querySelector('#search_results');

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
