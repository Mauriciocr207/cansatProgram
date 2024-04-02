import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";
import { ThemeBtn } from "../../components/Layout/Sidebar/ThemeBtn";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
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
          {children}
          <footer className="col-span-2 flex justify-center items-center">
            <h3 className="text-lg text-slate-600 dark:text-slate-400">
              Powered by Equipo Ee´k
            </h3>
          </footer>
        </div>
      </div>
    </>
  );
}
