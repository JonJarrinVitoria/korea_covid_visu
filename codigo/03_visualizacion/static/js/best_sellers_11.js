function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/master/tendencias.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){
        
        d.producto_tronco_entero = d.producto_tronco_entero;
        d.count_tronco_entero =  +d.count_tronco_entero;

        d.producto_tronco_superior_interior = d.producto_tronco_superior_interior;
        d.count_tronco_superior_interior =  +d.count_tronco_superior_interior;

        d.producto_mochila = d.producto_mochila;
        d.count_mochila =  +d.count_mochila;

        d.producto_tronco_superior_exterior = d.producto_tronco_superior_exterior;
        d.count_tronco_superior_exterior =  +d.count_tronco_superior_exterior;

        d.producto_tronco_inferior = d.producto_tronco_inferior;
        d.count_tronco_inferior =  +d.count_tronco_inferior;

        d.producto_bufanda = d.producto_bufanda;
        d.count_bufanda =  +d.count_bufanda;

    })

    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }


    var colores = [{
        type: 'bar',
        name: 'tronco_entero',
        x:  unpack(datos, 'producto_tronco_entero'),
        y:  unpack(datos, 'count_tronco_entero'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: 'tronco_superior_interior',
        x:  unpack(datos, 'producto_tronco_superior_interior'),
        y:  unpack(datos, 'count_tronco_superior_interior'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: 'mochila',
        x:  unpack(datos, 'producto_mochila'),
        y:  unpack(datos, 'count_mochila'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: 'tronco_superior_exterior',
        x:  unpack(datos, 'producto_tronco_superior_exterior'),
        y:  unpack(datos, 'count_tronco_superior_exterior'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },
    {
        type: 'bar',
        name: 'tronco_inferior',
        x:  unpack(datos, 'producto_tronco_inferior'),
        y:  unpack(datos, 'count_tronco_inferior'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: 'bufanda',
        x:  unpack(datos, 'producto_bufanda'),
        y:  unpack(datos, 'count_bufanda'),
        marker : {
            color : ['#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    }]

    var updatemenus = [{
        buttons: [
            {
                args : [{'visible': [true, false, false, false, false, false]},
                        {title : 'Tronco entero'}],
                label : 'Tronco entero',
                method : 'update',

            },        
            {
                args : [{'visible': [false, true, false, false, false, false]},
                        {title : 'Tronco superior interior'}],
                label : 'Tronco superior interior',
                method : 'update',
                marker : {
                    color : '#F4A261'
                }
            },
            {
                args : [{'visible': [false, false, true, false, false, false]},
                        {title : 'Mochila'}],
                label : 'Mochila',
                method : 'update',
                marker : {
                    color : '#F4A261'
                }
            },
            {
                args : [{'visible': [false, false, false, true, false, false]},
                        {title : 'Tronco superior exterior'}],
                label : 'Tronco superior exterior',
                method : 'update',
                marker : {
                    color : '#F4A261'
                }
            },
            {
                args : [{'visible': [false, false, false, false, true, false]},
                        {title : 'Tronco inferior'}],
                label : 'Tronco inferior',
                font : {
                    color : 'black',
                    size : 20,
                    family : 'Arial',
                    style : 'bold'
                    
                },
                method : 'update',
                marker : {
                    color : '#F4A261'
                }
            },
            {
                args : [{'visible': [false, false, false, false, false, true]},
                        {title : 'Bufanda'}],
                label : 'Bufanda',
                method : 'update',
                marker : {
                    color : '#F4A261'
                }
            }
    ],
    x: 0,
    xanchor: 'left',
    y: 1.1,
    yanchor: 'top',}]
    

    var layout0 = {
        title : {
            text : 'Top 10 best sellers por línea de producto', 
        },
        showlegend: false,
        updatemenus: updatemenus,
        xaxis: {
          title: 'Líneas de productos',
        },
        yaxis: {
            title : 'Popularidad',
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('best_sellers_8', colores, layout0)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );