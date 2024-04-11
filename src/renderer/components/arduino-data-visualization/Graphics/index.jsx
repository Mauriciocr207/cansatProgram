import { useState } from 'react';
import { PTA } from './PTA';
import { Velocity } from './Velocity';
import { Orientation } from './Orientation/index';
import { Position } from './Position';
import { Aceleration } from './Aceleration';

export default function Graphics() {
    return (
        <>
          <div className='w-full gap-2 grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(2,10rem)_repeat(3,15rem)] md:grid-rows-[10rem_15rem_20rem] lg:grid-rows-[13rem_24rem]'>
            <div className='bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-4'><Position/></div>
            <div className='bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-4'><Velocity/></div>
            <div className='bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-4'><Aceleration/></div>
            <div className='bg-white dark:bg-slate-800 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-5'><Orientation/></div>
            <div className='bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-12 lg:col-span-7'><PTA/></div>
          </div>
        </>
    )

}