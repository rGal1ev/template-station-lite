import { useEffect, useState } from "react"

import { Program } from "../../types/program"
import { duplicateProgram, getProgramById, deleteProgramFromList, updateProgramInList } from "./helpers"
import ProgramCard from "../ProgramCard/ProgramCard"
import ProgramSideBar from "../ProgramSideBar/ProgramSideBar"
import { useLocalStorage } from 'usehooks-ts'
import { useNavigate } from "react-router-dom"
import { useProgramStore } from "../../store/program"
import { useEditorStore } from "../../store/editor"

export default function ProgramCardList() {
    const [isProgramListShowed, setProgramListShowed] = useState<boolean>(true)
    const [isSideBarOpened, setSideBarOpened] = useState<boolean>(false)
    const [sideBarProgramId, setSideBarProgramId] = useState<string>('')

    const [storageProgramList, setStorageProgramList] = useLocalStorage<Program[]>('program-list', [])
    
    const editingProgram = useProgramStore((state) => state.program)
    const updateEditingProgram = useProgramStore((state) => state.update)

    const clearEditingProgram = useProgramStore((state) => state.clear)
    const clearEditingState = useEditorStore((state) => state.clear)
    const setEditingProgram = useEditorStore((state) => state.updateId)

    const navigate = useNavigate()

    function includeDuplicatedProgram(duplicatedProgram: Program) {
        setStorageProgramList((prev) => ([...prev, duplicatedProgram]))
    }

    function handleProgramDuplication(id: string) {
        const program: Program | undefined = getProgramById(id, storageProgramList);
        if (program === undefined) return

        const duplicatedProgram = duplicateProgram(program)
        if (duplicatedProgram === undefined) return

        includeDuplicatedProgram(duplicatedProgram)
    }

    function handleProgramDelete(id: string) {
        setStorageProgramList(deleteProgramFromList(id, storageProgramList))
    }

    function handleProgramOpening(id: string) {
        const program: Program | undefined = getProgramById(id, storageProgramList);
        if (program === undefined) return

        updateEditingProgram(program)
        setEditingProgram(id)
        
        navigate('/program/general')
    }

    function handleSideBarOpen(id: string) {
        setSideBarProgramId(id)
        setSideBarOpened(true)
    }

    function handleSideBarClose() {
        setSideBarOpened(false)
        setSideBarProgramId('')
    }

    useEffect(() => {
        if (editingProgram === undefined) return

        const updatedStorageList = updateProgramInList(editingProgram, storageProgramList)
        setStorageProgramList([...updatedStorageList])

        clearEditingProgram()
        clearEditingState()
    }, [])

    return (
        <div className=" p-4">
            <div className="flex gap-2 items-center mb-2">
                <p className="font-semibold">Все документы</p>

                {!(storageProgramList.length === 0) &&
                    <button onClick={() => {setProgramListShowed((prev) => !prev)}} className="text-secondary-text">
                        {isProgramListShowed ? 'Скрыть' : 'Показать'}
                    </button>
                }
            </div>

            <div className="flex flex-wrap gap-3">
                {isProgramListShowed && storageProgramList.map(program => (
                    <ProgramCard onClick={(id) => handleProgramOpening(id)}
                                 onDuplicateClick={(id) => handleProgramDuplication(id)}
                                 onInfoClick={(id) => handleSideBarOpen(id)}
                                 onDeleteClick={(id) => handleProgramDelete(id)}
                                 key={program.id} 
                                 id={program.id} 
                                 title={program.title} />
                ))}
            </div>

            <ProgramSideBar onClose={handleSideBarClose} programId={sideBarProgramId} isOpened={isSideBarOpened} />
        </div>
    );
}
