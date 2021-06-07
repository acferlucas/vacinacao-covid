function handleSubmitButtonClick() {
  const form = document.getElementsByTagName('form')[0]

  form.dispatchEvent(new Event('submit'))

}

function submitForm(e) {
 
  const Form = document.forms.registration
  e.preventDefault()

  const {nome, fabricante, tempoentreaplicacoes,doses} = Form

  fetch('https://api-covid.herokuapp.com/vacines', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: nome.value,
      manufacturer:fabricante.value ,
      time_between_applications: tempoentreaplicacoes.value ,
      applications_amount:doses.value
    })
  }).then(function(){
    window.location.href = 'http://localhost:5500/web/index.html'
  })
}