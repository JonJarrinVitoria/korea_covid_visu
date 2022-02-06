function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/pie_tallas.csv",
function(error, datos){
    if(error) throw error;

    datos.forEach(function(d){;
        d.porcentaje = +d.Porcentaje;
    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }

paleta = ['#A7A2A0', '#C1C1EC', '#E2C8B6', '#E4DFDD', '#BAC7E7', '#DBDBD1', '#edede9','#FAF1DC', '#FFEBFF', '#FEFAE0']
// Definir gráficos
var data = [{
  values: unpack(datos, 'Porcentaje'),
  labels: unpack(datos, 'Tallas'),
  marker: {colors: paleta},
  domain: {column: 0},
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
}];

var layout = {
  title: 'Porcentaje de cantidad de tallas',
  annotations: [
    {
      font: {
        size: 20
      },
      showarrow: false,
      text: 'Tallas',
      x: 0.5,
      y: 0.5
    }]
 };

Plotly.newPlot('pie_tallas', data, layout)})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );