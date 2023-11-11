import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgramsStore } from '../../store/programs'
import { Sun, Moon } from 'react-feather'

import { generateEmptyProgram } from '../HeaderStatusView/helpers'
import HeaderStatusView from '../HeaderStatusView/HeaderStatusView'

export default function AppHeader() {
    const [isDarkMode, setDarkMode] = useState<boolean>(true)
    const addProgram = useProgramsStore((state) => state.add)
    const navigate = useNavigate()

    function createEmptyProgram() {
        const newEmptyProgram = generateEmptyProgram()

        addProgram(newEmptyProgram)
        navigate(`/program/${newEmptyProgram.id}`)
    }

    function handleModeSwitch() {
        setDarkMode(prev => !prev)
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark')
    }, [isDarkMode])

    return (
        <header className="relative z-[1] flex items-center justify-between dark:bg-header-bg bg-[#EBEBEB] h-14 px-3 overflow-clip ">
            <div className='flex items-center gap-10'>
                <HeaderStatusView />
            </div>

            <div className='flex items-center gap-2'>
                <button onClick={handleModeSwitch} className='p-2 rounded dark:bg-[#4A4A4A] bg-[#C5C5C5]'>
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={createEmptyProgram} className="bg-accent text-sm px-6 py-2 rounded text-white font-medium">
                    Создать программу
                </button>
            </div>
        </header>
    );
}
