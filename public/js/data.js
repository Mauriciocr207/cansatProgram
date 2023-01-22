import { barChart, pushDataBarChart } from "./charts/barChar.js";
// Se recibe respuesta de la solicitud wantToOpenConnection
electronApi.handle('Arduino:data', (event, data) => {
    pushDataBarChart(
        barChart, data["temperatura"], data["time"]
    );
    console.log(data["temperatura"])
});