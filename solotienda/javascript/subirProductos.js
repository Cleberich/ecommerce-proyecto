
  let listaProductos = []
//PEDIMOS LOS PRODUCTOS POR MEDIO DE UN FETCH
  const pedirProductos = async () =>{
    try {
        let response = await fetch("/json/productos.json");
        let result = await response.json();
        listaProductos = result
        listaProductos.forEach((producto)=>{
            let nodo = document.createElement("card");
            cuotas = Math.round(producto.precio / 12)
            santander = Math.round(producto.precio * 0.85)
            nodo.setAttribute("class","card m-3 ");
            nodo.innerHTML = `<img src="${producto.imagen}" class="card-img-top productoimg" alt="card-grid-image"</img
                             <h5 class="card-title">${producto.nombre}</h5>
                              <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                              
                              <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                              <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                              <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                              
                              <p class="text-success text-card my-2"><b><i class="fa-solid fa-truck-fast"></i> Envíos a todo el país</b></p>                            
            `
            contenedor.appendChild(nodo);
            boton11 = document.getElementById(`${producto.id}`)
            boton11.addEventListener("click", () => {
                agregarAlCarrito(producto.id)
            })
            
        })
    } catch (error) {
        console.log(error);
    }
    return listaProductos
}
pedirProductos()

const contenedorCarrito = document.getElementById('carro')
const precioTotal = document.getElementById('precioTotal')
const span = document.getElementById('span')
const enviogratis = document.getElementById('enviogratis')

// FUNCION PARA CALCULAR SI EL ENVIO ES GRATIS

const envio = () => {
    if(precioTotal.innerText >= 1500){
        const pa = document.createElement("p")
        precioTotal.innerHTML = `
        <p class="fs-5">Tu pedido actual es de $${precioTotal.innerHTML}</p>
        <p class="fs-6 fw-bold text-success m-3">Felicidades el envío de tu pedido es gratis</p>`

    
    }
    if(precioTotal.innerText  < 3000){
        
        let resultado = 1500 - precioTotal.innerText 
        
        precioTotal.innerHTML = `
        <p class="fs-5">Tu pedido actual es de $${precioTotal.innerHTML}</p>
        <p class="fs-6 fw-bold text-danger m-3">Te falta ${resultado} para conseguir el envío gratis, son solo unos productos más...😜</p>`

    }
    
}


let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// VACIAR CARRITO
const vaciar = document.getElementById("vaciar-carrito")
vaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito (){
    carrito.length = 0;
    
    enviogratis.innerHTML = `<p></p>`
    localStorage.clear()
    actualizarCarrito();
}

// AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){                                    // SI EXISTE E PRODUCTO EN EL CARRITO LO SUMAMOS LA CANTIDAD
        const prod = carrito.map (prod =>{
            if (prod.id === prodId){
                prod.cantidad++

            }
        })
    }else {
        const item = listaProductos.find((prod) => prod.id === prodId) // SI NO ESTA EL PRODUCTO EN EL CARRITO LO AGREGAMOS
    carrito.push(item)
    mostrarCarrito () 

    }


    actualizarCarrito()
   
}
// ELIMINAR DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    enviogratis.innerHTML = `<p></p>`
    actualizarCarrito()
}

// ACTUALIZAR CARRITO
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod)=> {
        const div = document.createElement("card")
        div.setAttribute("class","d-block mx-5")
        div.innerHTML = `<td ><img class="w-25" src="${prod.imagen}"</td>
                        <td class="fs-carro">${prod.nombre}</td>
                        <td id="fs-carro">$${prod.precio} <button class="btn btn-white border-none" onclick="eliminarDelCarrito(${prod.id})"><i class="fa-solid fa-trash text-danger"></i></button></td>

        `
    contenedorCarrito.appendChild(div)
 

    localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0) // MOSTRAMOS IMPORTE DEL CARRITO EN LA BARRA DEL CARRITO
    
    span.innerText = carrito.length
    // span.innerText =  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0) // MOSTRAMOS IMPORTE DEL CARRITO AL LADO DEL ICONO
    envio()
}

//PRODUCTOS MAYORES A 1500
const productosEnvioG = document.querySelector('#productosEnvioGratis')
const productosEnvioGratis = () => {
    eliminarPortada.innerHTML = `<h1 class="fs-3 text-center text-morado mt-5">OLVIDATE DE PAGAR EL ENVÍO...</h1>` //ocultar la portada
   logosmedio.innerHTML = "" //ocultar svg del medio
    contenedor.innerHTML = ""
    let productosConEnvioGratis = listaProductos.filter(prod => prod.precio >= 1500)
    productosConEnvioGratis.forEach((producto)=>{
        let nodo = document.createElement("card");
        cuotas = Math.round(producto.precio / 12)
        santander = Math.round(producto.precio * 0.85)
        nodo.setAttribute("class","card m-3");
        nodo.innerHTML = ` <p class="badge bg-danger text-white fw-lighter text-card my-2 "><b><i class="fa-solid fa-truck-fast"></i>Producto con envío Gratis</b></p>                            
                        <img src="${producto.imagen}" class="card-img-top productoimg" alt="card-grid-image"</img
                         <h5 class="card-title">${producto.nombre}</h5>
                          <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
                          <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                          <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                          <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                          
        `
        contenedor.appendChild(nodo);
        boton11 = document.getElementById(`${producto.id}`)
        boton11.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
        
    })
}
productosEnvioG.addEventListener("click", productosEnvioGratis)

// FUNCION PARA MOSTRAR SOLO LAS NOTEBOOK

const mostrarNotebook =() =>{
    eliminarPortada.innerHTML = `<h1 class="fs-3 text-center text-morado mt-5">NOTEBOOKS</h1>` //ocultar la portada
   logosmedio.innerHTML = "" //ocultar svg del medio
    contenedor.innerHTML = ""
    let notebook = listaProductos.filter(prod => prod.categoria == "notebook")
    notebook.forEach((producto)=>{
        let nodo = document.createElement("card");
        cuotas = Math.round(producto.precio / 12)
        santander = Math.round(producto.precio * 0.85)
        nodo.setAttribute("class","card m-3");
        nodo.innerHTML = `<img src="${producto.imagen}" class="card-img-top productoimg" alt="card-grid-image"</img
                         <h5 class="card-title">${producto.nombre}</h5>
                          <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
                          <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                          <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                          <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                          
        `
        contenedor.appendChild(nodo);
        boton11 = document.getElementById(`${producto.id}`)
        boton11.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
        
    })
}

// FUNCION PARA MOSTRAR SOLO LOS CELULARES
const mostrarCelulares =() =>{
    eliminarPortada.innerHTML = `<h1 class="fs-3 text-center text-morado mt-5">TABLETS</h1>` //ocultar la portada
   logosmedio.innerHTML = "" //ocultar svg del medio
    contenedor.innerHTML = ""
    let celulares = listaProductos.filter(prod => prod.categoria == "celulares")
    celulares.forEach((producto)=>{
        let nodo = document.createElement("card");
        cuotas = Math.round(producto.precio / 12)
        santander = Math.round(producto.precio * 0.85)
        nodo.setAttribute("class","card m-3");
        nodo.innerHTML = `<img src="${producto.imagen}" class="card-img-top productoimg" alt="card-grid-image"</img
                         <h5 class="card-title">${producto.nombre}</h5>
                          <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
                          <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                          <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                          <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                          
        `
        contenedor.appendChild(nodo);
        boton11 = document.getElementById(`${producto.id}`)
        boton11.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
        
    })
}

// FUNCION PARA MOSTRAR SOLO LAS TABLETS

const mostrarTablets =() =>{
    eliminarPortada.innerHTML = `<h1 class="fs-3 text-center text-morado mt-5">TABLETS</h1>`
   logosmedio.innerHTML = ""
    contenedor.innerHTML = ""
    let tablets = listaProductos.filter(prod => prod.categoria == "tablets")
    tablets.forEach((producto)=>{
        let nodo = document.createElement("card");
        cuotas = Math.round(producto.precio / 12)
        santander = Math.round(producto.precio * 0.85)
        nodo.setAttribute("class","card m-3");
        nodo.innerHTML = `<img src="${producto.imagen}" class="card-img-top  productoimg" alt="card-grid-image"</img
                         <h5 class="card-title">${producto.nombre}</h5>
                          <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
                          <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                          <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                          <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                          
        `
        contenedor.appendChild(nodo);
        boton11 = document.getElementById(`${producto.id}`)
        boton11.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
        
    })
}

// FUNCION PARA MOSTRAR SOLO LAS ACCESORIOS
const elimianarPortada = document.querySelector("#eliminarPortada")
const logosmedio = document.querySelector("#logosmedio")

const mostrarAccesorios =() =>{
   eliminarPortada.innerHTML = `<h1 class="fs-3 text-center text-morado mt-5">ACCESORIOS</h1>`
   logosmedio.innerHTML = ""
    contenedor.innerHTML = ""
    let accesorios = listaProductos.filter(prod => prod.categoria == "accesorios")
    accesorios.forEach((producto)=>{
        let nodo = document.createElement("card");
        cuotas = Math.round(producto.precio / 12)
        santander = Math.round(producto.precio * 0.85)
        nodo.setAttribute("class","card m-3");
        nodo.innerHTML = ` <img src="${producto.imagen}" class="card-img-top productoimg" alt="card-grid-image"</img
                         <h5 class="card-title">${producto.nombre}</h5>
                          <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
                          <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                          <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                          <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                          
        `
        contenedor.appendChild(nodo);
        boton11 = document.getElementById(`${producto.id}`)
        boton11.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
        
    })
}


// CONTENEDOR CARRITO 

const mostrar = document.getElementById('span')
mostrar.addEventListener('click', mostrarCarrito)

function mostrarCarrito () {
    let fondo1 = document.querySelector('#contenedor-carrito')
    fondo1.setAttribute('class', 'col-3')

}
const cerrar = document.getElementById('carritoCerrar')
cerrar.addEventListener('click', cerrarCarrito)

function cerrarCarrito () {
    let fondo1 = document.querySelector('#contenedor-carrito')
    fondo1.setAttribute('class', 'col-3 d-none')
}

//  MODO OSCURO

const dark = document.getElementById('boton-dark')
dark.addEventListener("click", modoOscuro)

function modoOscuro () {
    let fondo = document.querySelector("#carouselExampleControls")
        fondo.style.background = "black";
}
const claro = document.getElementById('boton-claro')
claro.addEventListener("click", modoclaro)

function modoclaro () {
    let fondo1 = document.querySelector("#carouselExampleControls")
        fondo1.style.background = "#ebebeb";
}

//OBTENER DATOS DEL DOM
const botonBuscar = document.querySelector('#botonBuscar')
// FUNCION PARA BUSCAR PRODUCTOS POR NOMBRE
const resultadosBusqueda = () =>{
const busqueda = document.querySelector('#buscar').value
const buscar = (busqueda.toString())
    const resultados = listaProductos.filter(p => p.nombre == buscar[0].toUpperCase() + buscar.substring(1))
    eliminarPortada.innerHTML = `<h1 class="fs-3 text-center text-morado mt-5">RESULTADOS DE LA BUSQUEDA</h1>`
    logosmedio.innerHTML = ""
     contenedor.innerHTML = ""
     resultados.forEach((producto)=>{
         let nodo = document.createElement("card");
         cuotas = Math.round(producto.precio / 12)
         santander = Math.round(producto.precio * 0.85)
         nodo.setAttribute("class","card m-3");
         nodo.innerHTML = ` <img src="${producto.imagen}" class="card-img-top productoimg" alt="card-grid-image"</img
                          <h5 class="card-title">${producto.nombre}</h5>
                           <span>U$S <b>${producto.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                           
                           <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
                           <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
                           <button class="btn btn-dark fs-8 mt-2 w-100" id="${producto.id}" >Agregar al carrito</button><br>
                           
         `
         contenedor.appendChild(nodo);
         boton11 = document.getElementById(`${producto.id}`)
         boton11.addEventListener("click", () => {
             agregarAlCarrito(producto.id)
         })
         
     })
}


botonBuscar.addEventListener("click", resultadosBusqueda)

//ocultar pop up fijo 
const desactivarPopup = ()=> {
    const barrafixed = document.querySelector('.barrafixed')
    barrafixed.style.opacity ="0"
}
// mostrar pop up inferior a los 3 segundos
setTimeout(function() {
    const barrafixed = document.querySelector('.barrafixed')
    barrafixed.style.opacity ="1"
    
}, 4000)