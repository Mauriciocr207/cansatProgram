import { ipcRenderer } from "electron";
import { useEffect, useState } from "react"

export function Velocity() {
    const [texto, setTexto] = useState('hola');
    useEffect(() => {
        ipcRenderer.on('Arduino:data', (event, data) => {
            setTexto(data.velocidad);
        });
    }, []);
    return <>
        <p>
            {texto}
        </p>
    
    </>
}