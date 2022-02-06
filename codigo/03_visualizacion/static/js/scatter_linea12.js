function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/scatter_linea.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){
        d.family_product = d.family_product;
        d.envios = +d.envios;
        d.ventas = +d.ventas;


    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }
    var heat_tasa_aceptacion = [{

        type: 'scatter',
        name: 'Productos',
        mode: 'markers+text',
        y: unpack(datos, 'ventas'),
        x: unpack(datos, 'envios'),
        text: unpack(datos, 'family_product'),
        textposition: 'right',
        marker: { 
            size: 12,
            color: '#C1C1EC' }
 
    },
    {
        type: 'scatter',
        mode: 'lines+text',
        name: 'Línea ideal (envíos = ventas)',
        x: [0,  1000000, 1550000],
        y: [0,  1000000, 1550000],
        text: ['', '', ''],
        textposition: 'top',
        line: {
            color: 'black',
            dash: 'dashdot'
          }

    }]



    var layoutH = {
        title : {
            text : 'Relación envío-ventas por producto', 
        },
        xaxis: {
          title: 'Envíos',
          tickangle: -45
        },
        showlegend : false, 
        yaxis: {
            title : 'Ventas',
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('scatter_linea', heat_tasa_aceptacion, layoutH)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );