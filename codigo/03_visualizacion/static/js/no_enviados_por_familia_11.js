function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/tasa_aceptacion_por_familia.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){
        
        d.family_product = d.family_product;
        d.total =  +d.total;
        d.no_enviados =  +d.no_enviados;
        d.porcentaje =  +d.porcentaje;

    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }

    console.log(unpack(datos, 'family_product'));
    console.log(unpack(datos, 'porcentaje'));
    var colores2 = [{
        type: 'bar',
        name: 'tronco_entero',
        x:  unpack(datos, 'family_product'),
        y:  unpack(datos, 'porcentaje'),
        marker : {
            color : ['#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E4DFDD', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#A7A2A0', '#E4DFDD']
        }
    }]



    var layout1 = {
        title : {
            text : 'Porcentaje de no enviados por familia', 
        },
        showlegend: false,
        xaxis: {
          title: 'Líneas de productos',
        },
        yaxis: {
            title : 'Porcentaje de no enviados',
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('no_enviados_por_familia_1', colores2, layout1)
});
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );