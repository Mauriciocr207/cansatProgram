import { useState } from 'react';
import { Graphic } from './Graphic';
// Grafics
import { Presion } from './grafics/Presion';
import { Temperatura } from './grafics/Temperatura';
import { Velocity } from './grafics/Velocity';
import { Orientation } from './grafics/Orientation';

export function PanelSection() {
    const Grafics = [
      { grafic: <Orientation/>, color: "bg-[#F52E00]", titulo: "Orientación" },
      { grafic: <Presion/>, color: "bg-[#F59200]", titulo: "Presión"},
      { grafic: <Presion/>, color: "bg-[#4318F5]", titulo: "Presión"},
      { grafic: <Temperatura/>, color: "bg-[#18F5A7]", titulo: "Temperatura"},
      { grafic: <Presion/>, color: "bg-[#F5DB0C]", titulo: "Presión"},
      { grafic: <Presion/>, color: "bg-[#F87030]", titulo: "Presión"}
    ];
    const [sectionBgColor, setSectionBgColor] = useState("bg-[#ffffff]");

    return (
        <>
          <div className={`
            bg-sectionDark
            w-full 
            h-full
            ${sectionBgColor.toString()}
            transition-color
            duration-500
          `}>
            <div className={
              ` bg-white
                shadow
                dark:bg-[rgb(0,0,0,0)]
                h-full 
                grid
                grid-rows-[1fr]
                grid-cols-1 
                transition-color
                duration-300
                
                `
          }
          >
              <div className='
                  px-[32px] 
                  py-[24px]
                  grid
                  grid-rows-2 
                  grid-cols-3 
                  gap-x-[24px] 
                  gap-y-[12px]                  
                  overflow-y-auto
                  max-[1400px]:grid
                  max-[1400px]:grid-rows-[300px_300px_300px]
                  max-[1400px]:grid-cols-2
                  max-[1010px]:flex
                  max-[1010px]:basis-full
                  max-[1010px]:flex-wrap
                  max-[1010px]:items-center
                  scroll
                  
              '>
                    {
                      Grafics.map( e => <Graphic
                        key={e.color} onMouseOver={ () => {

                            setSectionBgColor(e.color);
                        }} 
                        Children={e.grafic}
                        titulo={e.titulo}/>
                      )
                    }                    
              </div>
            </div>
          </div>
        </>
    )

}