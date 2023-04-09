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
            <FaSun className="w-full h-full"/> : 
            <FaMoon className="w-full h-full"/> 
        );
    }
    return <>
        <button className="
            bg-blue2
            text-white
            dark:bg-white
            dark:text-black
            w-[40px]
            h-[40px]
            rounded-[100px]
            cursor-pointer
            transition-color
            duration-300
            p-[8px]
        "
        onClick={handleThemeSwitch}>
            {contentButton}
        </button>
    </>
}