function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/prendas_arana.csv",
function(error, datos){
    if(error) throw error;

    datos.forEach(function(d){;
        d.porcentaje = +d.porcentaje;
    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }

// Definir gráficos
data = [{
    type: 'scatterpolar',
    r:  unpack(datos,'porcentaje'),
    theta: unpack(datos,'family_product'),
    fill: 'toself',
    marker: {
      color: '#BAC7E7'
    }
}]
  
  layout = {
    title: 'Categorías más vendidas',
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 15]
      }
    },
    showlegend: false
  }
  
  Plotly.newPlot("arana", data, layout)})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );