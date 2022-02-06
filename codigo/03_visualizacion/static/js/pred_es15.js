function dibujar(){
d3.csv("https://raw.githubusercontent.com/JonJarrinVitoria/visualizacion_rojo_reto10/master/df_prendas.csv",

function(error, datos){
    if(error) throw error;
    
    datos.forEach(function(d){
        
        d.count_9 = +d.count_9;
        d.prendas_9 =  d.prendas_9;
        
        d.prendas_8 = d.prendas_8;
        d.count_8 = +d.count_8;
        d.prendas_7 = d.prendas_7;
        d.count_7 = +d.count_7;
    })

    
    function unpack(datos, columna){
        return datos.map(function(fila){ return fila[columna]})
    }



    var prendas = [{
        type: 'bar',
        name: '7',
        x:  unpack(datos, 'prendas_7'),
        y:  unpack(datos, 'count_7'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: '8',
        x:  unpack(datos, 'prendas_8'),
        y:  unpack(datos, 'count_8'),
        visible : false,
        marker : {
            color : ['#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
        }
    },

    {
        type: 'bar',
        name: '9',
        x:  unpack(datos, 'prendas_9'),
        y:  unpack(datos, 'count_9'),
        marker : {
            color : ['#A7A2A0', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6', '#E2C8B6','#E2C8B6', '#E2C8B6']
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
                    color : '#F4A261)'
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
    yanchor: 'top',
}]
    

    var layout3 = {
        title : {
            text : 'Productos mas populares', 
        },
        showlegend: false,
        updatemenus: updatemenus,
        xaxis: {
          title: 'Prendas',
        },
        yaxis: {
            title : 'Popularidad',
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white'
      };
    
    Plotly.newPlot('pred_es21', prendas, layout3)
})
}

window.onload = dibujar();
window.addEventListener('resize', dibujar );
