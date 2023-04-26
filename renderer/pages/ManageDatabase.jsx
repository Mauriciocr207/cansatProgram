import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Database } from '../components/ManageDatabase/database';

function ManageDatabase() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-javascript)</title>
      </Head>
      <div className='bg-sky-900 w-full h-[100vh] text-white'>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/home">
            <a>Go to home page</a>
          </Link>
        </p>
        <div>
            <Database/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageDatabase;
