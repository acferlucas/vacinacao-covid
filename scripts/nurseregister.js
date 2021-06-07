function handleSubmitButtonClick() {
  const form = document.getElementsByTagName('form')[0]

  form.dispatchEvent(new Event('submit'))

}

function submitForm(e) {
 
  const Form = document.forms.registration
  e.preventDefault()

  const {nome, coren, ano,contato} = Form

  console.log(
    {
      name: nome.value,
	    coren: coren.value,
	    formation_year: ano.value,
	    contact: contato.value
    }
  )

  fetch('https://api-covid.herokuapp.com/nurses', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: nome.value,
	    coren: coren.value,
	    formation_year: ano.value,
	    contact: contato.value
    })
  }).then(function(){
    window.location.href = 'http://localhost:5500/index.html'
  })
}