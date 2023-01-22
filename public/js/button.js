import { selected } from "./dropdown.js";
function openedConnection(event, opened) {
    const btn = document.querySelector('.btn');
    const classAceptDenied = [ "connect-acept", "connect-denied" ];
    classAceptDenied.forEach( e => btn.classList.remove(e) );
    setTimeout(() => {
        if (opened) {
            console.log("PUERTO ABIERTO");
            btn.classList.toggle(classAceptDenied[0]);
        } else {
            console.log("PUERTO CERRADO");
            btn.classList.toggle(classAceptDenied[1]);
        }
    }, 300);
};

// Se envía una solicitud para abrir el puerto
btn.addEventListener('click', () => {
    electronApi.send('wantToOpenConnection', selected.innerText);
});

// Se recibe respuesta de la solicitud wantToOpenConnection
electronApi.handle('openedConnection', openedConnection);
