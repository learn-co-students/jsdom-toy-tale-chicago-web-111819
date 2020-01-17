const toys3000 = 'http://localhost:3000/toys'

function main() {
  document.addEventListener("DOMContentLoaded", () => {
    
    hideNseek()
    fetchToys()
    addFormListener()
  })
}

function hideNseek(){
  let addToy = false
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
}

function addFormListener(){
  const form = document.getElementsByClassName('add-toy-form')
  form[0].addEventListener('submit', e => {
    e.preventDefault()
    postToy(e.target)
    e.target.reset()
  })
}

function postToy(newToy){
  fetch(toys3000, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": newToy.name.value,
      "image": newToy.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(toyObj => renderToy(toyObj))
}

function fetchToys(){
  fetch(toys3000)
  .then(resp => resp.json())
  .then(toys => {
    // console.log(toys)
    iterateToys(toys)
  })
}

function iterateToys(toys){
  toys.forEach(renderToy)
}

function renderToy(toy){
  const col = document.getElementById('toy-collection')
  const div = document.createElement('div')
  div.setAttribute('class', 'card')

  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  img.setAttribute('src', toy.image)

  const p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  const likeBtn = document.createElement('button')
  likeBtn.setAttribute('class', 'like-btn')

  div.append(h2, img, p, likeBtn)
  col.append(div)
  
// <div class="card">
//   <h2>Woody</h2>
//   <img src=toy_image_url class="toy-avatar" />
//   <p>4 Likes </p>
//   <button class="like-btn">Like <3</button>
// </div>
}

main()