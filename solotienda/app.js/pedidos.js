const caja = document.getElementById('caja');
const eliminar = document.getElementById('eliminar')


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('misPedidos')){
        misPedidos = JSON.parse(localStorage.getItem('misPedidos'))
        mostrarPedidos()
    }
})




function nuevosPedidos (elementId){
    let fecha = document.querySelector('#fecha').value;  
    let cliente = document.querySelector('#cliente').value;  
    let pedido = document.querySelector('#id').value;  
    let importe = document.querySelector('#importe').value;  
    let estado = document.querySelector('#estado').value;  
    let nuevo = new Pedidos (pedido, cliente, fecha, importe, estado)
    misPedidos.unshift(nuevo)
    mostrarPedidos()

    Swal.fire(
      'Muy bien',
      'Haz creado el pedido con éxito!',
      'success'
    )    
}
misPedidos = [
  {pedido: 125, cliente: "Juan", apellido: "Regueira", fecha: "01/07/2022", importe: 890, estado: "pago pendiente"},
  {pedido: 124, cliente: "Cleber", apellido: "Davila", fecha: "02/07/2022", importe: 890, estado: "completado"},
  {pedido: 123, cliente: "Laura", apellido: "Petrocceli", fecha: "12/07/2022", importe: 890, estado: "pago pendiente"},
  {pedido: 122, cliente: "Matias", apellido: "Rodriguez", fecha: "12/07/2022", importe: 890, estado: "pago pendiente"},
  {pedido: 121, cliente: "Juan", apellido: "Fernandez", fecha: "12/07/2022", importe: 890, estado: "pago pendiente"},
  {pedido: 120, cliente: "Washinton", apellido: "Vazquez", fecha: "17/07/2022", importe: 890, estado: "completado"},
  {pedido: 119, cliente: "Pedro", apellido: "Perez", fecha: "19/07/2022", importe: 890, estado: "completado"},
  {pedido: 118, cliente: "Matias", apellido: "Diaz", fecha: "21/07/2022", importe: 890, estado: "completado"}
]



function mostrarPedidos () {
    caja.innerHTML = ""
    misPedidos.forEach(element => {
        const nodo = document.createElement("th");
        nodo.setAttribute("class", "table-danger d-block justify-content-between");
        nodo.innerHTML = `
<table class="table border-none ">
 
  <tbody >
          <tr class=" d-flex justify-content-between ">
            <td class="fw-normal  fs-8 col text-start ">#${element.pedido}</td>
            <td class="fw-normal fs-8 col text-start ">${element.fecha}</td>
            <td class="fw-normal fs-8 col text-start ">${element.cliente}</td>
            <td class="fw-normal fs-8 col text-start ">${element.importe}</td>
            <td class="fw-normal fs-8 col text-start ">${element.estado === "Completado"  ? '<p class="badge bg-success fs-7 fw-light">Completado</p>' : '<p class="badge bg-danger fs-7 fw-light">Pago pendiente</p>'}</td>
            <td> <button type="button" class="btn btn-danger col text-end " onclick="eliminarPedido(${element.id})" id="fs-8"><i class="fa-solid fa-trash "></i></button>
              </td>
          </tr>
        </tbody>

        `       
        caja.appendChild(nodo) 
        

        localStorage.setItem('misPedidos', JSON.stringify(misPedidos))

    })
}

mostrarPedidos()

//  ELIMINAR 
const eliminarPedido = (elementId) => {
  const item = misPedidos.find((element) => element.id === elementId)
  const indice = misPedidos.indexOf(item)
  misPedidos.splice(indice, 1)
  mostrarPedidos()
  
}

// FUNCION PARA BUSCAR POR NOMBRE
const bus = () =>{
  const busqueda = document.querySelector('#busquedaIngresada').value;
  const busquedaString = (busqueda.toString())

  const listaBusqueda = misPedidos.filter(p => p.cliente == busquedaString[0].toUpperCase() + busquedaString.substring(1))
  
  if(listaBusqueda){
caja.innerHTML = ""
  listaBusqueda.forEach(element => {
        const nodo = document.createElement("th");
        nodo.setAttribute("class", "table-danger d-block justify-content-between");
        nodo.innerHTML = `
<table class="table border-none ">
 
  <tbody >
          <tr class=" d-flex justify-content-between ">
            <td class="fw-normal  fs-8 col text-start ">#${element.pedido}</td>
            <td class="fw-normal fs-8 col text-start ">${element.fecha}</td>
            <td class="fw-normal fs-8 col text-start ">${element.cliente} ${element.apellido}</td>
            <td class="fw-normal fs-8 col text-start ">${element.importe}</td>
            <td class="fw-normal fs-8 col text-start ">${element.estado === "Completado"  ? '<p class="badge bg-success fs-7 fw-light">Completado</p>' : '<p class="badge bg-danger fs-7 fw-light">Pago pendiente</p>'}</td>
            <td> <button type="button" class="btn btn-danger col text-end " onclick="eliminarPedido(${element.id})" id="fs-8"><i class="fa-solid fa-trash "></i></button>
              </td>
          </tr>
        </tbody>

        `       
        caja.appendChild(nodo) 

    })
  }if(listaBusqueda == false){
      let mostrarmensaje = document.querySelector('#nohayresultados')
      mostrarmensaje.setAttribute ("class", "text-danger")
      let mostrarenlace = document.querySelector('#nohayresultadosenlace')
      mostrarenlace.setAttribute ("class", "text-danger")
      
    
  }
} 


const btnBusqueda = document.querySelector('#btnBusqueda')
btnBusqueda.addEventListener('click', ()=>{
  bus()
})




