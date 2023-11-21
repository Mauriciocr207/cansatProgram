import React from "react";
import { FaHome, FaDatabase } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import { SelectConnectPort } from "../components/home/selectConnectPort";
import { PanelSection } from "../components/home/panelSection";
import { ToggleThemeButton } from "../components/toggleThemeButton";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      {/* body */}
      <div className="w-screen h-screen relative overflow-hidden">
        {/* layer */}
        <div className="bg-hardLightBlue dark:bg-black transition-color grid grid-rows-[25px_1fr_90px] gap-[10px] grid-cols-[320px_minmax(495px,1fr)] h-screen px-[10px] transition-color duration-300">
          {/* Drag */}
          <div className="drag w-full h-full col-span-2"></div>
          {/* Aside -> Arduino Controls */}
          <aside className=" text-black dark:bg-black grid justify-items-center row-span-1 grid-rows-[180px_1fr] gap-[10px] grid-cols-1 transition-color duration-300">
            {/* Navigation */}
            <div className="bg-white shadow dark:bg-blackDark-2 w-full rounded-[10px] transition-color duration-300 grid grid-rows-3 gap-[5px] text-center p-[15px] text-[15px] ">
              {/* THEME */}
              <ToggleThemeButton/>
              {/* HOME */}
              <Link href="/Home">
                <div className="w-full px-[10px] rounded-[10px] grid grid-cols-[30px_1fr] items-center cursor-pointer bg-blue hover:bg-lightBlue  dark:bg-blackDark-4  dark:hover:bg-greyDark-1 text-white transition-color duration-300">
                  <div className="flex justify-center items-center h-full"><FaHome className="w-full h-[50%]"/></div>
                  <p className="pl-[20px] text-left text-[20px] font-bold">Home</p>
                </div>
              </Link >
              {/* MANAGE DATABASE */}
              <Link href="/Admin">
                <div className="w-full px-[10px] rounded-[10px] grid grid-cols-[30px_1fr] items-center cursor-pointer bg-lightBlue hover:bg-lightBlue  dark:hover:bg-greyDark-1 text-white transition-color duration-300">
                  <div className="flex justify-center items-center h-full"><FaDatabase className="w-full h-[50%]"/></div>
                  <p className="pl-[20px] text-left text-[20px] font-bold">Admin Panel</p>
                </div>
              </Link >
            </div>
            {/* Controls */}
            <div className="bg-white shadow controls w-full dark:bg-blackDark-2 rounded-[10px] transition-color duration-300 p-[30px] text-white text-center">
            </div>
          </aside>
          {/* Section -> Grafics */}
          <section
            className="row-span-1 col-span-1 rounded-[10px] overflow-y-auto relative transition-color duration-300 ">
            <PanelSection />
          </section>

          {/* Footer -> Messages to Arduino */}
          <footer className=" dark:bg-blackDark-3 col-span-2 transition-color duration-300 pb-[1rem] flex justify-center"
          >
            <div className="w-[80%] max-w-[80rem] h-full flex justify-evenly gap-[4rem]">
              <img src="./img/EEK__logo.webp" alt="" srcset="" />
              <img src="./img/NASA_logo.webp" alt="" srcset="" />
              <img src="./img/peu.webp" alt="" srcset="" />   
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
