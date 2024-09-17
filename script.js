let result = document.getElementById('result');
let btn = document.querySelector('.Search-btn');
let input = document.getElementById("IMEI");
btn.addEventListener('click' , ()=>{
    input.value = "";
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((response) =>{
        result.innerHTML = `<div>id : ${response.id} , userId : ${response.userId} , title : ${response.title}</div>`
    })
});

fetch('https://jsonplaceholder.typicode.com/todos/1')
.then((response) => response.json())
.then((response) =>{
    result.innerHTML += `<div>
    <p>id : ${response.id}</p>
    <p>id : ${response.title}</p>
    </div>`;
    return fetch('https://jsonplaceholder.typicode.com/todos/2')
})
.then((response) => response.json())
.then((response) =>{
    result.innerHTML += `<div>
    <p>id : ${response.id}</p>
    <p>id : ${response.title}</p>
    </div>`;
    return fetch('https://jsonplaceholder.typicode.com/todos/3')
})
.then((response) => response.json())
.then((response) =>{
    result.innerHTML += `<div>
    <p>id : ${response.id}</p>
    <p>id : ${response.title}</p>
    </div>`;
    return fetch('https://jsonplaceholder.typicode.com/todos/4')
})
.then((response) => response.json())
.then((response) =>{
    result.innerHTML += `<div>
    <p>id : ${response.id}</p>
    <p>id : ${response.title}</p>
    </div>`;
    return fetch('https://jsonplaceholder.typicode.com/todos/5')
})
.catch((error) => console.log("error"))
