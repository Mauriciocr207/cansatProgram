import { useState } from 'react';
import { Grafic } from '../home/grafic';
import { Presion } from '../home/grafics/presion';
import { Temperatura } from '../home/grafics/temperatura';
import { Velocity } from '../home/grafics/Velocity';
import {Vision3D} from '../home/grafics/vision3d.jsx';
export function PanelSection() {
    const Grafics = [
      { grafic: <Vision3D/>, color: "bg-[#F52E00]" },
      { grafic: <Temperatura/>, color: "bg-[#F59200]"},
      { grafic: <Presion/>, color: "bg-[#4318F5]"},
      { grafic: <Temperatura/>, color: "bg-[#18F5A7]" },
      { grafic: <Presion/>, color: "bg-[#F5DB0C]" },
      { grafic: <Presion/>, color: "bg-[#F87030]" }
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
                dark:bg-[rgb(0,0,0,0)]
                h-full 
                grid
                grid-rows-[50px_1fr]
                grid-cols-1 
                transition-color
                duration-300
                
                `
          }
          >
              <header className='drag w-full'></header>
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
                      Grafics.map( e => <Grafic
                        key={e.color} onMouseOver={ () => {

                            setSectionBgColor(e.color);
                        }} Children={
                          e.grafic
                        }/>
                      )
                    }                    
              </div>
            </div>
          </div>
        </>
    )

}