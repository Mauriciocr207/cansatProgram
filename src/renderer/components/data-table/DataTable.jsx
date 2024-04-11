import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import usePort from "../../hooks/usePort";

export function DataTable() {
    const { isPortOpen } = usePort();
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const fields = [
        "Id",
        "Tiempo",
        "Temperatura",
        "Presión",
        "Velocidad",
        "Altura",
        "Aceleración",
        "Rotación x",
        "Rotación y",
        "Rotación z",
        "LatCP",
        "LongCP",
        "LatCS",
        "LongCS",
    ];
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        ipcRenderer.send('db:get-all', {page});
        ipcRenderer.on('db:get-all', (e, data) => {
            setPagination(data.pagination);
            setColumns(data.measurements)
        });
    }, []);

    useEffect(() => {
        if (isPortOpen) {
            console.log('ocupado');
        } else {
            ipcRenderer.send('db:get-all', {page});
        }
    }, [isPortOpen, page]);

    function getPages() {
        let pages = [];
        for (let i = 1; i <= pagination.pages; i++) {
            pages.push(i);
        }
        return pages;
    }

    return (<>
        <div className="relative shadow-lg overflow-x-auto">
            <table className="rounded-xl overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-transparent">
                <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
                    <tr>
                        {
                            fields.map(field => <>
                                <th key={field} scope="col" className="px-4 py-2">
                                    {field}
                                </th>
                            </>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {columns.map(data => (
                        <tr key={data.id} className="border-b bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-xs">
                            <td className="px-4 py-3.5">{data.id}</td>
                            <td className="px-4 py-3.5">{data.time}</td>
                            <td className="px-4 py-3.5">{data.temperature}</td>
                            <td className="px-4 py-3.5">{data.pressure}</td>
                            <td className="px-4 py-3.5">{data.velocity}</td>
                            <td className="px-4 py-3.5">{data.height}</td>
                            <td className="px-4 py-3.5">{data.aceleration}</td>
                            <td className="px-4 py-3.5">{data.angle_x}</td>
                            <td className="px-4 py-3.5">{data.angle_y}</td>
                            <td className="px-4 py-3.5">{data.angle_z}</td>
                            <td className="px-4 py-3.5">{data.latitude_cp}</td>
                            <td className="px-4 py-3.5">{data.length_cp}</td>
                            <td className="px-4 py-3.5">{data.latitude_cs}</td>
                            <td className="px-4 py-3.5">{data.length_cs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Mostrando {''} 
                <span className="font-semibold text-gray-900 dark:text-white">
                    {((pagination.page - 1)*pagination.perPage + 1)}-{(Math.min(pagination.page*pagination.perPage, pagination.count))}
                </span> 
                {''} de {''}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.count}
                </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-xs h-8">
                <li>
                    <button disabled={page-1 == 0} onClick={(e) => setPage(page => page - 1)} href="#" className={`${page - 1 == 0 ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300':''} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        Anterior
                    </button>
                </li>
                {getPages().map((page) => (<>
                        <li key={page}>
                            <button onClick={(e) => setPage(+e.target.textContent)} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {page}
                            </button>
                        </li>
                    </>)
                )}
                <li>
                    <button disabled={page+1 > pagination.pages} onClick={(e) => setPage(page => page + 1)} href="#" className={`${page + 1 > pagination.pages ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300':''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        Siguiente
                    </button>
                </li>
            </ul>
        </nav>
    </>);
}