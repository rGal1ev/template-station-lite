import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProgramStore } from '../../store/program'
import { useLocalStorage } from 'usehooks-ts'
import { Sun, Moon } from 'react-feather'

import { generateEmptyProgram } from '../../helpers/generateEmptyProgram'
import HeaderStatusView from '../HeaderStatusView/HeaderStatusView'
import { Program } from '../../types/program'
import { useEditorStore } from '../../store/editor'

export default function AppHeader() {
    const [isProgramEditing, setProgramEditing] = useState<boolean>(false)
    const [isHomeViewOpened, setHomeViewOpened] = useState<boolean>(true)
    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    const editingProgram = useProgramStore((state) => state.program)
    const updateEditorProgramId = useEditorStore((state) => state.updateId)
    const updateEditingProgram = useProgramStore((state) => state.update)

    const [, setStorageProgramList] = useLocalStorage<Program[]>('program-list', [])

    const location = useLocation()
    const navigate = useNavigate()

    function saveNewProgram(program: Program) {
        setStorageProgramList((prevList) => [...prevList, program])
        updateEditingProgram(program)
    }

    function createEmptyProgram() {
        const newEmptyProgram: Program = generateEmptyProgram()

        setStorageProgramList((prev) => (
            [...prev, newEmptyProgram]
        ))

        updateEditorProgramId(newEmptyProgram.id)
        saveNewProgram(newEmptyProgram)

        navigate(`/program/general`)
    }

    function handleModeSwitch() {
        setDarkMode(prev => !prev)
    }

    function processRouteChange() {
        const locationPathArray = location.pathname.split('/')

        switch (locationPathArray[1]) {
            case 'program':
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
        programToExport[0].id = ''

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(programToExport)
        )}`;

        const link = document.createElement("a");

        link.href = jsonString;
        link.download = `${Date.now()}.json`;
    
        link.click();
    }

    useEffect(() => {
        processRouteChange()
    }, [location])

    useEffect(() => {
        document.documentElement.classList.toggle('dark')
    }, [isDarkMode])

    return (
        <header className="relative z-[1] flex items-center justify-between dark:bg-header-bg bg-[#EBEBEB] h-14 px-3 overflow-clip border-b-2 border-[#808080]">
            <div className='flex items-center gap-10'>
                <HeaderStatusView isHomeViewOpened={isHomeViewOpened} isProgramEditing={isProgramEditing} />
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
