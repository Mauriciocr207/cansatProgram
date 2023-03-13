import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {} from "./_app";
import { SelectConnectPort } from '../components/selectConnectPort';
import { PanelSection } from '../components/panelSection';

function Home() {
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
          <section>
            <PanelSection />

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
