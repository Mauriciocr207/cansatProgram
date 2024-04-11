import { ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
export function Alert({children, type = "success", title="Estatus"}) {
    const alerts = {
        success: {icon: <CheckCircleIcon className='w-5 text-green-500 dark:text-green-400'/>, classColor: "bg-green-100 dark:bg-green-900 text-green-700/90 dark:text-green-300/90", headColor: "text-green-500 dark:text-green-300"},
        danger: {icon: <XCircleIcon className='w-5 text-red-500'/>, classColor: "bg-red-100 dark:bg-red-900 text-red-700/90 dark:text-red-300/90", headColor: "text-red-500 dark:text-red-300"},
        warning: {icon: <ExclamationTriangleIcon className='w-5 text-yellow-500'/>, classColor: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700/90 dark:text-yellow-300/90", headColor: "text-yellow-500 dark:text-yellow-300"},
        off: {icon: <InformationCircleIcon className='w-5 text-gray-500'/>, classColor: "bg-gray-100 dark:bg-gray-700 text-gray-700/90 dark:text-gray-300/90", headColor: "text-gray-500 dark:text-gray-300"},
    }
    return (<>
        <div className={`${alerts[type].classColor} p-3 opacity-[70%] rounded-md flex gap-2 flex-row text-sm`}>
            <span>{alerts[type].icon}</span>
            <main className={""}>
                <h3 className={`${alerts[type].headColor} font-medium`}>{title}</h3>
                {children}
            </main>
        </div>
    </>)
}