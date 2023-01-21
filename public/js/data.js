// Se recibe respuesta de la solicitud wantToOpenConnection
electronApi.handle('Arduino:data', (event, data) => {
    console.log(typeof data, data);
});