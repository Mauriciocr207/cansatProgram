import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";


export function ThemeBtn({className}) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(()=> {
        if(darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        console.log(darkMode);
    }, [darkMode]);

    function handleThemeSwitch() {
        setDarkMode(prev => !prev);
    }
    return <>
        <div onClick={handleThemeSwitch} className={`${className} cursor-pointer`}>
            {darkMode ? (<BsFillMoonStarsFill/>):(<MdOutlineWbSunny/>)}
        </div>
    </>
}