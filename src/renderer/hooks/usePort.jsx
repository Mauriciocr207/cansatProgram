import { useContext } from "react"
import { PortContext } from "../context/PortProvider"

export default function usePort() {
    return useContext(PortContext);
}