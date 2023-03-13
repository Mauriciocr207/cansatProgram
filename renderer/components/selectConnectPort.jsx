import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { ConnectionIcon } from "./connectionIcon";

export function SelectConnectPort({id}) {
  useEffect(()=> {
    ipcRenderer.on(`openedConnection_${id}`, openedConnection);
  }, [])

  const [textSelected, setTextSelected] = useState("COM 1");
  const [classSelect, setClassSelect] = useState("select");
  const [classCaret, setClassCaret] = useState("caret");
  const [classMenu, setClassMenu] = useState("menu");
  const [classButton, setClassButton] = useState(" ");

  const arr = [];
  for (let i = 1; i <= 10; i++) arr.push(i);
  const [childsMenu, setChildsMenu] = useState(createChildsMenu(1));
  function createChildsMenu(numberPort) {
    return arr.map((e) => {
      const port = "COM " + e;
      return (
        <li
          className={e == numberPort ? "active" : "non-active"}
          onClick={() => {
            setTextSelected(port);
            setClassSelect("select");
            setClassCaret("caret");
            setClassMenu("menu");
            setChildsMenu(createChildsMenu(e));
          }}
          key={port}
        >
          {port}
        </li>
      );
    });
  }
  function handleSelectClick() {
    if (classSelect == "select") {
      setClassSelect(classSelect + " select-clicked");
      setClassCaret(classCaret + " caret-rotate");
      setClassMenu(classMenu + " menu-open");
    } else {
      setClassSelect("select");
      setClassCaret("caret");
      setClassMenu("menu");
    }
  }
  // Button
  function openedConnection(event, opened) {
    const classAceptDenied = ["connect-acept", "connect-denied"];
    setClassButton(" ");

    setTimeout(() => {
      if (opened) {
        console.log("PUERTO ABIERTO");
        setClassButton(classAceptDenied[0]);
      } else {
        console.log("PUERTO CERRADO");
        setClassButton(classAceptDenied[1]);
      }
    }, 300);
  };
 
  // Se envía una solicitud para abrir el puerto
  function wantToOpenConnection() {
    ipcRenderer.send("wantToOpenConnection", {port: textSelected, id: id});
  }



  return (
    <>
      <div
        className="
        w-[200px]
        grid
        grid-rows-[50px_1fr]
        grid-cols-1
        gap-[20px]
        justify-items-center
      "
      >
        <button
          className={
          `btn
           w-[50px] 
           h-[50px] 
           rounded-full 
           mb-[20px] 
           p-[9px] 
           ${classButton}`
          }
          onClick={wantToOpenConnection}
        >
          <ConnectionIcon />
        </button>
        <div className="w-full relative">
          <div className="dropdown w-full">
            <div className={classSelect} onClick={handleSelectClick}>
              <span className="selected">{textSelected}</span>
              <div className={classCaret}></div>
            </div>
          </div>
          <ul className={classMenu}>{childsMenu}</ul>
        </div>
      </div>
    </>
  );
}
