const pacientes = []
const vacinas = []
const profissionais = []
let filtroPaciente = []
let vacineCount = 0 
let selectid = 0

const divtotal = document.getElementById('total')
const totalh2 = document.createElement('h2')
const ptotal = document.createElement('p')

const divvacine = document.getElementById('vacinados')
const h2vacine = document.createElement('h2')
const pvacine = document.createElement('p')

const notVacine = document.getElementById('naovacinados')
const h2not = document.createElement('h2')
const pnot = document.createElement('p')

function loadPacient() {
  
  fetch('https://api-covid.herokuapp.com/patients')
  .then((response) => response.json())
  .then((responsedata) => {

    pacientes.push(...responsedata)
    carregarPaciente(responsedata)
    
    atualizaData()
  })
}
 

function atualizaData(){
    
  ptotal.innerText = "Total Pacientes"
  totalh2.innerText = pacientes.length
  divtotal.appendChild(totalh2)
  divtotal.appendChild(ptotal)
  
  h2vacine.innerText = vacineCount
  pvacine.innerText = "Total Vacinados"
  divvacine.appendChild(h2vacine)
  divvacine.appendChild(pvacine)

  h2not.innerText = pacientes.length - vacineCount
  pnot.innerText = "Total Não vacinados"
  notVacine.appendChild(h2not)
  notVacine.appendChild(pnot)
}

function deletePatient(id, index) {
  
  console.log('Entrei na func')
  fetch('https://api-covid.herokuapp.com/patients/'+ id, {
   method: 'DELETE',
  })
  .then(() => {
    console.log('Cheguei até aqui')
    pacientes.splice(index, 1)
    carregarPaciente(pacientes)
    atualizaData()
  })
}

function carregarPaciente(data){
  const tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = ''
  
  data.forEach((data, index) => {
    
    const tr = document.createElement('tr')
    
    const tdnome = document.createElement('td')
    tdnome.innerText = data.name
    tr.appendChild(tdnome)

    const tddata = document.createElement('td')
    tddata.innerText = data.birthday
    tr.appendChild(tddata)

    const tdcaracteristica = document.createElement('td')
    tdcaracteristica.innerText = data.individual_characteristics
    tr.appendChild(tdcaracteristica)

    const tdgrupo = document.createElement('td')
    tdgrupo.innerText = data.group.denomination
    tr.appendChild(tdgrupo)

    const tdaplication = document.createElement('td')
    
    
    const div = document.createElement('div')
    tdaplication.classList.add('status') 

    if(data.applications.length > 0){
      console.log(data)
      div.innerText = data.applications[0].vacine.name
      tdaplication.classList.add('vacinated')
      vacineCount++; 
    }else {
      div.innerText = "Aplicar Vacina"
      div.addEventListener('click',() => openModal(data.id, data.name))
    }
    tdaplication.appendChild(div)
    tr.appendChild(tdaplication)

    const tdicons = document.createElement('td')
    const itrash = document.createElement('img')
    itrash.setAttribute('src',"../assets/trash (3).svg")
    itrash.addEventListener('click', () => deletePatient(data.id, index))
    const ipencil = document.createElement('img')
    ipencil.setAttribute('src',"../assets/edit-2 (1).svg")
    tdicons.appendChild(itrash)
    tdicons.appendChild(ipencil)
    tr.appendChild(tdicons)

    tbody.appendChild(tr)
  })
}

function pesquisar() {
  
  const tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = ''
  const inputvalue = document.querySelector('input[type="text"]').value.toLowerCase()
  console.log(inputvalue)

  filtroPaciente = pacientes.filter((paciente) => paciente.name.toLowerCase().includes(inputvalue))
  console.log(filtroPaciente)

  filtroPaciente.forEach((paciente, index) =>{
    
    const tr = document.createElement('tr')
    
    const tdnome = document.createElement('td')
    tdnome.innerText = paciente.name
    tr.appendChild(tdnome)

    const tddata = document.createElement('td')
    tddata.innerText = paciente.birthday
    tr.appendChild(tddata)

    const tdcaracteristica = document.createElement('td')
    tdcaracteristica.innerText = paciente.individual_characteristics
    tr.appendChild(tdcaracteristica)

    const tdgrupo = document.createElement('td')
    tdgrupo.innerText = paciente.group.denomination
    tr.appendChild(tdgrupo)

    const tdaplication = document.createElement('td')
    
    
    const div = document.createElement('div')
    tdaplication.classList.add('status') 

    if(paciente.applications.length > 0){
      div.innerText = paciente.applications[0].vacine.name
      tdaplication.classList.add('vacinated') 
    }else {
      div.innerText = "Aplicar Vacina"
    }
    tdaplication.appendChild(div)
    tr.appendChild(tdaplication)

    const tdicons = document.createElement('td')
    const itrash = document.createElement('img')
    itrash.setAttribute('src',"../assets/trash (3).svg")
    itrash.addEventListener('click', () => deletePatient(paciente.id, index))
    const ipencil = document.createElement('img')
    ipencil.setAttribute('src',"../assets/edit-2 (1).svg")
    tdicons.appendChild(itrash)
    tdicons.appendChild(ipencil)
    tr.appendChild(tdicons)

    tbody.appendChild(tr)
    
  })
}

function CarregarVacinas() {
  
  fetch('https://api-covid.herokuapp.com/vacines')
  .then((response) => response.json())
  .then((responsedata) => {

    vacinas.push(...responsedata)
    const selectVacine = document.getElementsByTagName('select')[1]

    vacinas.forEach((vacina) => {
      const opt = document.createElement('option')
      opt.setAttribute('value',vacina.id)
      opt.innerText = vacina.name
      selectVacine.appendChild(opt)
    })
  })
}

function CarregarProfissional() {
  
  fetch('https://api-covid.herokuapp.com/nurses')
  .then((response) => response.json())
  .then((responsedata) => {

    profissionais.push(...responsedata)
    const selectProf = document.getElementsByTagName('select')[0]
    
    profissionais.forEach((profissional) => {
      const optprof = document.createElement('option')
      optprof.setAttribute('value',profissional.id)
      optprof.innerText = profissional.name
      selectProf.appendChild(optprof)
    })
  })
}

function openModal(id, nome){
  
  const modaldiv = document.getElementsByClassName('modal')[0]
  console.log(modaldiv)
  modaldiv.style.display ='flex'
  selectid = id
  console.log(nome)
  const input = document.getElementById('nome')
  input.setAttribute('value',nome)
}

function closeModal(){
  const modaldiv = document.getElementsByClassName('modal')[0]
  modaldiv.style.display = 'none'
}

function handleSubmit(e){

  e.preventDefault()
  const selectedAplication = document.getElementById('aplicador-vacina')
  const selectedVacine = document.getElementById('vacina-aplicada')
  const description = document.getElementById('description')

  console.log({
    date: "02/06/2021",
    hour: "00:00",
    description: 'descrição',
    vacine_id: selectedVacine.value,
    applicator_id: selectedAplication.value,
    patient_id: selectid
  })

  fetch('https://api-covid.herokuapp.com/applications', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      date: new Date().toLocaleDateString(),
      hour: `${new Date().toLocaleTimeString().split(':')[0]}:${new Date().toLocaleTimeString().split(':')[1]}`,
      description: description.value,
      vacine_id: selectedVacine.value,
      applicator_id: selectedAplication.value,
      patient_id: selectid
    })
  }).then(function(){
      window.location.reload()
  })
}

loadPacient()
CarregarVacinas()
CarregarProfissional()