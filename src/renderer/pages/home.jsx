import { Popover } from "@headlessui/react";
import Head from "next/head";
import { ThemeBtn } from "../components/Layout/ThemeBtn";
import { FaGithub } from "react-icons/fa";


export default function () {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-screen h-screen relative bg-white dark:bg-slate-900">
        <div className="transition-color grid grid-rows-[5rem_1fr_4rem] grid-cols-[minmax(495px,1fr)] h-screen">
          <div className="h-full w-full">
            <header className="dark:bg-slate-900 h-full text-slate-500 dark:text-slate-300">
              <nav
                className="h-full mx-auto flex max-w-3xl lg:max-w-5xl xl:max-w-7xl items-center justify-between lg:px-8"
                aria-label="Global"
              >
                <div className="flex lg:flex-1">
                  <a href="/home" className="-m-1.5 p-1.5">
                    <span className="sr-only">Eek</span>
                    <img
                      className="h-12 w-auto"
                      src="/img/EEK__logo.webp"
                      alt="logo"
                    />
                  </a>
                </div>
                <Popover.Group className="flex gap-x-12 text-base font-semibold leading-6">
                  <a href="/home">Home</a>
                  <a href="/arduino-data-visualization">Panel de Control</a>
                  <a href="/data-table">Administra tus Datos</a>
                </Popover.Group>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                  <ThemeBtn className={"text-2xl"} />
                </div>
              </nav>
            </header>
          </div>
          <div className="col-span-2 relative overflow-hidden isolate dark:bg-slate-900 flex justify-center items-center gap-x-20 px-24 pt-0">
            <svg
              viewBox="0 0 200 200"
              className="dark:visible invisible absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={100}
                cy={100}
                r={100}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="max-w-2xl text-center text-ceter relative z-100">
              <h2 className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Bienvenido
                <br />
                Soy Jarvis
              </h2>
              <p className="mt-6 text-lg leading-8 dark:text-slate-400 text-slate-600">
                <span className="font-bold dark:text-sky-500">Interfaz Humano Máquina</span> del equipo Eek´.
                <br />
                Empieza ahora a trabajar con tu cansat
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/arduino-data-visualization"
                  className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                >
                  Empezar
                </a>
                <a
                  target="_blank"
                  href="https://github.com/Mauriciocr207/cansatProgram"
                  className="text-sm font-semibold leading-6 text-slate-800 dark:text-slate-300 flex items-center gap-2"
                >
                  <FaGithub /> Proyecto <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <footer className="col-span-2 flex justify-center items-center">
            <h3 className="text-lg text-slate-600 dark:text-slate-400">
              Powered by Equipo Eek´
            </h3>
          </footer>
        </div>
      </div>
    </>
  );
}
