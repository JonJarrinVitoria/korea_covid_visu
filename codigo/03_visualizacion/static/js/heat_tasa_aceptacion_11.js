function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/heatmap.csv",

function(error, datos){
    if(error) throw error;

    datos.forEach(function(d){

        d.bag = +d.bag;
        d.cardigan =  +d.cardigan;
        d.coat = +d.coat;
        d.dress = +d.dress;
        d.jacket = +d.jacket;
        d.jeans = +d.jeans;
        d.jumpsuit = +d.jumpsuit;
        d.pant = +d.pant;
        d.parka = +d.parka;
        d.scarf = +d.scarf;
        d.shirt = +d.shirt;
        d.short = +d.short;
        d.skirt = +d.skirt;
        d.sweater = +d.sweater;
        d.sweatshirt = +d.sweatshirt;
        d.top = +d.top;
        d.trench = +d.trench;
        d.tshirt = +d.tshirt;

    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }

    var heat_tasa_aceptacion = [{

        type: 'heatmap',
        name: 'tronco_entero',
        colorscale: [['0.0', '#D6DDF0'] ,['0.14285714285714285', '#D2DAEF'], ['0.2857142857142857', '#BAC7E7'], ['0.42857142857142855', '#B6C3E2'], ['0.5714285714285714', '#A9B5D2'], ['0.7142857142857142', '#A2ADC9'], ['0.8571428571428571', '#9AA5BF'], ['1.0', '#8C96AE']],
        x:  ['UNQ', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'X4XL'],
        y:  ['tshirt', 'trench', 'top', 'sweatshirt', 'sweater', 'skirt', 'short', 'shirt', 'scarf', 'parka', 'pant', 'jumpsuit', 'jeans', 'jacket', 'dress', 'coat', 'cardigan', 'bag'],
        z: [unpack(datos, 'bag'), unpack(datos, 'cardigan'), unpack(datos, 'coat'), unpack(datos, 'dress'), unpack(datos, 'jacket'), unpack(datos, 'jeans'), unpack(datos, 'jumpsuit'), unpack(datos, 'pant'), unpack(datos, 'parka'), unpack(datos, 'scarf'), unpack(datos, 'shirt'), unpack(datos, 'short'), unpack(datos, 'skirt'), unpack(datos, 'sweater'), unpack(datos, 'sweatshirt'), unpack(datos, 'top'), unpack(datos, 'trench'), unpack(datos, 'tshirt')],

    }]

    var layoutH = {
        title : {
            text : 'Tasa de aceptación por producto y talla', 
        },
        showlegend: false,
        xaxis: {
          title: 'Tallas',
        },
        yaxis: {
            title : 'Productos',
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };

    Plotly.newPlot('heat_tasa_aceptacion_6', heat_tasa_aceptacion, layoutH)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );