// DATOS DE LA TABLA DE ESCRITORIO
// let ctx = document.getElementById("myChart").getContext("2d");
// let myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: [
//       "Enero",
//       "julio",
//       "Marzo",
//       "Abril",
//       "Mayo",
//       "Junio",
//       "Julio",
//     ],
//     datasets: [
//       {
//         label: "",
//         data: [0, 29000, 31670, 27980, 46987, 38650, 57890],
//         backgroundColor: "rgba(153,205,1,0.7)",
//         borderColor: 'rgb(255, 99, 132)',
//       },
//       {
//         label: "",
//         data: [2, 2, 5, 5, 2, 1, 10],
//         backgroundColor: "rgba(155,153,10,0.6)",
//       },
//     ],
//   },
// });
let fechaLabel = [],importeLabel = []
    
const getDummyData = async () =>{
    try {
        const response = await fetch("/json/pedidos.json")
        const barChartData = await response.json()
        const fecha = barChartData.map((x)=> x.fecha)
        const importe = barChartData.map((x)=> x.importe)
    
    
        fechaLabel = fecha
        importeLabel = importe
        dummyChart()
    } catch (error) {
        console.log(error);
    }finally{
        console.log('carga finalizada ventas');
    }
}

async function dummyChart () {
    
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fechaLabel,
            datasets: [{
                label: 'Pedidos',
                data: importeLabel,
                backgroundColor: 'red'
            },
            {
                label: 'Fechas',
                data: fechaLabel,
                backgroundColor: 'blue'
            }
            ]
        },
        
        options: {}
        
    });
    
    }
    
    getDummyData()


    const tabla = document.querySelector('#tabla');


    const mostraTabla2 = async () =>{
        const response = await fetch("/json/productosvendidos.json")
        let result = await response.json();
        tabla.innerHTML = ""
        result.forEach(producto =>{
        const nodo = document.createElement("th");
        nodo.setAttribute("class", "table-danger d-block justify-content-between");
        nodo.innerHTML = `
  <table class="table border-none ">
  
  <tbody >
          <tr class=" d-flex justify-content-between ">
            <td class="fw-normal  fs-8 col text-start ">${producto.producto}</td>
            <td class="fw-normal fs-8 col text-end  ">${producto.click}</td>
           
          </tr>
        </tbody>
  
        ` 
        tabla.appendChild(nodo) 
    })  
    }
    mostraTabla2()


    const ordernarTabla = async () =>{

        const response = await fetch("/json/productosvendidos.json")
        let resultado = await response.json();
        result = resultado.reverse()
        tabla.innerHTML = ""
        result.forEach(producto =>{
           
        const nodo = document.createElement("th");
        nodo.setAttribute("class", "table-danger d-block justify-content-between");
        nodo.innerHTML = `
  <table class="table border-none ">
  
  <tbody >
          <tr class=" d-flex justify-content-between ">
            <td class="fw-normal  fs-8 col text-start ">${producto.producto}</td>
            <td class="fw-normal fs-8 col text-end  ">${producto.click}</td>
           
          </tr>
        </tbody>
  
        ` 
        tabla.appendChild(nodo) 
    })  
    }


    const spanVentas = document.querySelector('#spanVentas')
    
    const tiempo = document.querySelector('#meses')
    const tiempo2 = document.querySelector('.nom')
    
    // VENTAS

    const ventasEnero = async () =>{
        spanVentas.innerHTML = ""
        const response = await fetch("http://127.0.0.1:5502/json/ventas.json");
        const resultado = await response.json();
        let result = tiempo.value
        if(result == "enero"){
            enero = (resultado.filter((x) => x.enero))
            enero.forEach(x =>{
                spanVentas.innerHTML = `$${x.enero}`
            })
            
        }
        if(result == "febrero"){
            febrero = (resultado.filter((x) => x.febrero))
            febrero.forEach(x =>{
                spanVentas.innerHTML = `$${x.febrero}`
            })
            
        }
        if(result == "febrero"){
            febrero = (resultado.filter((x) => x.febrero))
            febrero.forEach(x =>{
                spanVentas.innerHTML = `$${x.febrero}`
            })
            
        }
        if(result == "marzo"){
            marzo = (resultado.filter((x) => x.marzo))
            marzo.forEach(x =>{
                spanVentas.innerHTML = `$${x.marzo}`
            })
            
        }
        if(result == "abril"){
            abril = (resultado.filter((x) => x.abril))
            abril.forEach(x =>{
                spanVentas.innerHTML = `$${x.abril}`
            })
            
        }
        if(result == "mayo"){
            mayo = (resultado.filter((x) => x.mayo))
            mayo.forEach(x =>{
                spanVentas.innerHTML = `$${x.mayo}`
            })
            
        }
        if(result == "junio"){
            junio = (resultado.filter((x) => x.junio))
            junio.forEach(x =>{
                spanVentas.innerHTML = `$${x.junio}`
            })
            
        }
        if(result == "julio"){
            julio = (resultado.filter((x) => x.julio))
            julio.forEach(x =>{
                spanVentas.innerHTML = `$${x.julio}`
            })
            
        }
    //   console.log(result)
    //   if(result == "enero")
    //   spanVentas.innerHTML = resultado.enero
  
    }
