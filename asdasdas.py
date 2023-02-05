import pandas as pd
import random as rd

isConnected = True

df = pd.DataFrame(columns =['Tiempo','Temperatura','Presión','Humedad','Velocidad'])

while (isConnected == True):
    time = rd.randint(1,10)
    temp = rd.randint(1,10)
    pres = rd.randint(1,10)
    humedad = rd.randint(1,10)
    vel = rd.randint(1,10)
    #df = df.append(pd.Series([time,temp,pres,humedad,vel],index=['Tiempo','Temperatura','Presión','Humedad','Velocidad'] ), ignore_index=True)
    getData = pd.DataFrame([[time,temp,pres,humedad,vel]],columns=['Tiempo','Temperatura','Presión','Humedad','Velocidad'])
    aux2 = pd.concat([df,getData])
    print(aux2)
    aux3 = pd.DataFrame(columns=['Tiempo','Temperatura','Presión','Humedad','Velocidad'])
    pd.concat([aux3,aux2])
    #aux3 = pd.concat([df,aux2])
    print(aux3)
    aux = input("Elige para otra fila o stop")
    if (aux != 's'):
        
        isConnected = False

#.to_csv('datos_de_sensores.csv',index=0)
#print(aux3_1)