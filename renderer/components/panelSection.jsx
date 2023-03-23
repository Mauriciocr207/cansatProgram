import { Grafic } from '../components/grafic';
import { PresionChart } from './grafics/presion';
import { useState } from 'react';
export function PanelSection() {
    const colors = [
        "bg-[#F52E00]",
        "bg-[#4318F5]",
        "bg-[#F59200]",
        "bg-[#18F5A7]",
        "bg-[#F5DB0C]",
        "bg-[#F87030]"
      ]
    const [sectionBgColor, setSectionBgColor] = useState("bg-[#ffffff]");

    return (
        <>
            <div className={
              ` bg-section
                h-full 
                grid
                grid-rows-[50px_1fr]
                grid-cols-1 
                ${sectionBgColor}
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
                      colors.map( color => <Grafic
                        key={color} onMouseOver={ () => {
                            setSectionBgColor(color);
                        }} Children={
                          <>
                            <PresionChart/>
                          </>
                        }/>
                      )
                    }                    
                </div>
            </div>
        </>
    )

}