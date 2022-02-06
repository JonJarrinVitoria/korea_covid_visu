function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/main/relacion_tallas_productos.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){

        d.L = +d.L;
        d.M =  +d.M;
        d.S =  +d.S;
        d.UNQ =  +d.UNQ;
        d.X4XL =  +d.X4XL;
        d.XL =  +d.XL;
        d.XS =  +d.XS;
        d.XXL =  +d.XXL;
        d.XXS =  +d.XXS;
        d.XXXL =  +d.XXXL;


    })

    console.log([unpack(datos, 'L'), unpack(datos, 'M'), unpack(datos, 'S')]);

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }


    var heat_tasa_aceptacion = [{

        type: 'heatmap',
        name: 'tronco_entero',
        colorscale: [['0.0', '#D6DDF0'] ,['0.14285714285714285', '#D2DAEF'], ['0.2857142857142857', '#BAC7E7'], ['0.42857142857142855', '#B6C3E2'], ['0.5714285714285714', '#A9B5D2'], ['0.7142857142857142', '#A2ADC9'], ['0.8571428571428571', '#9AA5BF'], ['1.0', '#8C96AE']],
        x:  ['Bag', 'Cardigan', 'Coat', 'Dress', 'Jacket', 'Jeans', 'Jumpsuit', 'Pant', 'Parka', 'Scarf', 'Shirt', 'Short', 'Skirt', 'Sweater', 'Sweatshirt', 'Top', 'Trench', 'Tshirt'],
        y:  ['XXXL', 'XXS', 'XXL', 'XS', 'XL', 'X4XL', 'UNQ', 'S', 'M', 'L'],
        z: [unpack(datos, 'L'), unpack(datos, 'M'), unpack(datos, 'S'), unpack(datos, 'UNQ'), unpack(datos, 'X4XL'), unpack(datos, 'XL'), unpack(datos, 'XS'), unpack(datos, 'XXL'), unpack(datos, 'XXS'), unpack(datos, 'XXXL')]
    }]



    var layoutH = {
        title : {
            text : 'Relacion entre tallas y productos', 
        },
        showlegend: false,
        xaxis: {
          title: 'Productos',
        },
        yaxis: {
            title : 'Tallas',
            font : {
                color : 'black'
            },
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('heat_relacion_talla_productos_4', heat_tasa_aceptacion, layoutH)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );