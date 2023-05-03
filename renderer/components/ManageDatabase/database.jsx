import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

export function Database() {
    const {content, setContent} = useState('hola');
    useEffect( () => {
        ipcRenderer.on('Arduino:data', (event, data) => {
            console.log(data);
        });
        ipcRenderer.send('database', data);
    }, []);
    
    return <>

        <h1>Hola perro</h1>
    </>
}