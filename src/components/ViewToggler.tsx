import { useState } from "react";

const ViewToggler = () => {
    const [mode, setMode] = useState(localStorage.getItem('mode'))

    const defineBackground = () => {
        if(localStorage.getItem('mode') === 'user') {
            setMode('admin')
            localStorage.setItem('mode', 'admin')
            document.body.classList.remove('user')
            document.body.classList.add('admin')
        } else {
            setMode('user')
            localStorage.setItem('mode', 'user')
            document.body.classList.remove('admin')
            document.body.classList.add('user')
        }
    }

    return (
        <label htmlFor="modeToggler" className="flex items-center cursor-pointer">

            <div className="relative">
                <input type="checkbox" readOnly checked={mode === 'user' ? false : true} 
                id="modeToggler" className="sr-only" onClick={defineBackground} />
                <div className={`block ${mode === 'user' ? 'bg-dark' : 'bg-highlight'} w-14 h-8 rounded-full`}></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
                Admin view
            </div>
        </label>
    )
}

export default ViewToggler;