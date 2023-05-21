# HUMAN - MACHINE INTERFACE : FRIDAY

__Para integrantes del equipo__

Téngase en cuenta que, para utilizar correctamente el programa, debe utilizarse el sketch guardado en la carpeta 'Arduino', de modo que los datos enviados por Arduino Uno se procesen correctamente en esta interfaz.

- Para utilizar el programa en desarrollo debes instalar primero [NodeJS](https://nodejs.org/es/) y [Git](https://git-scm.com/download/win).

- Descarga el repositorio por medio del ZIP que proporciona Github, o clona el repositorio en tu computadora con:
```PowerShell
git clone 'https://github.com/Mauriciocr207/cansatProgram.git'
```

- Una vez con el respositorio en tu computadora, en la terminal de windows, ve al directorio donde tienes guardado el archivo. Por ejemplo, si lo guardaste en el escritorio, el comando debe verse así:
```PowerShell
cd 'C:\Users\Tu_Usuario\Desktop'
```

- Instala las dependencias del proyecto ejecutando el siguiente código en la terminal.
``` PowerShell
npm ci
```
- En este punto, debes tener cargado el skecth de arduino en tu Arduino Uno que se ubica en la carpeta 'Arduino', para utilizar correctamente el programa.

- Inicia el programa en desarrollo
``` PowerShell
npm run dev
```
__Uso de la base de Datos (CON MYSQL)__
Para poder usar la base de datos correctamente, primero hay que instalar el sevidor de mysql para que al correr el programa, este no retorne un error.

Para instalarlo, recomiendo que sigan este tutorial que lo explica sencillo:
https://www.youtube.com/watch?v=_K2nOYwOq1E

Nota importante: Cuando Crean la contraseña, esta debe coincidir con la misma contraseña que se encuentra en el "archivo database.js", si no es igual, el programa devolvera un error porque no puede acceder, en mi caso le asigne "1234", si no se quiere modificar se aconseja usar la misma contraseña. 

Una vez que el Workbench se ejecute, ingresan y se debera crear una base de datos, de tal forma que como se le nombre deberá coincidir con el mismo nombre que se encuentra en la primera linea de "nombre de la base de datos", sino retornará error

Nota: Para crear la base de datos, en el workbench en la parte central se escribirá:
    
    ```create database nombredelabasededatos```

Una vez escrito eso y no marque error, se hará click en la parte de las herrientas donde se encuentra un relampago, (Cualquiera de los dos porque solo es una linea, pero si no se selecciona, el que NO tiene una 'I') esto hará que se ejecute la linea y por lo tanto genere una base de datos que se deberá mostrar en la columna de la izquierda.

Para notar los cambios hay que clickear en la columna izquierda y con click derecho darle a "refrescar todo", sino los cambios no se mostrarán. 

Al igual que cuando se guarden los datos, hay que refrescar la columna donde estan las tablas.

Para poder observar el guardado de datos, se clickea sobre la tabla que se crea a partir de una vez que se ejecuta el programa y con clik derecho se deberá desplegar una pantalla con la primera opcion que dice "mostrar filas" y ahi se genera una tabla donde se puede observar los datos guardados.

Nota: No olvidar refrescar cada vez que se haga una modificacion para observar los cambios.

__Uso de la base de Datos (CON SQLITE)__

Para el uso de esta forma no se tiene que instalar nada (Es decir, no necesita la inicializacion de un servidor), con el simple hecho de instalar el sqlite studio, el archivo que se genera cuando el programa se corre es compatible para poder observar que los datos se guardan. 


__Dependencias agregadas__

Se agregaron dependencias:
 La de sequelize (Para cualquier conexion db)
 La de mysql2 (uso del mysql)
 La de sqlite3 (Uso del sqlite) 
(No es necesario instalarlas extras, cuando se usa el 'npm ci' estas son instaladas junto con las otras dependencias)
