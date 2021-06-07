const grupos = []


function getGrupo(){
  fetch('https://api-covid.herokuapp.com/groups')
  .then((response) => response.json())
  .then((responsedata) => {
    grupos.push(...responsedata)
    console.log(grupos)
    
    carregaGrupos(responsedata)
    
  })
}

function carregaGrupos(data){
  
  const select = document.getElementsByTagName('select')[0]
  console.log(select)
  
  grupos.forEach((data) =>{
    
    const opt = document.createElement('option')
    opt.setAttribute('value', data.id)
    opt.innerText = data.denomination
    select.appendChild(opt)
  })
}

getGrupo()

function handleSubmitButtonClick() {
  const form = document.getElementsByTagName('form')[0]

  form.dispatchEvent(new Event('submit'))

}

function submitForm(e) {
 
  const Form = document.forms.registration
  const selectOption = document.getElementsByTagName('select')[0]
  
  e.preventDefault()

  const {nome, data, caracteristicas} = Form
  console.log(nome.value, data.value, caracteristicas.value, selectOption.value)

  fetch('https://api-covid.herokuapp.com/patients', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: nome.value,
      birthday:data.value ,
      individual_characteristics: caracteristicas.value ,
      group_id:selectOption.value
    })
  }).then(function(){
    window.location.href = 'http://localhost:5500/pages/pacientes.html'
  })
}

