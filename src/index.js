let addToy = false

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(r => r.json() )
  .then( renderToys )
  .catch((err) => console.log('err', err))
}

function postToy(formData) {
  const newToyObj = {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  };

  fetch('http://localhost:3000/toys', newToyObj)
    .then(r => r.json() )
    .then( buildToyElement )
    .catch( console.log )
}

function renderToys(toys){
  
  toys.forEach( function(toy) {
    buildToyElement(toy)
  })
}

function buildToyElement(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const toyCard = document.createElement('div')
  toyCard.className = 'card'

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  const toyIMG = document.createElement('img')
  toyIMG.src = toy.image
  toyIMG.width = 250
  toyIMG.className = 'toy-avatar'

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

  const toyLiker = document.createElement('button')
  toyCard.append(toyName)
  toyCard.append(toyIMG)
  toyCard.append(toyLiker)
  toyCard.append(toyLikes)
  toyLiker.id = toy.id
  toyLiker.innerText = 'Like <3'
  toyLiker.className = 'like-btn'
  toyLiker.addEventListener('click', function(event) {
    fetch(`http://localhost:3000/toys/${toyLiker.id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": toyName.innerText,
        "image": toyIMG.src,
        "likes": toy.likes += 1
      })
    } )
    .then( r => r.json() )
    .then( data => toyLikes.innerText = `${data.likes} Likes`)
    .catch(console.log)
  })


  toyCollection.append(toyCard)
}



function toyFormListener() {
  const newToyForm = document.querySelector('form.add-toy-form')
  newToyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
      "name": e.target[0].value,
      "image": e.target[1].value,
      "likes": 0
    }
    postToy(formData)
  })
}



document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetchToys();
  toyFormListener();
  
})



