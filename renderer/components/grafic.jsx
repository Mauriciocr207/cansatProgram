import { ipcRenderer } from "electron";
import { Children, useEffect } from "react";

export function Grafic({onMouseOver, Children}) {
    useEffect( () => {
        ipcRenderer.on('Arduino:data', (event, data) => {
            console.log(data);
        })
    } )


    return(
        <>
            <div className="grafic row-span-1 p-[30px]" onMouseOver={onMouseOver}>
                {Children}
            </div>
        
        </>
    )
}