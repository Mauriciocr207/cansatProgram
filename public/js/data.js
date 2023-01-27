import { presion } from "./charts/Presion.js";
// Se recibe respuesta de la solicitud wantToOpenConnection
electronApi.handle('Arduino:data', (event, data) => {
    // 1 - BarChar
    presion.pushData(
        data["temperatura"], data["time"]
    );
});