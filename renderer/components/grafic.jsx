import { ipcRenderer } from "electron";
import { useEffect } from "react";

export function Grafic({onMouseOver}) {
    useEffect( () => {
        ipcRenderer.on('Arduino:data', (event, data) => {
            console.log(data);
        })
    } )


    return(
        <>
            <div className="grafic row-span-1 p-[30px]" onMouseOver={onMouseOver}>
                <h1 className="text-center">
                    
                </h1>
            </div>
        
        </>
    )
}