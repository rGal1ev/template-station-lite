import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useFilePicker } from "use-file-picker"

import { Program } from "../../types/program"
import { updateImportedProgramsId } from "./helpers"
import { useLocalStorage } from 'usehooks-ts'
import { useProgramStore } from "../../store/program"
import Field, { FieldStyle } from "../UI/form/Field"
import toast from 'react-hot-toast'

interface HeaderStatusViewProps {
    isProgramEditing: boolean;
    isHomeViewOpened: boolean;
}

export default function HeaderStatusView({ isProgramEditing, isHomeViewOpened }: HeaderStatusViewProps) {
    const [, setStorageProgramList] = useLocalStorage<Program[]>('program-list', [])
    
    const editingProgramTitle = useProgramStore((state) => state.program?.title)
    const updateProgramTitle = useProgramStore((state) => state.updateTitle)
    
    const isProgramFinished = useProgramStore((state) => state.program?.isFinished)
    const updateProgramFinishedStatus = useProgramStore((state) => state.updateFinishedStatus)

    const navigate = useNavigate()

    const { openFilePicker, filesContent, clear } = useFilePicker({
        accept: '.json',
    });

    filesContent.map((file) => {
        const importedPrograms: Program[] = JSON.parse(file.content)
        handleProgramsImport(importedPrograms)

        clear()
    })

    function handleProgramsImport(importedPrograms: Program[]) {
        const importedProgramsWithNewID = updateImportedProgramsId(importedPrograms)

        setStorageProgramList((prev) => (
            [...prev, ...importedProgramsWithNewID]
        ))
        
        toast.success(`Импортировано ${importedProgramsWithNewID.length} прогамм(ы)`)
    }

    function handleProgramTitleChange(e: ChangeEvent<HTMLInputElement>) {
        updateProgramTitle(e.target.value)
    }

    function handleProgramFinishStatusClick() {
        updateProgramFinishedStatus(!isProgramFinished)
    }

    return (
        <div className='flex items-center gap-10'>
            <button onClick={() => navigate('/')} 
                    className={`before:transition-all after:transition-all text-left text-sm font-bold leading-4 text-neutral-50 before:absolute before:bg-[#51FF62] hover:before:opacity-60 hover:after:opacity-60 before:w-[70px] before:h-[70px] before:top-[-110%] before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#5158FF] after:w-[70px] after:h-[70px] after:left-[-20px] after:rounded-full after:blur-2xl after:z-[-1] ${isHomeViewOpened ? 'after:opacity-60 before:opacity-60' : 'before:opacity-0 after:opacity-0'}`}>
                Конструктор<br/>рабочих программ
            </button>

            <div className='flex items-center gap-3 '>
                    <span className='w-[2px] h-[15px] bg-neutral-400 rounded'></span>

                    {!isProgramEditing ?  
                        <div className='flex gap-3 items-center ml-2'>
                            <p className='text-neutral-400 font-medium w-[150px] leading-4 select-none'>Ваши документы сохранены локально</p>     
                            <div className='flex'>
                                <button onClick={() => openFilePicker()} className='transition-all py-1 px-3 bg-neutral-600 border-2 border-transparent hover:border-neutral-400 rounded-l-full font-medium'>Импортировать</button>
                                <button onClick={() => navigate('/export')} className='transition-all py-1 px-3 bg-neutral-700 border-2 border-transparent hover:border-neutral-400 rounded-r-full font-medium'>Экспортировать</button>
                            </div>
                        </div>   
                        
                    :
                    
                        <div className="flex items-center gap-1">
                            <Field style={FieldStyle.TRANSPARENT} onChange={handleProgramTitleChange} value={editingProgramTitle} />

                            <button onClick={handleProgramFinishStatusClick} className="ml-2 transition-all py-1 px-3 bg-neutral-600 border-2 border-transparent hover:border-neutral-400 rounded-full font-medium">
                                {isProgramFinished ? 'Отметить как редактируемое' : 'Отметить как завершенное'}
                            </button>
                        </div> 
                    } 
            </div>
        </div>
    );
}