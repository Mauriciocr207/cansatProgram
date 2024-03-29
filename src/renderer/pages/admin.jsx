import React from "react";
import Head from "next/head";
import { Aside } from "../components/common/aside";
import { Controls } from "../components/home/controls/index";
import { Footer } from "../components/layout/Footer";

function Admin() {
  return (
    <React.Fragment>
      <Head>
        <title>Admin Panel</title>
      </Head>
      {/* body */}
      <div className="w-screen h-screen relative overflow-hidden">
        {/* layer */}
        <div className="bg-hardLightBlue dark:bg-black transition-color grid grid-rows-[25px_1fr_90px] gap-[10px] grid-cols-[320px_minmax(495px,1fr)] h-screen  px-[10px] transition-color duration-300">
          {/* Drag */}
          <div className="drag w-full h-full col-span-2"></div>
          {/* Aside -> Arduino Controls */}
          <Aside children={<Controls/>}/>
          {/* Section -> Grafics */}
          <section className="row-span-1 col-span-1 rounded-[10px] overflow-y-auto relative transition-color duration-300 ">
            <h1>Panel de administración</h1>
          </section>
          {/* Footer -> Messages to Arduino */}
          <Footer/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Admin;
