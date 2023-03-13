import { Grafic } from '../components/grafic';
import { useState } from 'react';
export function PanelSection() {
    const colors = [
        "#F52E00",
        '#4318F5',
        '#F59200',
        '#18F5A7',
        '#F5DB0C',
        '#F87030'
      ]
    const [sectionBgColor, setSectionBgColor] = useState('#ffffff');

    return (
        <>
            <div className={
              ` bg-section
                row-span-1
                col-span-1 
                overflow-y-auto
                h-full 
                grid
                grid-rows-[50px_1fr]
                grid-cols-1 
                bg-[${sectionBgColor}]
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
                  overflow-y-scroll
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
                      colors.map( color => <Grafic key={color} onMouseOver={ () => {
                            console.log(color);
                            setSectionBgColor(color);
                        }}/>
                      )
                    }                    
                </div>
              
            </div>
        </>
    )

}