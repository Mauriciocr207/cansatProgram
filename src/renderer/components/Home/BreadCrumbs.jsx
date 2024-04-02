import { useRouter } from "next/router";
import { FaHome, FaGreaterThan } from "react-icons/fa";


export function BreadCrumbs() {
    
    const router = useRouter();
    const paths = router.pathname.slice(1).split('/');
    return (<>
        <div className="text-[13px] flex items-center gap-2 text-slate-500">
            <a href="/home" className="text-[18px]"><FaHome/></a> 
            {paths.map((path, i) => {
                const text = path.replaceAll('-', ' ');
                return (<>
                    <FaGreaterThan className="text-[11px]"/>
                    <a key={i} href={`/${path}`}>{text}</a>
                </>)
            })}
        </div>
    </>)
}   