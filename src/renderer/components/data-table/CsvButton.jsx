import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'
export default function CsvButton() {
    return (<>
        <a href="" className='flex items-center gap-3 px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            <p className='text-xs'>Descarga csv</p>
            <div className='w-4'>
                <ArrowDownTrayIcon/>
            </div>
        </a>
    </>)
}
