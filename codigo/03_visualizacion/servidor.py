######################################
############ LIBRERÍAS  ##############
######################################

from flask import Flask, render_template, request

import pickle

import numpy as np
np.random.seed(0)
import pandas as pd
from scipy import stats
import networkx as nx
import torch
from torch_geometric.utils import to_networkx, from_networkx, train_test_split_edges
import torch.nn as nn
from torch_geometric.nn import GCNConv, SAGEConv, GATConv
from random import randint, seed

app = Flask(__name__, template_folder = 'template')

######################################
############ FUNCIONES  ##############
######################################

dir_in = "./servidor_data/"

## PARA TERCERA FUNCIÓN
leaky = torch.nn.LeakyReLU()
soft_max = torch.nn.Softmax(dim=1)
sigmoid = torch.nn.Sigmoid()

def to_torch_graph(graph):
    G_torch = from_networkx(graph)
    G_torch.x = torch.tensor(G_torch.x, dtype=torch.float32)
    return G_torch

class Net(torch.nn.Module):
    def __init__(self, out_channels=16, type = 'GCNConv', graph_model = None):
        super(Net, self).__init__()

        if type == 'GCNConv': self.conv1 = GCNConv(np.shape(graph_model.x)[1], out_channels)
        if type == 'SAGEConv': self.conv1 = SAGEConv(np.shape(graph_model.x)[1], out_channels)
        if type == 'GATConv': self.conv1 = GATConv(np.shape(graph_model.x)[1], out_channels)

        self.fc2 = nn.Linear(out_channels * 2, 2)
    
    def encode(self, x, edge_index, activation = 'LeakyReLU'):
        x = self.conv1(x, edge_index) 

        if activation == 'LeakyReLU': activation_funct = torch.nn.LeakyReLU()
        if activation == 'Relu': activation_funct = torch.nn.ReLU()
        if activation == 'Swish': activation_funct = torch.nn.SiLU()

        x = activation_funct(x) 

        return x 

    def forward(self, z): 
        return soft_max(self.fc2(z))

## FUNCIÓN ABRIR PICKLES
def abrir_pikle(name):
    with open(dir_in + str(name) + '.pkl', 'rb') as fp: df = pickle.load(fp)
    return df

### FUNCIÓN COMPLETAR LOOK
def caracteristicas_tercero(name1, name2):

    try:
    
        indice1 = df_indices[df_indices['0']==name1].index
        indice2 = df_indices[df_indices['0']==name2].index
        print(name1, name2)
        print(indice1, indice2)
        if (len(indice1) == 0) | (len(indice2) == 0): return 'Alguna de las prendas no se encuentra en la misma base de datos.'
        
        else:
            vecinos1, vecinos2 = list(F.neighbors(indice1[0])), list(F.neighbors(indice2[0]))
            vecinos = vecinos1 + vecinos2
            colores, printed, style, premium = [F.nodes[x]['color'] for x in vecinos], [F.nodes[x]['printed'] for x in vecinos], [F.nodes[x]['style'] for x in vecinos], [F.nodes[x]['premium'] for x in vecinos]
        
        return stats.mode(colores)[0][0], stats.mode(printed)[0][0], stats.mode(style)[0][0], stats.mode(premium)[0][0]
    
    except: return 'No se ha podido realizar el cálculo, inténtelo de nuevo por favor.'

### FUNCIÓN SIMILARES
def nombre(name, z):
    relaciones = (z @ z.t())/(z.norm(dim = 1, keepdim = True) @ z.norm(dim = 1, keepdim = True).t())  
    try: 
        indice = df_indices[df_indices['0'] == name].index[0]
        relaciones_1 = np.array(relaciones[indice])
        return df_indices.iloc[np.argmax(relaciones_1[relaciones_1 != 1]), 0]

    except: 'La prenda no esta en la base de datos'

### FUNCIÓN CREAR LOOK
def looks_prenda(name, looks):
    try: 
        indice = df_indices[df_indices['0'] == name].index[0]
        listas = [x for x in looks if x[1][0] == indice]
        look_final = listas[np.argmax(np.array(listas)[:,0])][1]
        return df_indices.iloc[look_final, 0]
    
    except: return 'Esta prenda no tiene looks asociados según las reglas establecidas.'

model_G7_try = torch.load(dir_in + 'model_G7.pt')
model_G7_try.eval()

model_G8_try = torch.load(dir_in + 'model_G8.pt')
model_G8_try.eval()

model_G9_try = torch.load(dir_in + 'model_G9.pt')
model_G9_try.eval()

graph_model_7 = abrir_pikle('graph_model_7')
graph_model_8 = abrir_pikle('graph_model_8')
graph_model_9 = abrir_pikle('graph_model_9')

def api_nuevo_nodo_2(name):
    estacion = ['']
    estacion += [name]
    
    min = len(name) - len(estacion)
    maxim = max(0, len(name))

    min += (len(estacion) * 1 - len(name))
    maxim = 15
    np.random.seed(0)
    cantidad_looks = randint(min, maxim)

    return cantidad_looks

##### FUNCIÓN CUANTOS LOOKS
def api_nuevo_nodo(name = 'parka_bluedark_M_8_casual.street_smooth_NOPREMIUM'):
    estacion = name.split('_')[3]

    if estacion == '7': graph, graph_model, model = G7.copy(), graph_model_7, model_G7_try
    elif estacion == '8': graph, graph_model, model = G8.copy(), graph_model_8, model_G8_try
    else: graph, graph_model, model = G9.copy(), graph_model_9, model_G9_try

    try:

        indice1 = df_indices[df_indices['0']==name].index
        cantidad_looks = len(nx.find_cycle(graph, indice1))
        try:
            cantidad_looks = len(nx.find_cycle(graph, indice1))
            return cantidad_looks
        except:print('No hay ciclos')

    except:
        def actualizar_VN(graph):
            contador1, contador2, lista_variables = 0, 0, []
            for v in variables_usar:
                frecuencias  = abrir_pikle(graph.name + 'frecuencias_' + v)
                valor_aislados = sum([np.array(new_feautures[x]) for x in aislados])

                contador2 += len(frecuencias)
                colores_nuevos_2 = frecuencias + valor_aislados[contador1:contador2]
                contador1 += len(frecuencias)

                feauture_color_virtual_node = [0.0 if x != np.argmax(colores_nuevos_2) else 1.0 for x in range(len(colores_nuevos_2))]
                lista_variables += feauture_color_virtual_node
                
            return lista_variables

        def actualizar_G(position, G_renamed):

            muy_similares_no_aislador = set(maped_nodes_no_aislados).intersection(set(aa))
            grado = [G_renamed.degree[x] for x in list(muy_similares_no_aislador)]
            vecinos_al_mas_similar = list(G_renamed.neighbors(list(muy_similares_no_aislador)[np.argmax(grado)]))
            tuplas = [('new_node' + str(position), x) for x in [*map(mapeo_inverso.get, vecinos_al_mas_similar)]]

            return tuplas

        def actualizar_G_no_unico(position, G_renamed):
            cc = np.array(similitud_coseno[-15 + position])
            cc = cc[cc != 1]

            pepe = np.where(cc == cc.max())[0]
            pepe = pepe[pepe < graph_model.num_nodes]

            grado = [G_renamed.degree[k] for k in list(pepe)]
            vecinos_al_mas_similar = list(G_renamed.neighbors(list(pepe)[np.argmax(grado)]))
            tuplas = [('new_node' + str(position), k) for k in [*map(mapeo_inverso.get, vecinos_al_mas_similar)]]
            
            return tuplas
            
        print('La prenda no se encuentra en la base de datos')
        niveles = {'jumpsuit': '1.1', 
            'dress': '1.1',

            'jeans': '1.2',
            'skirt': '1.2',
            'short': '1.2',
            'pant': '1.2',

            'shirt': '2.1',
            'top': '2.1',
            'tshirt': '2.1',

            'sweater': '2.2',
            'sweatshirt': '2.2',
            'cardigan': '2.2',

            'trench': '3.1',
            'coat': '3.1',
            'parka': '3.1',
            'jacket': '3.1',

            'bag': '3.2',
            'scarf': '3.2'}

        size = name.split('_')[2]
        level = niveles[name.split('_')[0]]
        premium = name.split('_')[-1]
        color = name.split('_')[1]

        lista_variables = []
        var = ['color', 'size','level', 'premium']
        for k,v in enumerate([color, size, level, premium]):

            _model = abrir_pikle(graph.name + 'onehot_encoder_model_' + var[k])
            labelers = abrir_pikle(graph.name + 'label_encoder_'+ var[k])

            var_numeros = labelers.transform([v])
            integer_encoded = var_numeros.reshape(len(var_numeros), 1)
            onehot_encoded = _model.transform(integer_encoded)
            lista_variables += onehot_encoded[0].tolist()

        nodos_nuevos_torch = torch.tensor([lista_variables], dtype=torch.float32)
        new_feautures = torch.cat([graph_model.x, nodos_nuevos_torch] )
        similitud_coseno = (new_feautures @ new_feautures.t())/(new_feautures.norm(dim=1, keepdim=True) @ new_feautures.norm(dim=1, keepdim=True).t())  

        antiguos_nodos_ailados = ([x[1] for x in graph.edges('virtual')])
        nodes_no_aislados = list( set(set(list(graph.nodes())) - set(antiguos_nodos_ailados)) - set('virtual'))

        mapeo_nodos, mapeo_inverso = {y:x for x, y in enumerate(graph.nodes())}, {x:y for x, y in enumerate(graph.nodes())}

        maped_nodes_aislados = [*map(mapeo_nodos.get, antiguos_nodos_ailados)]
        maped_nodes_no_aislados = [*map(mapeo_nodos.get, nodes_no_aislados)]


        graph.add_node('new_node0', color = '',size  = '',level = '',color_parent = '',printed = '', style = '',premium = '',
                x = np.array(new_feautures[graph_model.num_nodes]))


        ambos, aislados, no_aislados, ambos_mal,tuplas_acumuladas = [], [], [], [], []
        G7_renamed = nx.relabel_nodes(graph, {v: k for k, v in enumerate(list(graph.nodes()))})

        aa = list(np.where(similitud_coseno[-1] >= 0.7)[0])

        if (len(set(maped_nodes_aislados).intersection(set(aa))) != 0) & (len(set(maped_nodes_no_aislados).intersection(set(aa))) != 0):
            ambos += [0]
            tuplas_acumuladas += actualizar_G_no_unico(0, G7_renamed)

        elif (len(set(maped_nodes_aislados).intersection(set(aa))) != 0) & (len(set(maped_nodes_no_aislados).intersection(set(aa))) == 0):
            aislados += [0]

        elif (len(set(maped_nodes_aislados).intersection(set(aa))) == 0) & (len(set(maped_nodes_no_aislados).intersection(set(aa))) != 0):
            no_aislados += [0]
            tuplas_acumuladas += actualizar_G(0, G7_renamed)

        else:
            ambos_mal += [0]
            aislados += [0]
            tuplas_acumuladas += actualizar_G_no_unico(0, G7_renamed)

        if len(aislados) != 0:
            graph.nodes['virtual']['x'] = np.array(actualizar_VN(graph))
            tuplas_virtuales = [('virtual', 'new_node0') for x in aislados]
        else: tuplas_virtuales = []

        graph.nodes()['new_node0']['x'] = graph.nodes()['new_node0']['x'].astype(np.float64)
        graph.add_edges_from(tuplas_virtuales + tuplas_acumuladas, weight = 1)

        net_torch = to_torch_graph(graph)
        new_emb = model.encode(net_torch.x, net_torch.edge_index)

        z = model.encode(graph_model.x, graph_model.edge_index)
        escaler = StandardScaler()
        z = torch.tensor(escaler.fit_transform(z.detach().numpy()), dtype=torch.float32)

        escalar_el_nuevo_nodo = torch.tensor([new_emb[-1].detach().numpy()], dtype=torch.float32)
        escalados = torch.tensor(escaler.transform(escalar_el_nuevo_nodo.detach().numpy()), dtype=torch.float32)
        tuplas_nuevas = []
        repetition = escalados.repeat(len(z), 1)
        pred_vector = torch.cat([repetition, z], dim = -1)

        y_pred = model.forward(pred_vector)
        _, y_pred = torch.max(y_pred, 1)
        tuplas_nuevas += [('new_node'+ str(0), x) for x in np.where(np.array(y_pred) == 1)[0]]

        graph.add_edges_from(tuplas_nuevas, weight = 1)
        print(nx.find_cycle(graph, 'new_node0'))
        cantidad_looks = len(nx.find_cycle(graph, 'new_node0'))
        return cantidad_looks


######################################
########### CARGA DATOS  #############
######################################

colores = pd.read_csv(dir_in + 'color.csv')
df_indices = pd.read_csv(dir_in + 'df_indices.csv')

G7 = abrir_pikle('G7')
G8 = abrir_pikle('G8')
G9 = abrir_pikle('G9')
F = nx.compose(G7,G8)
F = nx.compose(F,G9)

z_7 = abrir_pikle('z_7')
z_8 = abrir_pikle('z_8')
z_9 = abrir_pikle('z_9')

looks_array_7 = abrir_pikle('looks_array_G7')
looks_array_8 = abrir_pikle('looks_array_G8')
looks_array_9 = abrir_pikle('looks_array_G9')


######################################
############# PORTADA  ###############
######################################

@app.route('/')
def portada():
    return render_template('portada.html')

######################################
############# NAVEGADOR  #############
######################################

@app.route('/navegador', methods = ['POST', 'GET'])
def navegador():
        result = request.form
        print(result['boton_nav'])
        if result['boton_nav'] == 'Portada': return render_template('portada.html')
        elif result['boton_nav'] == 'Visión global': return render_template('vision_global.html')
        elif result['boton_nav'] == 'Contexto empresarial': return render_template('contexto_empresarial.html')
        elif result['boton_nav'] == 'Grafos y looks': return render_template('grafo_looks.html')
        else: print('algo va mal')

######################################
############ METER DATOS  ############
######################################

@app.route('/meter_datos')
def meter_datos():
    return render_template('grafo_looks.html')

######################################
############ RESULTADOS  #############
######################################

@app.route('/resultados', methods = ['POST', 'GET'])
def resultados():
    if request.method == 'POST':
        
        result = request.form
        
        if result['boton_submit'] == 'Completar look': 
            try:    
                ## PRENDA 1            
                familia1 = result['Familia1']
                color1 = str(colores.loc[colores.hexadecimal.str.upper() == result['Color1'].replace('#', '').upper(), 'name'].iloc[0])
                color1 = color1.replace('_', '')
                estilo1 = '.'.join(result.getlist('Estilo1'))
                talla1 = result['Talla1']
                estampado1 = result['Estampado1']
                temporada1 = result['Temporada1']
                premium1 = result['Premium1']
                
                features1 = '_'.join([familia1, color1, talla1, temporada1, estilo1, estampado1, premium1])
                
                # PRENDA2
                familia2 = result['Familia2']
                color2 = str(colores.loc[colores.hexadecimal.str.upper() == result['Color2'].replace('#', '').upper(), 'name'].iloc[0])
                color2 = color2.replace('_', '')
                estilo2 = '.'.join(result.getlist('Estilo2'))
                talla2 = result['Talla2']
                estampado2 = result['Estampado2']
                temporada2 = result['Temporada2']
                premium2 = result['Premium2']
                
                features2 = '_'.join([familia2, color2, talla2, temporada2, estilo2, estampado2, premium2])
                
                color, estampado, estilo, premium = caracteristicas_tercero(features1, features2)
                estilo = estilo.replace('.', '')
                prediccion = f'Posibles características para la tercera prenda: \n// Color: {color}\n// Estampado: {estampado}\n// Estilo: {estilo}\n// Premium: {premium}'
                prediccion1 = 'Rellene los campos de arriba, por favor'
            except: 
                prediccion = 'Por favor, procure que todos los campos estén bien rellenados.'
                prediccion1 = 'Rellene los campos de arriba, por favor'

        elif result['boton_submit'] == 'Obtener similares':
            
            try:
                ## PRENDA 1            
                familia1 = result['Familia1']
                color1 = str(colores.loc[colores.hexadecimal.str.upper() == result['Color1'].replace('#', '').upper(), 'name'].iloc[0])
                color1 = color1.replace('_', '')
                estilo1 = '.'.join(result.getlist('Estilo1'))
                talla1 = result['Talla1']
                estampado1 = result['Estampado1']
                temporada1 = result['Temporada1']
                premium1 = result['Premium1']
                
                prenda = '_'.join([familia1, color1, talla1, temporada1, estilo1, estampado1, premium1])

                if str(temporada1) == '7': emb = z_7
                elif str(temporada1) == '8': emb = z_8
                elif str(temporada1) == '9': emb = z_9

                familia, color, _, _, estilo, estampado, premium = nombre(prenda, emb).split('_')
                estilo = estilo.replace('.', ', ')
                prediccion = f'Las características de la prenda más similar son: Familia producto: {familia} // Color: {color} // Estampado: {estampado} // Estilo: {estilo} // Premium: {premium}'
                prediccion1 = 'Rellene los campos de arriba, por favor'

            except: 
                prediccion = 'Por favor, procure que todos los campos estén bien rellenados.'
                prediccion1 = 'Rellene los campos de arriba, por favor'
        
        elif result['boton_submit'] == 'Crear look':

            try:
                familia1 = result['Familia1']
                color1 = str(colores.loc[colores.hexadecimal.str.upper() == result['Color1'].replace('#', '').upper(), 'name'].iloc[0])
                color1 = color1.replace('_', '')
                estilo1 = '.'.join(result.getlist('Estilo1'))
                talla1 = result['Talla1']
                estampado1 = result['Estampado1']
                temporada1 = result['Temporada1']
                premium1 = result['Premium1']

                prenda = '_'.join([familia1, color1, talla1, temporada1, estilo1, estampado1, premium1])
                
                if str(temporada1) == '7': look = looks_array_7
                elif str(temporada1) == '8': look = looks_array_8
                elif str(temporada1) == '9': look = looks_array_9

                ropa1 = looks_prenda(prenda, look).reset_index(drop = True)[0].replace('_', ', ').replace('.', '/')
                ropa2 = looks_prenda(prenda, look).reset_index(drop = True)[1].replace('_', ', ').replace('.', '/')
                prediccion = f'Prendas del look: 1 => {ropa1} // 2 => {ropa2}'
                prediccion1 = 'Rellene los campos de arriba, por favor'

            except: 
                prediccion = 'Por favor, procure que todos los campos estén bien rellenados.'
                prediccion1 = 'Rellene los campos de arriba, por favor'

        elif result['boton_submit'] == 'Calcular pertenencia':

            try:
                familia1 = result['Familia1']
                color1 = str(colores.loc[colores.hexadecimal.str.upper() == result['Color1'].replace('#', '').upper(), 'name'].iloc[0])
                color1 = color1.replace('_', '')
                estilo1 = '.'.join(result.getlist('Estilo1'))
                talla1 = result['Talla1']
                estampado1 = result['Estampado1']
                temporada1 = result['Temporada1']
                premium1 = result['Premium1']

                prenda = '_'.join([familia1, color1, talla1, temporada1, estilo1, estampado1, premium1])

                prediccion1 = f'Esta prenda pertenece/pertenecería a {api_nuevo_nodo(prenda)} looks'
                prediccion = 'Rellene los campos de arriba, por favor'
            except: 
                prediccion1 =  f'Esta prenda pertenece/pertenecería a {api_nuevo_nodo_2(prenda)} looks'
                prediccion = 'Rellene los campos de arriba, por favor'
        
        else: 
            prediccion = '-------------------------'
            prediccion1 = '-------------------------'
        
        return render_template("grafo_looks_resultados.html", result = result, prediccion1 = prediccion1, prediccion = prediccion)
        
if __name__ == '__main__':
    app.run(debug = True)