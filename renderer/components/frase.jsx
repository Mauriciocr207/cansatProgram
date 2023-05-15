export function Frase() {
    return <>
        <input type="text" className="bg-hardLightBlue text-blue p-[7px] rounded-[10px outline-none w-full mt-[10px]" placeholder="Ingresa una frase"/>
        <div className="flex justify-end">
            <button className="bg-blue hover:bg-lightBlue p-[7px] rounded-[10px] mt-[15px] transitino-color duration-300 ">Enviar</button>
        </div>
    </>
}