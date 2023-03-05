import { useState } from "react";

export function SelectPort() {    
  const [textSelected, setTextSelected] = useState('COM1');
  const [classSelect, setClassSelect] = useState('select');
  const [classCaret, setClassCaret] = useState('caret');
  const [classMenu, setClassMenu] = useState('menu');


  const arr = [];
  for (let i = 1; i <= 10; i++) arr.push(i);
  const [portSelected, setPortSelected] = useState(2);
  const [childsMenu, setchildsMenu] = useState(
    arr.map( e => {
        const text = 'COM' + e
        return <li className={e == portSelected ? 'active' : 'noactive'} onClick={
            function() {
                setTextSelected(text);
                setClassSelect('select');
                setClassCaret('caret');
                setClassMenu('menu');
                setPortSelected(e);
                setchildsMenu(createMenuChildrens());
              }
          }> {text} </li>
      })
  );
  function createMenuChildrens() {
      return arr.map( e => {
        const text = 'COM' + e
        return <li className={e == portSelected ? 'active' : 'noactive'} onClick={
            function() {
                setTextSelected(text);
                setClassSelect('select');
                setClassCaret('caret');
                setClassMenu('menu');
                setPortSelected(e);
                setchildsMenu(createMenuChildrens());
              }
          }> {text} </li>
      });
    };
    
    


  function handleSelectClick() {
    if( classSelect == 'select' ) {
        setClassSelect(classSelect + ' select-clicked');
        setClassCaret(classCaret + ' caret-rotate');
        setClassMenu(classMenu + ' menu-open');
    } 
    else {
        setClassSelect('select');
        setClassCaret('caret');
        setClassMenu('menu');
    }        
  }
  
 
  
  

  return (
    <>
      <div classNameName="containerDropdown">
        <div className="dropdown mt-[40px] mb-[30px]">
          <div className={ classSelect } onClick={handleSelectClick}>
            <span className="selected">
              {textSelected}
            </span>
            <div className={ classCaret }></div>
          </div>
        </div>
        <ul className={ classMenu}>
            {
                childsMenu
            }
        </ul>
      </div>
    </>
  );
}
