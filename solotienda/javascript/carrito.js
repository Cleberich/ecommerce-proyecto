let carrito = [];


function add(precio){
    carrito.push(precio)
    console.log(carrito);
}

// Agregando elementos al carrito 

const btnAdd = document.getElementById('btn-dark');
const span = document.getElementById('span')
let contador = 0;

btnAdd.addEventListener('click', () =>{
    contador++
    alert("Producto agregado correctamente");
    span.textContent = contador;
})