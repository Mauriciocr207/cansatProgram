import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { ConnectionIcon } from "./connectionIcon";

export function SelectConnectPort({ id }) {
  const clases = {
    button: `
      
      w-[50px] 
      rounded-full 
      p-[9px] 
      backdrop-blur-md
      transition-color
      duration-500
    `,
    select: `
      SELECT
  
      bg-primario 
      border-primario
      hover:bg-secundario
  
      w-full
      h-full
      flex
      place-content-between
      items-center
      border-[3px]
      border-solid
      rounded-xl
      transition-colors
      duration-300
      p-[0.6em]
      cursor-pointer
    `,
    menu: `
      MENU
      bg-secundario
      border-secundario
      w-full
      h-[460px]
      list-none
      p-[0.3em]
      rounded-xl
      absolute
      top-[3.1em]
    `,
    caret: `
      CARET
  
      w-0
      h-0
      border-t-[6px]
      border-t-[#eee]
      border-r-[5px]
      border-r-[rgb(0,0,0,0)]
      border-l-[5px]
      border-l-[rgb(0,0,0,0)]
      transition-all
      duration-300
    `,
    ports: `
      py-[0.3em]
      px-[0.9em]
      my-[0.3em]
      border-[3px]
      border-solid
      border-primario
      hover:border-liHover
      cursor-pointer
      transition-color
      duration-300
    `,
    containerDropdown: `
      CONTAINERDROPDOWN
            
            
      w-full
      relative
      h-[40px]
    `,
    dropdown: `
      DROPDOWN
            
      w-full
      h-full
      
      `,
  };
  const [selectedPort, setSelectedPort] = useState("COM 1"); // Puerto inicial
  const [select, setSelect] = useState({
    clicked: false,
    classMenu: "",
    classCaret: "toTop",
  }); //  Control de click en Select
  const [btnConnection, setbtnConnection] = useState(
    "bg-[rgb(255,255,255,0.25)]"
  ); //  Estilos iniciales de btnConnection

  // Manejando click en Select
  function handleSelectClick() {
    select.clicked
      ? setSelect({
          ...select,
          clicked: false,
          classCaret: "rotate",
          classMenu: "block",
        })
      : setSelect({
          ...select,
          clicked: true,
          classCaret: "noRotate",
          classMenu: "hidden",
        });
  }

  // Creación de elementos puertos (elementos li)
  const portNames = [];
  for (let i = 1; i <= 10; i++) portNames.push(`COM ${i}`);
  const [ports, setPorts] = useState(createPorts("COM 1"));
  function createPorts(port) {
    return portNames.map((portName) => (
      <>
        <li
          className={`${clases.ports} ${portName == port ? "bg-active" : ""}`}
          onClick={() => {
            setSelectedPort(portName);
            setPorts(createPorts(portName));
          }}
          key={portName}
        >
          {portName}
        </li>
      </>
    ));
  }

  // Se envía la solicitud para abrir el puerto
  function wantToOpenConnection() {
    ipcRenderer.send("wantToOpenConnection", { port: selectedPort, id: id });
  }

  // Se recibe la respuesta de la solicitud
  useEffect(() => {
    ipcRenderer.on(`openedConnection_${id}`, openedConnection);
  }, []);

  // Se aplican los estilos al botón en respuesta a la solicitud
  function openedConnection(event, opened) {
    setbtnConnection("bg-[rgb(255,255,255,0.25)]");
    setTimeout(() => {
      if (opened) {
        console.log("PUERTO ABIERTO");
        setbtnConnection("acepted");
      } else {
        console.log("PUERTO CERRADO");
        setbtnConnection("denied");
      }
    }, 500);
  }

  return (
    <>
      <div
        className="
        w-full
        grid
        grid-rows-[50px_50px]
        grid-cols-1
        gap-[15px]
        place-items-center
      "
      >
        <button
          className={` ${clases.button} ${btnConnection} `}
          onClick={wantToOpenConnection}
        >
          <ConnectionIcon />
        </button>
        <div className={clases.containerDropdown}>
          <div className={clases.dropdown}>
            <div className={`${clases.select} `} onClick={handleSelectClick}>
              <span> {selectedPort} </span>
              <div className={`${clases.caret} ${select.classCaret}`}></div>
            </div>
          </div>
          <ul className={`${clases.menu} ${select.classMenu}`}> {ports} </ul>
        </div>
      </div>
    </>
  );
}
