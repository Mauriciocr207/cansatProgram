import { selected } from "./dropdown.js";
function openedConnection(event, opened) {
    const btn = document.querySelector('.btn');
    const classNameAcept = "connect-acept";
    const classNameDenied = "connect-denied";
    btn.classList.remove(classNameAcept);
    btn.classList.remove(classNameDenied);
    setTimeout(() => {
        if (opened) {
            console.log("PUERTO ABIERTO");
            btn.classList.toggle(classNameAcept);
        } else {
            console.log("PUERTO CERRADO");
            btn.classList.toggle(classNameDenied);
        }
    }, 300);
};

// Se envía una solicitud para abrir el puerto
btn.addEventListener('click', () => {
    electronApi.send('wantToOpenConnection', selected.innerText);
});

// Se recibe respuesta de la solicitud wantToOpenConnection
electronApi.handle('openedConnection', openedConnection);
