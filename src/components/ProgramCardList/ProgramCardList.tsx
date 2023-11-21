import { useEffect, useState } from "react"

import { Program } from "../../types/program"
import { duplicateProgram, getProgramById, deleteProgramFromList, updateProgramInList, pinProgramFromList } from "./helpers"
import ProgramCard from "../ProgramCard/ProgramCard"
import ProgramSideBar from "../ProgramSideBar/ProgramSideBar"
import { useLocalStorage } from 'usehooks-ts'
import { useNavigate } from "react-router-dom"
import { useProgramStore } from "../../store/program"
import { useEditorStore } from "../../store/editor"
import { Paperclip } from 'react-feather'
import toast from 'react-hot-toast'
import { useApiStore } from "../../store/api"
import axios from "axios"

export default function ProgramCardList() {
    const [isSideBarOpened, setSideBarOpened] = useState<boolean>(false)
    const [sideBarProgramId, setSideBarProgramId] = useState<string>('')
    
    const editingProgram = useProgramStore((state) => state.program)
    const updateEditingProgram = useProgramStore((state) => state.update)

    const clearEditingProgram = useProgramStore((state) => state.clear)
    const clearEditingState = useEditorStore((state) => state.clear)
    const clearAPIData = useApiStore((state) => state.clear)
    const setEditingProgram = useEditorStore((state) => state.updateId)

    const [storageProgramList, setStorageProgramList] = useLocalStorage<Program[]>('program-list', [])
    const navigate = useNavigate()

    const groupedByDatePrograms = storageProgramList.reduce((acc, item) => {
        const date = item.createdAt
  
        if (!acc[date]) {
          acc[date] = [];
        }
  
        acc[date].push(item);
        return acc;
    }, {} as Record<string, Program[]>);

    const sortedKeys = Object.keys(groupedByDatePrograms).sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());
    const sortedGroupedByDatePrograms = sortedKeys.reduce((acc, key) => {
        acc[key] = groupedByDatePrograms[key];
        return acc;
    }, {} as Record<string, Program[]>);

    const pinnedPrograms = storageProgramList.filter((program: Program) => program.isPinned)

    function includeDuplicatedProgram(duplicatedProgram: Program) {
        setStorageProgramList((prev) => ([...prev, duplicatedProgram]))
    }

    function handleProgramDuplication(id: string) {
        const program: Program | undefined = getProgramById(id, storageProgramList)
        if (program === undefined) return

        const duplicatedProgram = duplicateProgram(program)
        if (duplicatedProgram === undefined) return

        includeDuplicatedProgram(duplicatedProgram)
    }

    function handleProgramDelete(id: string) {
        setStorageProgramList(deleteProgramFromList(id, storageProgramList))
        toast.success("Программа удалена")
    }

    function handleProgramOpening(id: string) {
        const program: Program | undefined = getProgramById(id, storageProgramList)
        if (program === undefined) return

        updateEditingProgram(program)
        setEditingProgram(id)
        
        navigate('/program/general')
    }

    function handlePinned(id: string) {
        setStorageProgramList(pinProgramFromList(id, storageProgramList))
    }

    function handleSideBarOpen(id: string) {
        setSideBarProgramId(id)
        setSideBarOpened(true)
    }

    function handleSideBarClose() {
        setSideBarOpened(false)
        setSideBarProgramId('')
    }

    async function generateAndDownloadProgram(program: Program) {
        const res = await axios({
            url: 'http://localhost:5000/api/generate',
            method: 'POST',
            data: program,
            headers: {
                'Accept':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            responseType: 'blob'
        })

        const file = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = `${program.title}.docx`;

        a.click()
    }


    function handleDocumentGeneration(id: string) {
        const program: Program | undefined = getProgramById(id, storageProgramList)
        if (program === undefined) return

        const generationPromise = generateAndDownloadProgram(program)

        toast.promise(generationPromise, {
            loading: 'Программа отправлена на формирование',
            success: 'Документ успешно сформирован',
            error: 'Произошла ошибка',
        })
    }

    useEffect(() => {
        if (editingProgram === undefined) return

        const updatedStorageList = updateProgramInList(editingProgram, storageProgramList)
        setStorageProgramList([...updatedStorageList])

        toast.success("Программа сохранена")

        clearEditingProgram()
        clearEditingState()
        clearAPIData()
    }, [])

    return (
        <div className="p-4">
            {!(pinnedPrograms.length === 0) &&
                <>
                    <div className="flex gap-1 items-center mb-2 select-none">
                        <Paperclip size={15} />
                        <p className="font-semibold">Закрепленные</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                    {pinnedPrograms.map((program: Program) => (
                        <ProgramCard onGenerateClick={(id) => handleDocumentGeneration(id)}
                                     onClick={(id) => handleProgramOpening(id)}
                                     onDuplicateClick={(id) => handleProgramDuplication(id)}
                                     onInfoClick={(id) => handleSideBarOpen(id)}
                                     onDeleteClick={(id) => handleProgramDelete(id)}
                                     onPinnedClick={(id) => handlePinned(id)}
                                     key={program.id} 
                                     id={program.id} 
                                     title={program.title} 
                                     isPinned={program.isPinned}/>
                    ))}
                    </div>
                </>
            }
            
            <div className="flex gap-2 items-center mb-2 select-none">
                <p className="font-semibold">Все документы</p>
            </div>

            {Object.keys(sortedGroupedByDatePrograms).map(date => (
                <div key={date}>
                    <h3 className="text-neutral-400 mb-2 font-semibold">{date}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {sortedGroupedByDatePrograms[date].map((program: Program) => (
                            <ProgramCard onGenerateClick={(id) => handleDocumentGeneration(id)}
                                         onClick={(id) => handleProgramOpening(id)}
                                         onDuplicateClick={(id) => handleProgramDuplication(id)}
                                         onInfoClick={(id) => handleSideBarOpen(id)}
                                         onDeleteClick={(id) => handleProgramDelete(id)}
                                         onPinnedClick={(id) => handlePinned(id)}
                                         key={program.id} 
                                         id={program.id} 
                                         title={program.title} 
                                         isPinned={program.isPinned}/>
                        ))}
                    </div>
                </div>
            ))}

            <ProgramSideBar onClose={handleSideBarClose} programId={sideBarProgramId} isOpened={isSideBarOpened} />
        </div>
    );
}
