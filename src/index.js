let addToy = false

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

fetchToys()
addFormListener()
})

// display new toy from form
function addFormListener(){
  const form = document.querySelector('form')

  // listen to form submit
  form.addEventListener('submit', function(e){
    e.preventDefault()

  const formData = {
    name: e.target[0].value,
    image: e.target[1].value
  }

  const userNewToyObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },

        body: JSON.stringify(formData)
      }
  
  // scrape new toy object name and image from form and send to function renderToy
  fetch ('http://localhost:3000/toys', userNewToyObj)
  .then(resp => resp.json)
  .then(toyObj => {
    renderToy(toyObj)
  })
})
}


// get toys
function fetchToys(){
  fetch ('http://localhost:3000/toys')
  .then (resp => resp.json())
  .then (toys => {
    iterateToys(toys)
    })
  }
// get single toy
  function iterateToys(toys){
    toys.forEach(function(toyObj){
      renderToy(toyObj)
    })
  }
// render single toy
  function renderToy(toyObj){
    const toyList = document.getElementById('toy-collection')
    const toyDiv = document.createElement('div')

    // create card for div container toy-collection
    toyDiv.className = "card"
    toyList.appendChild(toyDiv)
    
    // create h2 title for card element
    const toyElementName = document.createElement('h2')
    toyElementName.innerHTML = `${toyObj.name}`
    toyDiv.appendChild(toyElementName)

    // put image in card container
    const toyElementImage = document.createElement('img')
    toyElementImage.className = "toy-avatar"
    toyElementImage.setAttribute('src', `${toyObj.image}`)
    toyDiv.appendChild(toyElementImage)
  
    // create likes on card
    const toyElementLikes = document.createElement('p')
    toyElementLikes.innerHTML = `${toyObj.likes} Likes`
    toyDiv.appendChild(toyElementLikes)

    // create like button on card (doesn't do anything)
    const likeBtn = document.createElement('button')
    likeBtn.innerHTML = "Like"
    likeBtn.className = "like-button"
    toyDiv.appendChild(likeBtn)
  
  }

  // like button functionality (establishing functionality: current priority)

// function incrementLikes(){
//   const likeBtnn = document.getElementsByClassName('like-button')

//   likeBtnn.addEventListener('submit', function(e){
//     e.preventDefault()

//     const likePostReq = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify(likePress)
//     }

//       fetch('http://localhost:3000/toys', likePostReq)
//       .then(resp => resp.json())
//       .then(addOneLike => {
//         renderToy(addOneLike)
//       })
//   })
// }