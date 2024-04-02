import { ThemeBtn } from "../../components/Layout/Sidebar/ThemeBtn";

export default function Layout({ aside, children }) {
    return (
        <>
            <div className="bg-white overflow-hidden dark:bg-slate-900 dark:text-white flex h-screen w-full">
                <div className="relative grid grid-rows-[3rem_1fr_3rem] h-full w-72 border-r border-zinc-900/10 dark:border-white/10 px-6 pb-8 pt-4">
                    <img className="h-12 w-auto" src="/img/EEK__logo.webp" alt="logo" />
                    <nav className="mt-10">
                        <ul>
                            {aside}
                        </ul>
                    </nav>
                    <footer className="">
                        <h3 className="text-base text-center text-slate-600 dark:text-slate-400">
                            Powered by Equipo 
                            <br />
                            Ee´k
                        </h3>
                    </footer>
                </div>
                <div className="flex-col flex-grow">
                    <header className="h-14 w-full border-b border-zinc-900/10 dark:border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div>
                            {/* <BreadCrumbs/> */}
                        </div>
                        <div className="flex items-center gap-5 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-300">
                            <nav className="flex items-center gap-8">
                                <a href="/home">Home</a>
                                <a href="/arduino-data-visualization">Panel de Control</a>
                                <a href="/data-table">Administra tus Datos</a>
                            </nav>
                            <div className="hidden md:block md:h-5 md:w-[2px] md:bg-zinc-900/10 md:dark:bg-white/50"></div>
                            <ThemeBtn className={"text-[1.2rem]"}/>
                        </div>
                    </header>
                    <div className="h-[calc(100%-3.5rem)] flex flex-col px-4 sm:px-6 lg:px-8 pt-14 bg-zinc-50 dark:bg-transparent overflow-y-auto pb-8">
                        <main className="flex-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
