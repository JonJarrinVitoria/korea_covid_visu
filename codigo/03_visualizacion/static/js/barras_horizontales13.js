function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/barras_horizontales.csv",
function(error, datos){
    if(error) throw error;

    datos.forEach(function(d){;
        d.Jacket = +d.Jacket;
        d.Pant = +d.Pant;
        d.Sweater = +d.Sweater;
        d.Top = +d.Top;
        d.Tshirt = +d.Tshirt;
    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }

// Definir gráficos
var data = [{
  x: unpack(datos, 'Jacket'),
  y: unpack(datos, 'origin_brand'),
  name: 'Jacket',
  orientation: 'h',
  marker: {
    color: '#A7A2A0',
    width: 1
  },
  type: 'bar'
},
{
  x: unpack(datos, 'Pant'),
  y: unpack(datos, 'origin_brand'),
  name: 'Pant',
  orientation: 'h',
  type: 'bar',
  marker: {
    color: '#C1C1EC',
    width: 1
  }
},
{
  x: unpack(datos, 'Sweater'),
  y: unpack(datos, 'origin_brand'),
  orientation: 'h',
  name: 'Sweater',
  type: 'bar',
  marker: {
    color: '#E2C8B6',
    width: 1
  }
},
{
  x: unpack(datos, 'Top'),
  y: unpack(datos, 'origin_brand'),
  orientation: 'h',
  name: 'Top',
  type: 'bar',
  marker: {
    color: '#E4DFDD',
    width: 1
  }
},
{
  x: unpack(datos, 'Tshirt'),
  y: unpack(datos, 'origin_brand'),
  orientation: 'h',
  name: 'T-shirt', 
  type: 'bar',
  marker: {
    color: '#BAC7E7',
    width: 1
  }
}];

var layout = {
  title: 'Productos por origen de marca',
  barmode: 'stack',
  xaxis: {title: 'Porcentaje (%)'},
  yaxis:{
    tickangle: -45,  
    tickfont: {
      size: 10
    }}
};

Plotly.newPlot('barras_horizontales', data, layout);})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );