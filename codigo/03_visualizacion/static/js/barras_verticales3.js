function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/barras_familias.csv",
function(error, datos){
    if(error) throw error;

    datos.forEach(function(d){;
        d.Cantidad = +d.Cantidad;
    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }

// Definir gráficos
var data = [{
  x: unpack(datos, 'Productos'),
  y: unpack(datos, 'Cantidad'),
  type: 'bar',
  text: unpack(datos, 'Productos'),
  marker: {color: '#BAC7E7'}
}];

var layout = {
  title: 'Productos más populares',
  showlegend: false,
  xaxis: {
    title: 'Familias de producto',
    tickangle: -45
  },
  yaxis: {
    title: 'Cantidad',
    zeroline: false
  },
  bargap :0.05
};

Plotly.newPlot('barras_verticales', data, layout);})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );
