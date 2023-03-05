import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {} from "./_app";

export default function arduinoControls() {
  return (
    <React.Fragment>
      <Head>
        <title>control over arduino</title>
      </Head>
      <div
        className="
              w-screen 
              h-screen 
              bg-black 
              text-white
              relative
              overflow-hidden
          "
      >
        <div
          className="
                 grid 
                 grid-rows-[1fr_90px] 
                 grid-cols-[241px_minmax(495px,1fr)] 
                 h-screen
                 bg-black 
            "
        >
          <aside
            className="
                
              "
          >

          </aside>
        </div>
      </div>
    </React.Fragment>
  );
}
