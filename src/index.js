
/* === helpers === */
function q(el) {
  return document.querySelector(el);
}

function qA(el) {
  return document.querySelectorAll(el);
}

/**
 * 
 * @param {*} message Informational message to print to STDOUT.
 * @param {*} method The method from which this was called.
 * @param {*} error Whether this is an error or just info.
 * 
 */
function log(message, method = null, error = false) {
  const type = error ? "Error" : "Info";
  let msg = method ? `${type}[${method}()]` : `${type}`;
  msg += `: ${message}`;
  type ? console.log(msg) : console.error(msg);
}
/* === END helpers === */

const CONF = {
  DATA_TYPES: {
    json: "application/json",
    html: "text/html",
    txt: "text/plain",
    csv: "text/csv",
    formdata: "multipart/form-data"
  },
  URLS: {
    base: "http://localhost:3000",
    toys: "http://localhost:3000/toys"
  },
  METHODS: {
    get: "GET",
    post: "POST",
    patch: "PATCH",
    put: "PUT",
    delete: "DELETE"
  }
}

let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
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

  toyForm.addEventListener("submit", e => {
    e.preventDefault();
    createToy();
    e.target.reset();
  });
})
 
function getToys(){
  fetch(CONF.URLS.toys)
    .then(resp => resp.json())
    .then(json => displayToys(json))
    .catch(error => log(error.message, "getToys", true))
}

function displayToys(toys){
  for (const toy of toys){
    displayToy(toy)
  }
}

function displayToy(toy){
  const listToys = q("#toy-collection");

  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  const div = document.createElement('div');

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
  listToys.appendChild(div);

  let toyData = {
    name: h2.innerText, 
    image: img.src,
    id: toy["id"]
  };

  btn.addEventListener('click', e => {
    e.preventDefault();
    let numStr = div.querySelector('p').innerText.split(" ")[0];
    let numInt = parseInt(numStr);
    numInt = numInt + 1;
    p.innerText = `${numInt} likes`

    toyData["likes"] = numInt

    updateToyLike(toyData);
  })
}

function createToy() {
  let fields = qA('input');
  let name = fields[0].value;
  let image = fields[1].value;
  let data = { name, image };

  let reqConfig = {
    method: CONF.METHODS.post,
    headers: {
      "Content-Type": CONF.DATA_TYPES.json,
      "Accept": CONF.DATA_TYPES.json
    },
    body: JSON.stringify(data)
  };

  return fetch(CONF.URLS.toys, reqConfig)
    .then(resp => resp.json())
    .then(toy => {
      displayToy(toy);
      log("Toy successfully created with the following id: " + toy.id, "createToy");
    })
    .catch(error => log(error.message, "createToy", true))
}

function updateToyLike(toyData) {
  let likeConfig = {
    method: CONF.METHODS.patch,
    headers: {
      "Content-Type": CONF.DATA_TYPES.json,
      "Accept": CONF.DATA_TYPES.json
    },
    body: JSON.stringify(toyData)
  };

  let toyUrl = `${CONF.URLS.toys}/${toyData["id"]}`

  fetch(toyUrl, likeConfig)
    .then(resp => resp.json())
    .then(toy => {
      displayToy(toy);
      log(`Toy with the following id '${toy.id}' successfully UPDATED.`, "updateToyLike");
    })
    .catch(error => log(error.message, "updateToyLike", true))
}




