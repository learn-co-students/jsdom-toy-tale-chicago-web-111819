let addToy = false;
const TOYS_URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const listToys = document.getElementById('toy-collection');
  const btns = document.getElementsByClassName('like-btn')
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

  toyForm.addEventListener("submit", function(e){
    e.preventDefault();
    createToy();
    e.target.reset();
  });
})
 
function getToys (){
  fetch(TOYS_URL)
    .then(resp => resp.json())
    .then(json => displayToys(json))
    .catch(error => console.error('oops, something is wrong', error.message))
}

function displayToys(toys){
  for (const toy of toys){
    displayToy(toy)
  }
}

function displayToy(toy){
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

    let toyData = {
      name: h2.innerText, 
      image: img.src,
      id: toy["id"]
    };

    btn.addEventListener('click', function(e){
      let numStr = div.querySelector('p').innerText.split(" ")[0];
      let numInt = parseInt(numStr);
      numInt = numInt + 1;
      p.innerText = `${numInt} likes`

      toyData["likes"] = numInt

      updateToyLike(toyData);
    })
}

const TYPE = "application/json";

function createToy() {
  let fields = document.querySelectorAll('input');
  let name = fields[0].value;
  let image = fields[1].value;
  let data = { name, image };

  let reqConfig = {
    method: "POST",
    headers: {
      "Content-Type": TYPE,
      "Accept": TYPE
    },
    body: JSON.stringify(data)
  };

  return fetch(TOYS_URL, reqConfig)
    .then(resp => resp.json())
    .then(json => displayToy(json))
    .catch(error => console.error('oops, something is wrong', error.message))
}

function updateToyLike(toyData) {
  let likeConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": TYPE,
      "Accept": TYPE
    },
    body: JSON.stringify(toyData)
  };

  let toyID = toyData["id"]
  let realUrl = TOYS_URL + '/' + toyID
  // let thisToyUrl = `http://localhost:3000/toys/${toyID}`

  return fetch(realUrl, likeConfig)
  .then(resp => resp.json())
  .then(json => console.log(json))
  .catch(error => console.error('oops, something is wrong in the likes', error.message))
}