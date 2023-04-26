import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

export function Database() {
    const {content, setContent} = useState('hola');
    useEffect( () => {
        console.log('hola', 'aqui ando');
        ipcRenderer.on('Arduino:data', (event, data) => {
            console.log(data);
        });
    }, []);
    
    return <>

        <h1>Hola perro</h1>
    </>
}