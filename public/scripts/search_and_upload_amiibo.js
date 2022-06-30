var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    buttonBuscarAPI = document.querySelector('#buscar_api'),
    resultados_api = document.querySelector('#search_results'),
    buttonRefCadastro = document.querySelector('#ref_cadastro_amiibo'),
    buttonRefBusca = document.querySelector('#ref_busca_amiibo'),
    buttonCadastroAmiibo = document.querySelector('#upload_content_button');
   
buttonRefCadastro.addEventListener('click', () => {
  document.querySelector('.container_busca').style.display = 'none';
  document.querySelector('.container_upload_content').style.display = 'flex';
})

buttonRefBusca.addEventListener('click', () => {
  document.querySelector('.container_busca').style.display = 'flex';
  document.querySelector('.container_upload_content').style.display = 'none';
})

// Adicionar um novo amiibo no banco de dados
buttonCadastroAmiibo.addEventListener('click', () => {
  var amiiboName = document.querySelector('#upload_content_name').value,
      amiiboURL = document.querySelector('#upload_content_url').value;

      axios.post('https://amiibo-project-api.herokuapp.com/amiibo/post',{
        "name": amiiboName,
        "imageURL": amiiboURL
      })
      .then( function (res) {
        document.querySelector('.container_busca').style.display = 'flex';
        document.querySelector('.container_upload_content').style.display = 'none';
      })
})

// Realizar uma busca com base na API selecionada
buttonBuscarAPI.addEventListener('click', async () => {
  var input = document.querySelector('#input_api'),
      input_tamanho = document.querySelector('#input_api').value,
      erroBusca = document.querySelector('#erro_busca'),
      charName = input.value;
      console.log(charName)

  resultados_api.innerHTML = "";
  erroBusca.innerHTML = " ";

  if(input_tamanho.length <= 3){
    erroBusca.innerHTML = "A busca precisa ter no mínimo 3 caracteres!";
  } else{
    erroBusca.innerHTML = "";

    let response = await axios.get((`https://amiibo-project-api.herokuapp.com/amiibo/search:${charName}`))
    console.log(response);

    for(let i = 0 ; i < response.data.length; i++){
      var img_amiibo = document.createElement('img');
      
      img_amiibo.src = response.data[i].imageURL;

      img_amiibo.style.borderBottom = '3px solid white';
      img_amiibo.style.paddingTop = '15px';
      img_amiibo.style.paddingBottom = '15px';
      img_amiibo.style.width = '300px';

      resultados_api.appendChild(img_amiibo);
    }
  }
});
  