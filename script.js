let result = document.getElementById('result');
let btn = document.querySelector('.Search-btn');
let input = document.getElementById("IMEI");
const div = (id , name , username, email, phone, photo) => {
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
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${id}">
      More
    </button>
    </div>
  </div>


<!-- Modal -->
<div class="modal fade" id="exampleModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel${id}" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel${id}">photo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ${photo}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
    return element;
  };

btn.addEventListener('click' , ()=>{
    input.value = "";
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((response) =>{
        result.innerHTML = div(response.id , response.name , response.username , response.email , response.phone , response.address.city);

    })
});

fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => response.json())
.then((response) =>{
    for(let i = 0 ; i < response.length ; i++){
    result.innerHTML += div(response[i].id , response[i].name , response[i].username , response[i].email , response[i].phone , response[i].address["city"]);
    console.log(response[i].address["city"])
    }
})