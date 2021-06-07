function handleSubmitButtonClick() {
  const form = document.getElementsByTagName('form')[0]

  form.dispatchEvent(new Event('submit'))

}

function submitForm(e) {
 
  const Form = document.forms.registration
  e.preventDefault()

  const {denominacao, minage, maxage} = Form
  console.log(
    {
      denomination: denominacao.value,
      min_age:minage.value ,
      max_age: maxage.value 
    }
  )

  fetch('https://api-covid.herokuapp.com/groups', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      denomination: denominacao.value,
      min_age:minage.value ,
      max_age: maxage.value 
    })
  }).then(function(){
    window.location.href = 'http://localhost:5500/index.html'
  })
}