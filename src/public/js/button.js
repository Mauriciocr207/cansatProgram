const { ipcRenderer } = require("electron");
const button = document.querySelector('#button');

button.addEventListener('click', () => {
    ipcRenderer.send('message:hello', "Hola mundoooo desde render");
    

    // document.querySelector('body').style.backgroundColor == 'black' ? 
    //     document.querySelector('body').style.backgroundColor = 'white' :
    //     document.querySelector('body').style.backgroundColor = 'black';
})