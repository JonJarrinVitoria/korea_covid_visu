# Reto10 Rojo Lookiero

Este proyecto da respuesta a la problemática propuesta por la empresa de moda Lookiero.

El repositorio cuenta con una carpeta principal: reto10_rojo.
Además de este archivo README existen varias carpetas (codigo y datos).

La carpeta datos, a su vez, contiene dos carpetas en su interior: 
 
--> Datos:
 
  - datos_originales: los datos proporcionados por la empresa
  - datos_desarrolados: los datos creados para poder llevar a cabo el desarrollo
      
--> Código:

La carpeta codigo incluye los scripts de Python con los que se ha desarollado el proyecto. La estructura de las carpetas de Drive y la carga de los datos de los diferentes scripts permiten ejecutar el codigo completo sin realizar ninguna modificación previa. Al ejecutar dichos scripts, como se acaba de mencionar, se generan automaticamente los nuevos ficheros csv. 


  - 00) EDA: El análisis exploratorio de los datos que se ha llevado a cabo
   
    - 00_01_analisis_inicial.ipynb
    - 00_02_analisis_final.ipynb
    - 00_03_graph_generator.ipynb
    
  - 01) Modelling: El proceso de modelado para dar respuesta a los objetivos planteados
    
    (Notebooks)
    - 01_01_graph_stats.ipynb  
    - 01_02_link_prediction.ipynb  
  
    (Archivos .py)
    AnonymousWalkEmbeddings.py
    AnonymousWalkKernel.py
    
    
  - 02) Tendencias: Lo necesario llevar a cabo el análisis del ámbito de marketing
    
    - 02_01_cartera_productos
    - 02_02_best_sellers
    - 02_03_productos_locomotores
    
  - 03) Visualización: El dashboard creado para visualizar los procesos del reto
    
   - servidor_data
   - template
     (los archivos .html)
   - satict
      - graficos
      - iconos
      - img
      - js  
  
  - servidor.py

## Autores del equipo rojo:

- Beñat Basabe
- Jon Jarrin
- June Pagaldai
- Daniel Puente
- Eneko Renteria
