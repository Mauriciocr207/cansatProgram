import { ipcRenderer } from "electron";
import { useEffect, useState } from "react"

export function Velocity() {
    useEffect( () => {
        console.log('hola');
        ipcRenderer.on('Arduino:data', (event, data) => {
            console.log(data);
        });
    } )

    const [texto, setTexto] = useState('hola');
    return <>
        <p>
            {texto}
        </p>
    
    </>
}