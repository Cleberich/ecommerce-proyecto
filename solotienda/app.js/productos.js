// CONSTRUCTOR
class Producto{
  constructor(id, nombre, categoria, descripcion, precio, imagen, stock){
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
      this.stock = stock
}}

// ARRAY 

let misProductos = [
  {id: 8,nombre: "Notebook Asus", categoria: "notebook", precio: 1500, imagen: "https://servicios.zonatecno.com.uy/productos/Notebook_Gamer_Lenovo_i5_256GB_8GB_GTX_1650_CON_REGALO_tab_1.png", stock: 10},
    {id: 7,nombre: "Macbook Pro", categoria: "notebook", precio: 2690, imagen: "https://servicios.zonatecno.com.uy/productos/Notebook_Apple_MacBook_Pro_2020_MYD82LL_M1_256GB_8GB_S.Gray_tab_1.png", stock: 24},
    {id: 6,nombre: "Macbook Air", categoria: "notebook", precio: 1800, imagen: "https://servicios.zonatecno.com.uy/productos/Notebook_Apple_MacBook_Air_2017_MQD42LL_A_i5_256GB_8GB_tab_1.png", stock: 0},
    {id: 5,nombre: "Iphone 11", categoria: "celulares", precio: 990, imagen: "https://servicios.zonatecno.com.uy/productos/Celular_Apple_iPhone_11_2020_64GB_4GB_Green_tab_1.png", stock: 11},
    {id: 4,nombre: "Iphone 13", categoria: "celulares", precio: 1280, imagen: "https://servicios.zonatecno.com.uy/productos/Celular_Apple_iPhone_13_128GB_4GB_Blue_tab_1.png", stock: 7},
    {id: 3,nombre: "Samsung A03S", categoria: "celulares", precio: 240, imagen: "https://servicios.zonatecno.com.uy/productos/Celular_Samsung_Galaxy_A03s_SM-A037M_64GB_4GB_Black_DS_tab_1.png", stock: 3},
    {id: 2,nombre: "Samsung A12", categoria: "celulares", precio: 200, imagen: "https://servicios.zonatecno.com.uy/productos/Celular_Samsung_Galaxy_A03s_SM-A037M_64GB_4GB_White_DS_tab_1.png", stock: 0},
    {id: 1,nombre: "Notebook Levono", categoria: "notebook", precio: 1290, imagen: "https://servicios.zonatecno.com.uy/productos/Notebook_Lenovo_i3-10110U_128GB_1TB_8GB_14_MOCHILA_REGALO_tab_1.png", stock: 9},
   
]
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('misProductos')){
      misProductos = JSON.parse(localStorage.getItem('misProductos'))
      actualizarLista()
      
  }
})

// CAPTURAR DATOS
// const idProducto = document.getElementById('id')
// const nombreProducto = document.getElementById('nombre')
// const descripcionProducto = document.getElementById('descripcion')
// const precioProducto = document.getElementById('precio')
// const precioOProducto = document.getElementById('precioO')
// const imagenProducto = document.getElementById('imagen')
// const cantidadProducto = document.getElementById('cantidad')
const agregar = document.getElementById('botonAgregarNuevo')
const principal2 = document.querySelector('#principal2')
const productosHome = document.querySelector('#productosHome')


// FUNCIONES
const capturarDatos = () => {
  let id = parseInt(document.querySelector('#idP').value)
  let nombre = document.querySelector('#nombrep').value;
  let categoria = document.querySelector('#categoriap').value;
  let descripcion = document.querySelector('#descripcionp').value;
  let precio = parseInt(document.querySelector('#preciop').value);
  let imagen = document.querySelector('#imagenp').value;
  let stock = document.querySelector('#stockp').value;
  
  let nuevo = new Producto(id, nombre,categoria, descripcion, precio, imagen, stock)
  misProductos.unshift(nuevo)
  actualizarLista()

  Swal.fire(
    'Muy bien',
    'Producto agregado correctamente!',
    'success'
  )
  
}



  const actualizarLista = () => {
      principal2.innerHTML = ``
      misProductos.forEach((prod)=> {
          const div = document.createElement("div")
          cuotas = Math.round(prod.precio / 12)
          santander = Math.round(prod.precio * 0.85)
          
          div.innerHTML = `
          <table class="table border-none ">
 
          <tbody >
                  <tr class=" d-flex justify-content-between">
                    <td class="fw-normal  fs-8 col text-start "><img src="${prod.imagen}"class="card-img-top w-25" alt="card-grid-image"</td>
                    <td class="fw-normal fs-8 col text-start ">#${prod.id}</td>
                    <td class="fw-normal fs-8 col text-start ">${prod.nombre}</td>
                    <td class="fw-normal fs-8 col text-start ">${prod.precio}</td>
                    <td class="fw-normal fs-8 col text-start ">${prod.categoria}</td>
                    <td class="fw-normal fs-8 col text-start ">${prod.stock > 0  ? '<p class="badge bg-success fs-7 fw-light">Disponible</p>' : '<p class="badge bg-danger fs-7 fw-light">Agotado</p>'}<p class="badge bg-secondary fw-light fs-7">${prod.stock} unidades</p></td>
                    <td> 
                    <button type="button" class="btn btn-outline-success  col text-end" onclick="cargarStock(${prod.id})" id="fs-8"><i class="fa-solid fa-plus text-dark"></i></button>
                     <button type="button" class="btn btn-outline-warning col text-end" onclick="disminuirStock(${prod.id})" id="fs-8"><i class="fa-solid fa-minus text-dark"></i></button>
                    <button type="button" class="btn btn-danger col text-end" onclick="eliminarDelaLista(${prod.id})" id="fs-8"><i class="fa-solid fa-trash"></i></button>               
                      </td>
                  </tr>
                </tbody>
                  ` 
      principal2.appendChild(div)
   
      

      localStorage.setItem('misProductos', JSON.stringify(misProductos))
      })
      
  }
  actualizarLista();
  // const actualizarListaHome = () => {
  //   productosHome.innerHTML = ""
  //     misProductos.forEach((prod)=> {
  //         let nodo = document.createElement("card");
  //       cuotas = Math.round(prod.precio / 12)
  //       santander = Math.round(prod.precio * 0.85)
  //       nodo.setAttribute("class","card m-3");
  //       nodo.innerHTML = `<img src="${prod.imagen}" class="card-img-top" alt="card-grid-image"</img
  //                        <h5 class="card-title">${prod.nombre}</h5>
  //                         <span>U$S <b>${prod.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
  //                         <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
  //                         <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
  //                         <button class="btn btn-dark fs-8 mt-2 w-100" id="${prod.id}" >Agregar al carrito</button><br>
                          
  //                         <p class="text-success text-card my-2"><b><i class="fa-solid fa-truck-fast"></i> Envíos a todo el país</b></p>                            
  //       `
  //                 productosHome.appendChild(nodo)
   
      

      
  //     })
      
  // }
  // actualizarListaHome()
  // const actualizarHome = () => {
  //     productosHome.innerHTML = ""
  //     misProductos.forEach((prod)=> {
  //       let nodo = document.createElement("card");
  //       cuotas = Math.round(prod.precio / 12)
  //       santander = Math.round(prod.precio * 0.85)
  //       nodo.setAttribute("class","card m-3");
  //       nodo.innerHTML = `<img src="${prod.imagen}" class="card-img-top" alt="card-grid-image"</img
  //                        <h5 class="card-title">${prod.nombre}</h5>
  //                         <span>U$S <b>${prod.precio}</b><img class="w-25" src="https://tiendamia.com/skin/frontend/traigo/traigo/images/express_item.png"</span><br>
                          
  //                         <p class="text-primary  text-card my-2">Hasta en 12 cuotas de usd ${cuotas} con <img src="https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg" width="20px"</p>  
  //                         <p class="text-danger fw-ligth text-de">U$S <b>${santander}</b> con <img class="align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" width="65px"</p>
  //                         <button class="btn btn-dark fs-8 mt-2 w-100" id="${prod.id}" >Agregar al carrito</button><br>
                          
  //                         <p class="text-success text-card my-2"><b><i class="fa-solid fa-truck-fast"></i> Envíos a todo el país</b></p>                            
  //       `
  //       productosHome.appendChild(nodo)
   
  
  //     })
  // }
  
  
  // actualizarHome()
  
  //  ELIMINAR 
  const eliminarDelaLista = (prodId) => {
      const item = misProductos.find((prod) => prod.id === prodId)
      const indice = misProductos.indexOf(item)
      misProductos.splice(indice, 1)
      
      
      actualizarLista()
      
      
  }
  //  CARGAR STCOK 
  const cargarStock = (prodId) => {
      const item = misProductos.find((prod) => prod.id === prodId)
      const indice = misProductos.indexOf(item)
      item.stock ++
      
      actualizarLista()
  }
  //  RESTAR STOCK
  const disminuirStock = (prodId) => {
      const item = misProductos.find((prod) => prod.id === prodId)
      const indice = misProductos.indexOf(item)
      if(item.stock > 0){
        item.stock --
      }
      
      
      
      actualizarLista()
  }
 
// LISTENERS
agregar.addEventListener("click", capturarDatos)




