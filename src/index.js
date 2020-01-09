let addToy = false;
const TOYS_URL = "http://localhost:3000/toys";

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

  toyForm.addEventListener("submit", createToy);

})
 

function getToys (){
  fetch(TOYS_URL)
    .then(resp => resp.json())
    .then(json => displayToys(json))
    .catch(error => console.error('oops, something is wrong', error.message))
}

function displayToys(toys){
  for (const toy of toys){
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    const div = document.createElement('div');
    const collectionToys = document.getElementById('toy-collection');

    div.classList.add('card');
    h2.innerText = toy['name'];
    div.appendChild(h2);
    img.src = toy['image'];
    img.classList.add('toy-avatar');
    div.appendChild(img);
    let likes = toy['likes'] ? toy['likes'] : 0;
    p.innerText = `${likes} likes`;
    div.appendChild(p);
    btn.classList.add('like-btn');
    btn.innerText = 'Like <3';
    div.appendChild(btn);
    collectionToys.appendChild(div);
  }
}
 

function createToy() {
  let fields = document.querySelectorAll('input');
  let name = fields[0].value;
  let image = fields[1].value;
  let data = { name, image };

  const TYPE = "application/json";
  let reqConfig = {
    method: "POST",
    headers: {
      "Content-Type": TYPE,
      "Accept": TYPE
    },
    body: JSON.stringify(data)
  };

  fetch(TOYS_URL, reqConfig)
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(error => console.error('oops, something is wrong', error.message))
}



