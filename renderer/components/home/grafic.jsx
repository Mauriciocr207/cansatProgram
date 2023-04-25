import { ipcRenderer } from "electron";
import { useEffect } from "react";

export function Grafic({onMouseOver, Children}) {
    useEffect( () => {
        // ipcRenderer.on('Arduino:data', (event, data) => {
        //     console.log(data);
        // });
    } )


    return(
        <>
            <div className="         
                row-span-1 
                p-[30px]
                w-full 
                h-full 
                rounded-lg 
                flex 
                items-center 
                justify-center
                transition-color
                duration-500
            " onMouseOver={onMouseOver}>
                {Children}
            </div>
        
        </>
    )
}