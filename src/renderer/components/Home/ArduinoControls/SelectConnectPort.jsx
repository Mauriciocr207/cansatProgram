import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import {MdWifiTethering} from 'react-icons/md'
import { DropdownList } from "react-widgets";
import "react-widgets/styles.css";

export function SelectConnectPort({ id }) {
  // Clases css
  const classes = {
    box: `
      w-full
      p-[10px]
      rounded
      flex
      flex-col
      items-center
      justify-center
      gap-[10px]
      font-bold
      text-[17px]`,
    button: `
      w-[50px] 
      h-[50px]
      rounded-full 
      p-[9px]
      backdrop-blur-md
      transition-color
      duration-500`,
    textBtn: `
      text-greyBlue
      font-bold
      text-[15px]
      p-[9px]
      mb-[5px]
    `,

  };

  const [port, setPort] = useState('COM1');
  
  // handle click BtnConnection
  const [btnConnection, setBtnConnection] = useState({
    class: "bg-[#ECEFF5] text-greyBlue",
    clicked: false,
    message: "ready for connection",
  });

  const [disableDropdown, setDisableDropdown] = useState(false);

  // Se recibe la respuesta de la solicitud
  useEffect(() => {
    ipcRenderer.on(`serial:connection:open:${id}`, (event, data) => {
      const { status, message } = data;
      console.log(status);
      if(status) setDisableDropdown(true);
      setBtnConnection({
        clicked: status ? true : btnConnection.clicked,
        class: status ? "acepted":"warning",
        message: message,
      });
    });
  
    ipcRenderer.on(`serial:connection:close:${id}`, (event, data) => {
      const { status, message } = data;
      console.log(status);
      if(status) setDisableDropdown(false);
      setBtnConnection({
        clicked: status ? false : btnConnection.clicked,
        class: status ? "closed":"warning",
        message: message,
      });
    });
  }, []);

  // Se envía la solicitud para abrir el puerto
  function handleConnectionBtnClick() {
    if(!btnConnection.clicked) {
      ipcRenderer.send(`serial:connection:open`, { port: port, id: id});
    } else {
      ipcRenderer.send(`serial:connection:close`, { port: port, id: id});
    }
  }
  
  // Creación de elementos puertos (elementos li)
  const portNames = [];
  for (let i = 1; i <= 15; i++) portNames.push(`COM${i}`);

  return (
    <>
      <div className={classes.box}>
          <button className={`${classes.button} ${btnConnection.class} `} onClick={handleConnectionBtnClick}>
            <MdWifiTethering className="w-full h-full"/>
          </button>
          <p className={classes.textBtn}>
            state: <span>{btnConnection.message}</span>
          </p>
        <DropdownList
          className="text-left"
          id={id}
          disabled={disableDropdown}
          data={portNames}
          defaultValue={port}
          onChange={(value) => {
            setPort(value);
          }}
        />
      </div>
    </>
  );
}
