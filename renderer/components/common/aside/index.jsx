import { FaHome, FaDatabase } from "react-icons/fa";
import Link from "next/link";
import { ThemeBtn } from "./themeBtn";

export function Aside({children}) {
    return (<>
        <aside className=" text-black dark:bg-black grid justify-items-center row-span-1 grid-rows-[180px_1fr] gap-[10px] grid-cols-1 transition-color duration-300 overflow-y-auto scroll">
            {/* Navigation */}
            <div className="bg-white shadow dark:bg-blackDark-2 w-full rounded-[10px] transition-color duration-300 grid grid-rows-3 gap-[5px] text-center p-[15px] text-[15px] ">
                {/* theme button */}
                <ThemeBtn/>
                {/* home */}
                <Link href="/home">
                    <div className="w-full px-[10px] rounded-[10px] grid grid-cols-[30px_1fr] items-center cursor-pointer bg-lightBlue hover:bg-lightBlue  dark:bg-blackDark-4  dark:hover:bg-greyDark-1 text-white transition-color duration-300">
                    <div className="flex justi
                    fy-center items-center h-full"><FaHome className="w-full h-[50%]"/></div>
                    <p className="pl-[20px] text-left text-[20px] font-bold">Home</p>
                    </div>
                </Link >
                {/* Admin panel */}
                <Link href="/manageDB">
                    <div className="w-full px-[10px] rounded-[10px] grid grid-cols-[30px_1fr] items-center cursor-pointer bg-blue hover:bg-lightBlue  dark:hover:bg-greyDark-1 text-white transition-color duration-300">
                    <div className="flex justify-center items-center h-full"><FaDatabase className="w-full h-[50%]"/></div>
                    <p className="pl-[20px] text-left text-[20px] font-bold">Manage Database</p>
                    </div>
                </Link >
            </div>
            {children}
        </aside>
    </>);
}