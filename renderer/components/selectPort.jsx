import { useState } from "react";
import { ConnectionIcon } from "./conectionIcon";

export function SelectPort() {
  const [textSelected, setTextSelected] = useState("COM1");
  const [classSelect, setClassSelect] = useState("select");
  const [classCaret, setClassCaret] = useState("caret");
  const [classMenu, setClassMenu] = useState("menu");

  const arr = [];
  for (let i = 1; i <= 10; i++) arr.push(i);
  const [childsMenu, setChildsMenu] = useState(createChildsMenu(1));
  function createChildsMenu(numberPort) {
    return arr.map((e) => {
      const port = "COM" + e;
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

  return (
    <>
      <div className="
        w-[150px]
        row-span-1
        flex
        items-center
        flex-col
        absolute
        
      ">
        <button
          id="btn"
          class="
                btn
                w-[50px]
                h-[50px]
                rounded-full
                mb-[20px]
                p-[9px] 
            "
        >
          <ConnectionIcon />
        </button>
        <div classNameName="containerDropdown">
          <div className="dropdown">
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
