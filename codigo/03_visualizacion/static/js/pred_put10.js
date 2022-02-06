function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/master/df_colores.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){
        
        d.count_9 = +d.count_9;
        d.color_9 =  d.color_9;
        
        d.color_8 = d.color_8;
        d.count_8 = +d.count_8;
        d.color_7 = d.color_7;
        d.count_7 = +d.count_7;
    })

    
    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }


    var colores = [{
        type: 'bar',
        name: '7',
        x:  unpack(datos, 'color_9'),
        y:  unpack(datos, 'count_7'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: '8',
        x:  unpack(datos, 'color_8'),
        y:  unpack(datos, 'count_8'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: '9',
        x:  unpack(datos, 'color_7'),
        y:  unpack(datos, 'count_9'),
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
                
    }]

    var updatemenus = [{
        buttons: [
            {
                args : [{'visible': [true, false, false]},
                        {title : 'Verano'}],
                label : 'Veran.',
                method : 'update',
                marker : {
                    color : '#F4A261'
                }
            },        
            {
            args : [{'visible': [false, true, false]},
                    {title : 'Invierno'}],
            label : 'Inv.',
            method : 'update',
            marker : {
                color : '#F4A261'
            }
        },
        {
            args : [{'visible': [false, false, true]},
                    {title : 'Primavera/Otoño'}],
            label : 'Prim./Oto.',
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
            text : 'Colores mas poulares', 
            font : {
                color : 'black',
                size : 20,
                family : 'Arial',
                style : 'bold'
            }
        },
        showlegend: false,
        updatemenus: updatemenus,
        xaxis: {
            font : {
                color : 'black'},
          title: 'Colores',
        },
        yaxis: {
            title : 'Popularidad',
            font : {
                color : 'black'
            },
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('pred_put7', colores, layout0)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );