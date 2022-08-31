function olvide () {
    Swal.fire(
        'Si no puedes recordar tu contraseña',
        'Ponte en contacto con soporte',
        
      )
}



class Personas {
  constructor(nombreUsuario, contraseña) {
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;
    
  }
}

let arrayPersonas = [
  {nombreUsuario: "Cleber", contraseña: "admin"}
]

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('arrayPersonas')){
    arrayPersonas = JSON.parse(localStorage.getItem('arrayPersonas'))
    
      
  }
})



function consultar (){

let valorBuscado = document.getElementById('nombre').value
let contraseñaIngresada = document.getElementById('contraseña').value


  const resultado = arrayPersonas.find(persona => persona.nombreUsuario === valorBuscado )
  const validacion = arrayPersonas.find(persona => persona.contraseña === contraseñaIngresada)
  if(resultado === undefined){
    
    Swal.fire(
      `${valorBuscado} no es un usuario válido`
      
    )
  }else {
    if(validacion){
      window.location.href ="/escritorio.html"
    
      
    }else {
      Swal.fire(
        `${valorBuscado} la contraseña ingresada es incorrecta, vuelve a intentarlo`
        
      )
      
      
    }
   
  }localStorage.setItem('arrayPersonas', JSON.stringify(arrayPersonas))
}

const boton = document.querySelector('#consultar')
boton.addEventListener("click", consultar)



         