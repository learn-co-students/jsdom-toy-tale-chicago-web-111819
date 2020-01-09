let addToy = false;
const createH2 = document.createElement('h2')
const createImg = document.createElement('img')
const createP = document.createElement('p')
const createBtn = document.createElement('button')
const createDiv = document.createElement('div')

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const listToys = document.getElementById('toy-collection');

  getToys();

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  })

})
 

function getToys (){
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(error => console.error('oops, something is wrong'))
}

function displayToys(object){
  for (const key in object){

  }
}

// fetch("http://localhost:3000/users", configObj)
//         .then(resp => resp.json())
//         .then(json => document.body.innerHTML = json.id)
//         .catch(error => document.body.innerHTML = 'Unauthorized Access')
// }
