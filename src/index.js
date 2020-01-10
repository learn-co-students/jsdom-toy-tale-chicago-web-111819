let addToy = false
function main(){
  document.addEventListener("DOMContentLoaded", ()=>{
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    addBtn.addEventListener('click', () => { // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = 'none'
      }
    })

    fetchToys();
    newToy();
    addNewToyFormListener();
  })
}

function newToy(toyData) {

  reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  }

  fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(renderToy(toyData)) 
}

function addNewToyFormListener(){
  const form = document.querySelector('form.add-toy-form')
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const newToyData = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }
    
    newToy(newToyData);

  })
}



function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then( resp => resp.json())
    .then( json => addToys(json) )
}

function addToys(json) {
  const toys = json;

  toys.forEach(toy => {
    renderToy(toy);
  });
}

function renderToy(toy){
  const toyDiv = document.querySelector("div#toy-collection");

  const toyCard = document.createElement('div');
  toyCard.className = 'card';

  const h2 = document.createElement('h2');
  h2.innerText = toy.name
  toyCard.appendChild(h2);

  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  toyCard.appendChild(img);

  const p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  toyCard.appendChild(p);

  const btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.innerText = 'Like ♡';
  toyCard.appendChild(btn);

  
  toyDiv.appendChild(toyCard);
}
main();

new