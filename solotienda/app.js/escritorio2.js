// DATOS DE LA TABLA DE ESCRITORIO

let cantidadLabel = [],productoLabel = []
    
const getDummyData2 = async () =>{
    try {
        const response = await fetch("/json/productosvendidos.json")
        const barChartData2 = await response.json()
        const producto = barChartData2.map((x)=> x.producto)
        const cantidad = barChartData2.map((x)=> x.cantidad)
    
    
        productoLabel = producto
        cantidadLabel = cantidad
        dummyChart2()
    } catch (error) {
        console.log(error);
    }finally{
        console.log('carga finalizada Productos mas vendidos');
    }
}

async function dummyChart2 () {
    
    let ctx = document.getElementById('myChart2').getContext('2d');
    let myChart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: productoLabel,
            datasets: [{
                label: 'Pedidos',
                data: cantidadLabel,
                backgroundColor: '#F77EA4'
            },
            {
                label: 'producto',
                data: productoLabel,
                backgroundColor: 'green'
            }
            ]
        },
        
        options: {}
        
    });
    
    }
    
    getDummyData2()