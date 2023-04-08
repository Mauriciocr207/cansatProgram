import { useEffect, useState } from "react";

export function ToggleThemeButton() {
    const [theme, setTheme] = useState("light");
    useEffect(()=> {
        if(theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        console.log(document.documentElement)
    }, [theme]);
    function handleThemeSwitch() {
        console.log(theme);
        setTheme( theme === "dark" ? "light" : "dark");
    }
    return <>
        <button className="
            bg-black
            text-white
            dark:bg-white
            dark:text-black
            w-[40px]
            h-[40px]
            rounded-[100px]
            cursor-pointer
            transition-color
            duration-300
        "
        onClick={handleThemeSwitch}>
            {theme}
        </button>
    </>
}