import { MenuItem, ipcRenderer } from "electron";
import { useEffect, useRef, useState } from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Alert } from "./Alert";

export default function PortInput({ id, title, className }) {
  const contentRef = useRef(null);

  const [textSelect, setTextSelect] = useState('Selecciona');
  const [activeSelect, setActiveSelect] = useState(true);
  const [textAlert, setTextAlert] = useState('...');
  const [typeAlert, setTypeAlert] = useState('off');
  const [activeBtn, setActiveBtn] = useState(false);
  const [height, setHeight] = useState('auto');
  const [overflow, setOverflow] = useState('visible');
  const transitionDuration = 400 // ms
  const [port, setPort] = useState(null);
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    console.log(`serial:open:${id}`);
    if (contentRef.current) {
      setHeight(`${contentRef.current.clientHeight}px`);
    }

    ipcRenderer.on('serial:list-ports', (event, data) => {
      setPorts(data);
    });

    ipcRenderer.on(`serial:open:${id}`, (event, data) => {
      console.log(data);
      const { port, status, message } = data;
      if (status) {
        setActiveBtn(true);
        setTypeAlert('success');
        setTextSelect((
          <>
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <p>{port}</p>
            </div>
          </>
        ));
      } else {
        setTypeAlert('warning');
        setActiveBtn(false);
        setTextSelect((
          <>
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <p>{port}</p>
            </div>
          </>
        ));
      }
      setTextAlert(message);
    });

    ipcRenderer.on(`serial:close:${id}`, (event, data) => {
      console.log(data);
      const { port, status, message } = data;
      if (status) {
        setActiveBtn(false);
        setTypeAlert('off');
        setTextSelect((
          <>
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
              <p>{port}</p>
            </div>
          </>
        ));
      } else {
        setTypeAlert('warning');
        setActiveBtn(false);
        setTextSelect((
          <>
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <p>{port}</p>
            </div>
          </>
        ));
      }
      setTextAlert(message);
    });

  }, []);

  function toggleCollapse() {
    setActiveSelect(activeSelectPrev => {
      if (!activeSelectPrev) {
        setOverflow('hidden');
        setHeight('0px');
      } else {
        setHeight(`${contentRef.current.clientHeight}px`);
        setTimeout(() => {
          setOverflow('visible');
        }, transitionDuration);
      }
      return !activeSelectPrev;
    });
  }

  function handlePortNameClick(e) {
    const portPath = e.target.textContent;
    if (portPath !== port) {
      setPort(portPath);
      setTextSelect((
        <>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            <p>{portPath}</p>
          </div>
        </>
      ));
      setTypeAlert('off');
      setTextAlert('...');
      if (port) {
        ipcRenderer.send("serial:close", { port, id });
      }
    }
  }

  function handleTogglePortBtn() {
    if (port) {
      if (!activeBtn) {
        ipcRenderer.send("serial:open", { port, id });
      } else {
        ipcRenderer.send("serial:close", { port, id });
      }
    }
  }


  return (
    <>
      <li className={`${className}`}>
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer" onClick={toggleCollapse}>{title}</h2>
        <div className="mt-3 pl-2 transition-[height] overflow-auto border-l-2 dark:border-gray-600" style={{ height, overflow, transitionDuration: `${transitionDuration}ms` }}>
          <div ref={contentRef} className="pl-3 pb-2">
            <h3 className="text-xs text-slate-500 dark:text-slate-300/90  font-medium mb-2">Selecciona un puerto</h3>
            <div className="pl-1 mt-1 w-full text-xs flex items-center gap-3">
              <Menu as="div" className="relative inline-block text-left flex-grow">
                {({ open }) => {
                  if (open) {
                    ipcRenderer.send('serial:list-ports');
                  }
                  return (
                    <>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-slate-500 dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-sky-500 hover:bg-gray-50 dark:hover:bg-slate-800">
                        <span className="flex-grow text-left">{textSelect}</span>
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 py-1 z-[100] mt-2 w-full origin-top-right rounded-md bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black dark:ring-sky-500 ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {ports.length > 0 ? (
                              ports.map(({ path }) => (
                                <Menu.Item key={path}>
                                  {({ active }) => (
                                    <div
                                      className={`${active ? 'bg-gray-100 text-gray-900 dark:bg-slate-700' : 'text-gray-700'} block px-4 py-2 font-semibold text-sm text-slate-500 dark:text-slate-300 cursor-pointer`}
                                      onClick={handlePortNameClick}
                                    >
                                      <p>{path}</p>
                                    </div>
                                  )}
                                </Menu.Item>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 cursor-not-allowed">
                                No hay puertos disponibles
                              </div>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )
                }}
              </Menu>
              <button onClick={handleTogglePortBtn} className={`${activeBtn ? 'bg-indigo-600' : 'bg-gray-400 dark:bg-gray-500'} w-11 h-6 px-0.5 flex items-center rounded-full`}>
                <span className="w-5 h-5 bg-white block rounded-full transition-transform flex items-center justify-center" style={{ transform: `translate(${activeBtn ? 20 : 0}px,0)` }}></span>
              </button>
            </div>
            <h3 className="text-xs text-slate-500 dark:text-slate-300/90 font-medium my-2">Estatus del puerto</h3>
            <div className="pl-1 mt-1 text-xs">
              <Alert type={typeAlert}>
                <div>{textAlert}</div>
              </Alert>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
