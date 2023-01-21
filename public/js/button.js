const { ipcRenderer} = require("electron");
import { selected } from "./dropdown.js";
const btn = document.querySelector('.btn');



btn.addEventListener('click', () => {
    ipcRenderer.send('wantToOpenConnection', selected.innerText);
});

ipcRenderer.on("openedConnection", (event, opened) => {
    const classNameAcept = "connect-acept";
    const classNameDenied = "connect-denied";
    console.log(opened);
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
    
});
