import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {} from "./_app";
import { SelectConnectPort } from '../components/selectConnectPort';
import { Grafic } from '../components/grafic';

function Home() {
  const colors = [
    "#F52E00",
    '#4318F5',
    '#F59200',
    '#18F5A7',
    '#F5DB0C',
    '#F87030'
];
const [sectionBgColor, setSectionBgColor] = useState('#ffffff');
const white = '#ffffff'




  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div className='
            body
            w-screen 
            h-screen 
            bg-black 
            text-white
            relative
            overflow-hidden
      '>
        <div className='
              grid 
              grid-rows-[1fr_90px] 
              grid-cols-[241px_minmax(495px,1fr)] 
              h-screen
              bg-black
        '>
          {/* Aside -> Arduino Controls */}
          <aside className='
              grid
              justify-items-center
              bg-aside
              row-span-1
              grid-rows-[50px_1fr]
              grid-cols-1
              p-[20px]
          '>
            <h1>Connection</h1>
            <SelectConnectPort id={1}/>
          </aside>

          {/* Section -> Grafics */}
          <section className={
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
                      colors.map( color => <Grafic onMouseOver={ () => {
                          setSectionBgColor(color);
                        }}/>
                      )
                    }                    
              </div>
          </section>

          {/* Footer -> Messages to Arduino */}
          <footer className='bg-footer 
            col-span-2'>

          </footer>

        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
