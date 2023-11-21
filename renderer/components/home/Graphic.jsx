import { ipcRenderer } from "electron";
import { useEffect } from "react";

export function Graphic({onMouseOver, Children, titulo}) {
    return(
        <>
            <div className=" 
                row-span-1 
                p-[30px]
                pb-[70px]
                w-full 
                h-full 
                rounded-lg
                gap-[10px]
                items-center 
                justify-center
                transition-color
                duration-500
                bg-hardLightBlue
            " onMouseOver={onMouseOver}>
                <h1 className="text-greyBlue font-bold text-[25px] mb-[10px] text-center">{titulo}</h1>
                {Children}
            </div>
        
        </>
    )
}