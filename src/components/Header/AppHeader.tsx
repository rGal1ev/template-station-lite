import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProgramStore } from '../../store/program'
import { useLocalStorage } from 'usehooks-ts'

import { generateEmptyProgram } from '../../helpers/generateEmptyProgram'
import HeaderStatusView from '../HeaderStatusView/HeaderStatusView'
import { Program } from '../../types/program'
import { useEditorStore } from '../../store/editor'

export default function AppHeader() {
    const [isProgramEditing, setProgramEditing] = useState<boolean>(false)
    const [isHomeViewOpened, setHomeViewOpened] = useState<boolean>(true)

    const editingProgram = useProgramStore((state) => state.program)
    const updateEditorProgramId = useEditorStore((state) => state.updateId)
    const updateEditingProgram = useProgramStore((state) => state.update)
    const clearEditingProgram = useProgramStore((state) => state.clear)

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

        const programToExport: Program[] = JSON.parse(JSON.stringify([editingProgram]))
        programToExport[0].id = ''
        programToExport[0].isPinned = false

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(programToExport)
        )}`;

        const link = document.createElement("a");

        link.href = jsonString;
        link.download = `${Date.now()}.json`;
    
        link.click();
    }

    function deleteProgram() {
        if (editingProgram === undefined) return

        setStorageProgramList(prev => prev.filter(program => program.id !== editingProgram.id))
        clearEditingProgram()

        navigate('../../')
    }


    useEffect(() => {
        processRouteChange()
    }, [location])

    return (
        <header className="relative z-[1] flex items-center justify-between bg-transparent h-14 px-3 overflow-clip">
            <div className='flex items-center gap-10'>
                <HeaderStatusView isHomeViewOpened={isHomeViewOpened} isProgramEditing={isProgramEditing} />
            </div>

            <div className='flex items-center gap-1'>
                {isProgramEditing && 
                <>
                    <button onClick={deleteProgram} className="transition-all bg-neutral-700 hover:bg-red-600 text-sm px-6 py-2 rounded-l-3xl rounded-r-md text-white font-medium">
                        Удалить
                    </button>

                    <button onClick={handleExporting} className="transition-all bg-neutral-700 hover:bg-sky-700 text-sm px-6 py-2 rounded-l-md rounded-r-3xl text-white font-medium">
                        Экспортировать документ
                    </button>
                </>}

                { isHomeViewOpened &&  
                <button onClick={createEmptyProgram} className="transition-all bg-sky-600 hover:bg-sky-700 text-sm px-6 py-2 rounded-full text-white font-medium">
                    Создать программу
                </button> }    
            </div>
        </header>
    );
}
