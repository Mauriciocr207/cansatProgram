import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {} from "./_app";
import { SelectPort } from '../components/selectPort';
import { globalPort } from '../components/selectPort';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div className=' bg-sky-900 h-[100vh] text-white'>
        <div className='grid grid-col-1 text-2xl w-full text-center'>
          <img className='ml-auto mr-auto' src='/images/logo.png' />
          <span>⚡ Electron ⚡</span>
          <span>+</span>
          <span>Next.js</span>
          <span>+</span>
          <span>tailwindcss</span>
          <span>=</span>
          <span>💕 </span>
        </div>
        <div className='mt-1 w-full flex-wrap flex justify-center'>
          <Link href='/next'>
            <a className='btn-blue'>Go to next page</a>
          </Link>
        </div>
        <SelectPort />
      </div>
    </React.Fragment>
  );
};

export default Home;
