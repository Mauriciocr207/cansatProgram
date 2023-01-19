const { ipcRenderer } = require("electron");
const button = document.querySelector('#button');

button.addEventListener('click', () => {
    ipcRenderer.send('message:hello', "Hola mundoooo desde render");
})