let addToy = false;

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
    p.innerText = `${toy['likes']} likes`;
    div.appendChild(p);
    btn.classList.add('like-btn');
    btn.innerText = 'Like <3';
    div.appendChild(btn);
    collectionToys.appendChild(div);
  }
}

// fetch("http://localhost:3000/users", configObj)
//         .then(resp => resp.json())
//         .then(json => document.body.innerHTML = json.id)
//         .catch(error => document.body.innerHTML = 'Unauthorized Access')
// }
