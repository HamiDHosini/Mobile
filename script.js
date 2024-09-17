let result = document.getElementById('result');
let btn = document.querySelector('.Search-btn');
let input = document.getElementById("IMEI");
const div = (id , name , username,email,phone) => {
    let element = `<div class="card my-3 shadow">
    <div class="card-body">
      <h5 class="card-title">id : ${id}</h5>
      <p class="card-text">Name : ${name}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item d-flex justify-content-between align-items-center">Username : ${username}
      <span class="badge text-bg-success rounded-pill"><i class="bi bi-check2 text-light fs-5"></i></span>
      </li>
      <li class="list-group-item list-group-item d-flex justify-content-between align-items-center">Email : ${email}
      <span class="badge text-bg-success rounded-pill"><i class="bi bi-check2 text-light fs-5"></i></span>
      </li>
      <li class="list-group-item list-group-item d-flex justify-content-between align-items-center"> phone : ${phone}
      <span class="badge text-bg-success rounded-pill"><i class="bi bi-check2 text-light fs-5"></i></span>
      </li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card photo</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>`;
    return element;
  };
btn.addEventListener('click' , ()=>{
    input.value = "";
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((response) =>{
        result.innerHTML = div(response.id , response.name , response.username , response.email , response.phone);

    })
});

fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => response.json())
.then((response) =>{
    for(let i = 0 ; i < 10 ; i++){
    result.innerHTML += div(response[i].id , response[i].name , response[i].username , response[i].email , response[i].phone);
    }
})
// .then((response) => response.json())
// .then((response) =>{
//     result.innerHTML += div(response.id , response.userId , response.title);
//     return fetch('https://jsonplaceholder.typicode.com/todos/3')
// })
// .then((response) => response.json())
// .then((response) =>{
//     result.innerHTML += div(response.id , response.userId , response.title);
//     return fetch('https://jsonplaceholder.typicode.com/todos/4')
// })
// .then((response) => response.json())
// .then((response) =>{
//     result.innerHTML += div(response.id , response.userId , response.title);
//     return fetch('https://jsonplaceholder.typicode.com/todos/5')
// })

