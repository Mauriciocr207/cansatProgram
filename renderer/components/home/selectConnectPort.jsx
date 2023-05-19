import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import {MdWifiTethering} from 'react-icons/md'

export function SelectConnectPort({ id, nombreCarga, className }) {
  // Clases css
  const classes = {
    button: `
      w-[50px] 
      h-[50px]
      rounded-full 
      p-[9px] 
      backdrop-blur-md
      transition-color
      duration-500
    `,
    select: `
      bg-blue
      border-0
      hover:bg-blue3
      dark:bg-blackDark-3
      dark:border-greyDark-1
      dark:hover:bg-blackDark-4
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
      bg-blue
      srcoll
      dark:scrollDark
      dark:bg-blackDark-3
      dark:border-greyDark-1
      w-full
      h-[250px]
      list-none
      p-[0.5em]
      border-[3px]
      rounded-xl
      absolute
      top-[2.8em]
      overflow-y-scroll
      scroll
    `,
    caret: `
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
      bg-lightBlue
      hover:bg-darkBlue1
      dark:bg-blackDark-2
      dark:hover:bg-blackDark-4
      dark:hover:text-white
      py-[0.3em]
      px-[0.9em]
      my-[0.3em]
      rounded-[5px]
      cursor-pointer
      transition-color
      duration-300
    `,
    containerDropdown: `     
      w-full
      relative
      h-[40px]
    `,
    dropdown: `
      w-full
      h-full
      `,
  };
  // Puerto seleccionado
  const [selectedPort, setSelectedPort] = useState("COM 1"); // Puerto inicial "COM 1"
  // handleClick en select
  const [select, setSelect] = useState({
    clicked: true,
    classMenu: "hidden",
    classCaret: "toTop",
  });
  // Función del handleClick en select
  function handleSelectClick() {
    setSelect({ ...select, clicked: !select.clicked });
    select.clicked ? 
      setSelect({
        ...select,
        clicked: false,
        classCaret: "rotate",
        classMenu: "block",
      }) :
      setSelect({
        ...select,
        clicked: true,
        classCaret: "noRotate",
        classMenu: "hidden",
      });
  }
  // Cambios de estilo css en botón al llamar una conexión
  const [btnConnection, setbtnConnection] = useState(
    "bg-[#ECEFF5] text-greyBlue"
  );
  // Creación de elementos puertos (elementos li)
  const portNames = [];
  for (let i = 1; i <= 15; i++) portNames.push(`COM ${i}`);
  const [ports, setPorts] = useState(createPorts("COM 1"));
  function createPorts(port) {
    return portNames.map((portName) => (
      <li
          key={portName}
          className={`${classes.ports} ${portName == port ? "bg-darkBlue1 dark:bg-greyDark-1" : ""}`}
          onClick={() => {
            setSelectedPort(portName);
            setPorts(createPorts(portName));
          }}
        >
          {portName}
        </li>
    ));
  }
  // Se envía la solicitud para abrir el puerto
  function wantToOpenConnection() {
    ipcRenderer.send("wantToOpenConnection", { id: id, port: selectedPort, name: nombreCarga });
  }
  // Se recibe la respuesta de la solicitud
  useEffect(() => {
    ipcRenderer.on(`openedConnection_${id}`, openedConnection);
  }, []);
  // Se aplican los estilos al botón en respuesta a la solicitud
  function openedConnection(event, opened) {
    setbtnConnection("bg-[#ECEFF5] text-greyBlue");
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
        className={`
        w-full
        grid
        grid-rows-[50px_50px]
        grid-cols-1
        place-items-center
        gap-[10px]
        font-bold
        text-[17px]
        text-left
        ${className}
      `}
      >
        <button
          className={` ${classes.button} ${btnConnection} `}
          onClick={wantToOpenConnection}
        >
          <MdWifiTethering className="w-full h-full"/>
        </button>
        <div className={classes.containerDropdown}>
          <div className={classes.dropdown}>
            <div className={`${classes.select} `} onClick={handleSelectClick}>
              <span> {selectedPort} </span>
              <div className={`${classes.caret} ${select.classCaret}`}></div>
            </div>
          </div>
          <ul className={`${classes.menu} ${select.classMenu}`}> {ports} </ul>
        </div>
      </div>
    </>
  );
}
