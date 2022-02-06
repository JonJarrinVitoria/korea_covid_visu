function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/scatter_largo.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){

        d.color = d.color;
        d.total = +d.total;
        d.sweater = +d.sweater;
        d.tshirt = +d.tshirt;


    })

    console.log(unpack(datos, 'color'));
    console.log(unpack(datos, 'total'));

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }


    var heat_tasa_aceptacion = [{

        type: 'scatter',
        name: 'tronco_entero',
        mode: 'markers',
        y: unpack(datos, 'sweater'),
        x: unpack(datos, 'color'),
        marker: { 
            size: 12,
            color: ['#F0E3DA', '#F0E3DA', '#F0E3DA','#F0E3DA','#F0E3DA','#F0E3DA','#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA', '#F0E3DA',  '#EFE0D6', '#EFE0D6', '#EFE0D6', '#EFE0D6', '#EDDDD2', '#EDDDD2', '#EDDDD2','#EDDDD2','#EBDACD', '#EBDACD', '#EBDACD', '#EBDACD', '#E9D6C6', '#E9D6C6', '#E9D6C6', '#E9D6C6', '#E7D2C3', '#E7D2C3', '#E7D2C3', '#E7D2C3', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#DDC4B2', '#DDC4B2', '#DDC4B2', '#DDC4B2', '#D8BFAE', '#D8BFAE', '#D8BFAE', '#D8BFAE', '#D8BFAE', '#D8BFAE', '#C4AE9E', '#C4AE9E', '#C4AE9E']}
 
    }]



    var layoutH = {
        title : {
            text : 'Sweater', 
        },
        showlegend: false,
        xaxis: {
          title: 'Tallas',
          tickangle: -45
        },
        yaxis: {
            title : 'Productos',
            font : {
                color : 'black'
            },
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('scatter_alargado_sweeter_1', heat_tasa_aceptacion, layoutH)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );