import { InputMsg } from "./inputMsg";
import { SelectConnectPort } from "./selectConnectPort";

export function Controls() {
    return (<>
        <div className="bg-white shadow controls w-full dark:bg-blackDark-2 rounded-[10px] transition-color duration-300 p-[30px] text-white text-center box-border">
            <div className="flex flex-col gap-[10px]">
                <h2 className="text-greyBlue text-[18px]">Conexión a Carga primaria</h2>
                <SelectConnectPort id={1}/>
                <h2 className="text-greyBlue text-[18px]">Conexión a carga secundaria</h2>
                <SelectConnectPort id={2}/>
            </div>
            <div className="w-full mt-[15px]">
                <h2 className="text-greyBlue text-[18px]">Envía una frase</h2>
                <InputMsg/>
            </div>
        </div>
    </>)
}