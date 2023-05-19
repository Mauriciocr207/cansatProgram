import { ipcRenderer } from "electron"
import { useEffect, useState } from "react"

export function Frase() {
    const connection = 1; // conexión de la carga primaria
    const [msg, setMsg] = useState('');
    function sendMessage() {
        ipcRenderer.send('Arduino:data', {idConnection: connection, message: msg});
    }
    function setFrase(event) {
        setMsg(event.target.value);
    }
    return <>
        <input type="text" className="bg-hardLightBlue text-blue p-[7px] rounded-[10px outline-none w-full mt-[10px]" placeholder="Ingresa una frase" onChange={setFrase}/>
        <div className="flex justify-end">
            <button className="bg-blue hover:bg-lightBlue p-[7px] rounded-[10px] mt-[15px] transitino-color duration-300 " onClick={sendMessage}>Enviar</button>
        </div>
    </>
}