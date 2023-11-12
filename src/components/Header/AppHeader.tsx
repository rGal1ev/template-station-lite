import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProgramsStore } from '../../store/programs'
import { Sun, Moon } from 'react-feather'

import { generateEmptyProgram } from '../../helpers/generateEmptyProgram'
import HeaderStatusView from '../HeaderStatusView/HeaderStatusView'
import { Program } from '../../types/program'

export default function AppHeader() {
    const [isProgramEditing, setProgramEditing] = useState<boolean>(false)
    const [isHomeViewOpened, setHomeViewOpened] = useState<boolean>(true)

    const [editingProgram, setEditingProgram] = useState<Partial<Program> | undefined>(undefined)
    const [editingProgramId, setEditingProgramId] = useState<string | undefined>(undefined)
    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    const addProgram = useProgramsStore((state) => state.add)
    const get = useProgramsStore((state) => state.get)

    const location = useLocation()
    const navigate = useNavigate()

    function createEmptyProgram() {
        const newEmptyProgram = generateEmptyProgram()

        addProgram(newEmptyProgram)
        navigate(`/program/${newEmptyProgram.id}/general`)
    }

    function handleModeSwitch() {
        setDarkMode(prev => !prev)
    }

    function processRouteChange() {
        const locationPathArray = location.pathname.split('/')

        switch (locationPathArray[1]) {
            case 'program':
                setEditingProgramId(locationPathArray[2])

                setProgramEditing(true)
                setHomeViewOpened(false)
                break

            case '':
                setProgramEditing(false)
                setHomeViewOpened(true)
                break

            default:
                setProgramEditing(false)
                setHomeViewOpened(false)
                break
          }
    }

    function handleExporting() {
        if (editingProgram === undefined) return

        const programToExport = JSON.parse(JSON.stringify([editingProgram]))
        programToExport.id = ''

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(programToExport)
        )}`;

        const link = document.createElement("a");

        link.href = jsonString;
        link.download = `${Date.now()}.json`;
    
        link.click();
    }

    function handleProgramChange() {
        if (editingProgramId === undefined) return
        const program = get(editingProgramId)

        if (program === undefined) return
        setEditingProgram(program)
    }

    useEffect(() => {
        processRouteChange()
    }, [location])

    useEffect(() => {
        document.documentElement.classList.toggle('dark')
    }, [isDarkMode])

    useEffect(() => {
        handleProgramChange()
    }, [editingProgramId])

    return (
        <header className="relative z-[1] flex items-center justify-between dark:bg-header-bg bg-[#EBEBEB] h-14 px-3 overflow-clip border-b-2 border-[#808080]">
            <div className='flex items-center gap-10'>
                <HeaderStatusView programTitle={editingProgram?.title || '...'} isHomeViewOpened={isHomeViewOpened} isProgramEditing={isProgramEditing} />
            </div>

            <div className='flex items-center gap-2'>
                <button onClick={handleModeSwitch} className='p-2 rounded transition-all border-2 border-[#4A4A4A] hover:[#4A4A4A] hover:bg-[#4A4A4A]'>
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {isProgramEditing && 
                <>
                    <button onClick={createEmptyProgram} className="transition-all border-2 border-[#4A4A4A] hover:border-red-500 hover:bg-red-500 text-sm px-6 py-2 rounded text-white font-medium">
                        Удалить
                    </button>

                    <button onClick={handleExporting} className="transition-all hover:bg-accent hover:border-accent border-2 border-[#4A4A4A] text-sm px-6 py-2 rounded text-white font-medium">
                        Экспортировать документ
                    </button>
                </>}
                
                { isHomeViewOpened &&  
                <button onClick={createEmptyProgram} className="transition-all hover:bg-accent hover:border-accent border-2 border-[#4A4A4A] text-sm px-6 py-2 rounded text-white font-medium">
                    Создать программу
                </button>}    
            </div>
        </header>
    );
}
