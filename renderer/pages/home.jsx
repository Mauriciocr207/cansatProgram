import React from 'react';
import Head from 'next/head';
import { SelectConnectPort } from '../components/home/selectConnectPort';
import { PanelSection } from '../components/home/panelSection';
import { ToggleThemeButton } from '../components/toggleThemeButton';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className='
            w-screen 
            h-screen 
            relative
            overflow-hidden
      '>
        <div className='
              grid 
              grid-rows-[1fr_90px] 
              grid-cols-[241px_minmax(495px,1fr)] 
              h-screen
        '>
          {/* Aside -> Arduino Controls */}
          <aside className='
              bg-blue
              text-white
              dark:bg-black
              grid
              justify-items-center
              row-span-1
              grid-rows-[50px_50px_1fr]
              grid-cols-1
              p-[20px]
              transition-color
              duration-300
          '>
            <ToggleThemeButton />
            <h1>Connection</h1>
            <SelectConnectPort id={1}/>
          </aside>

          {/* Section -> Grafics */}
          <section className='
            row-span-1
            col-span-1 
            overflow-y-auto
            relative
            transition-color
            duration-300
          '>
            <PanelSection />
          </section>

          {/* Footer -> Messages to Arduino */}
          <footer className='
            bg-blueSky
            dark:bg-blackDark-3
            col-span-2
            transition-color
            duration-300
          '>

          </footer>

        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
