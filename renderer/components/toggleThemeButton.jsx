import { useEffect, useState } from "react";
import {FaSun, FaMoon} from 'react-icons/fa';

export function ToggleThemeButton() {
    const [theme, setTheme] = useState("light");
    const [contentButton, setContentButton] = useState(
        <FaSun className="w-full h-full"/>
    );
    useEffect(()=> {
        if(theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    function handleThemeSwitch() {
        console.log(theme);
        setTheme( theme === "dark" ? "light" : "dark");
        setContentButton(theme === "dark" ? 
            <FaSun className="w-full h-[55%]"/> : 
            <FaMoon className="w-full h-[55%]"/> 
        );
    }
    return <>
        <div onClick={handleThemeSwitch} className="w-full px-[10px] rounded-[10px] grid grid-cols-[30px_1fr] items-center cursor-pointer bg-blue hover:bg-lightBlue dark:hover:bg-greyDark-1 transition-color duration-300 text-white">
            <div className="flex justify-center items-center h-full">
                <button className="
                    
                    dark:text-white
                    h-full
                    cursor-pointer
                    transition-color
                    duration-300
                ">
                    {contentButton}
                </button>
            </div>
            <p className="pl-[20px] text-left text-[20px] font-bold">Theme</p>
        </div>
        
    </>
}