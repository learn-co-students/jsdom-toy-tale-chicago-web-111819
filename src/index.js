let addToy = true
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const form = document.querySelector('form.add-toy-form')

function start() {
addBtn.addEventListener('click', () => { // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
createFormListener();
}

function createFormListener(){
  form.addEventListener('submit', function(e){
    e.preventDefault()
    const formData = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }
    

    e.target.reset()

  
     reqObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }



    fetch('http://localhost:3000/toys', reqObj)
      .then(resp => resp.json())
      .then(toys => {
        addToys(toys)
      })


  })
}

function fetchToys() {
 fetch('http://localhost:3000/toys')
    .then( resp => resp.json())
    .then( toys => addToys(toys) )
}

function addToys(toys) {
  
  toys.forEach(toy => {
    renderToy(toy)
  });
}

function renderToy(toy) {
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
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  
  toyDiv.appendChild(toyCard);
  
  
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}



fetchToys();
start();
//createFormListener();
