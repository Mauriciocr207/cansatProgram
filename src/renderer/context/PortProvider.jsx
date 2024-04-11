import { createContext, useState } from "react"

export const PortContext = createContext();

export default function PortProvider({children}) {
    const [isPortOpen, setIsPortOpen] = useState(false);
    return (<>
        <PortContext.Provider value={{
            isPortOpen,
            setIsPortOpen
        }}>
            {children}
        </PortContext.Provider>
    </>)
}