import { useState } from 'react'
import { Popover } from '@headlessui/react'
import { ThemeBtn } from './ThemeBtn';

export default function Navigation() {
  return (
    <header className="bg-black dark:bg-slate-900 h-full text-slate-500 dark:text-slate-300">
      <nav className="h-full mx-auto flex max-w-3xl lg:max-w-5xl xl:max-w-7xl items-center justify-between lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
            <span className="sr-only">Eek</span>
          <a href="/home" className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src="/img/EEK__logo.webp" alt="logo" />
          </a>
        </div>
        <Popover.Group className="flex gap-x-12 text-base font-semibold leading-6">
          <a href="/home" >
            Home
          </a>
          <a href="/arduino-data-visualization">
            Panel de Control
          </a>
          <a href="/data-table">
            Administra tus Datos
          </a>
        </Popover.Group>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <ThemeBtn/>
        </div>
      </nav>
    </header>
  )
}
