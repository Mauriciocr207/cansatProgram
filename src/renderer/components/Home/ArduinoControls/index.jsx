import PortInput from "./PortInput";

export function ArduinoControls() {
    return (<>
        <PortInput key={1} id={"carga-primaria"} title={"Carga Primaria"}/>
        <PortInput key={2} id={"carga-secundaria"} title={"Carga Secundaria"} className={"mt-5"}/>
    </>)
}