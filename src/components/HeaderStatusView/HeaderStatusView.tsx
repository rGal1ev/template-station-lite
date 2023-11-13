import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFilePicker } from "use-file-picker"

import { Program } from "../../types/program"
import { updateImportedProgramsId } from "./helpers"
import {useLocalStorage } from 'usehooks-ts'
 
interface HeaderStatusViewProps {
    isProgramEditing: boolean;
    isHomeViewOpened: boolean;
}

export default function HeaderStatusView({ isProgramEditing, isHomeViewOpened }: HeaderStatusViewProps) {
    const [, setStorageProgramList] = useLocalStorage<Program[]>('program-list', [])
    
    const { openFilePicker, filesContent } = useFilePicker({
        accept: '.json',
    });

    const navigate = useNavigate()

    function handleProgramsImport(importedPrograms: Program[]) {
        const importedProgramsWithNewID = updateImportedProgramsId(importedPrograms)

        setStorageProgramList((prev) => (
            [...prev, ...importedProgramsWithNewID]
        ))
    }

    useEffect(() => {
        filesContent.map((file) => {
            const importedPrograms: Program[] = JSON.parse(file.content)
            handleProgramsImport(importedPrograms)
        })

    }, [filesContent])

    return (
        <div className='flex items-center gap-10'>
            <button onClick={() => navigate('/')} 
                    className={`before:transition-all after:transition-all text-left text-sm font-bold leading-4 dark:text-white text-[#272727] before:absolute before:bg-[#51FF62] hover:before:opacity-60 hover:after:opacity-60 before:w-[70px] before:h-[70px] before:top-[-110%] before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#5158FF] after:w-[70px] after:h-[70px] after:left-[-20px] after:rounded-full after:blur-2xl after:z-[-1] ${isHomeViewOpened ? 'after:opacity-60 before:opacity-60' : 'before:opacity-0 after:opacity-0'}`}>
                Конструктор<br/>рабочих программ
            </button>

            <div className='flex items-center gap-3'>
                    <span className='w-[2px] h-[15px] bg-secondary-text rounded'></span> 
                    {!isProgramEditing ?  
                        <div className='flex gap-3'>
                            <p className='text-secondary-text font-medium w-[150px] leading-4'>Ваши документы сохранены локально</p>     
                            <div className='flex gap-2'>
                                <button onClick={() => openFilePicker()} className='py-1 px-3 dark:bg-[#4A4A4A] bg-[#C5C5C5] font-medium rounded'>Импортировать</button>
                                <button onClick={() => navigate('/export')} className='py-1 px-3 dark:bg-[#4A4A4A] bg-[#C5C5C5] font-medium rounded'>Экспортировать</button>
                            </div>
                        </div>     
                    :
                        <div className='relative before:absolute before:bg-[#489CFF] leading-4 before:w-[70px] before:h-[70px] before:top-[150%] before:opacity-60 before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#9948FF] after:w-[70px] after:h-[70px] after:left-[100px] after:top-[150%] after:opacity-60 after:rounded-full after:blur-2xl after:z-[-1]'>
                            <span className='text-white block text-xm font-medium'>Редактирование<br/>документа</span>
                        </div>}   
            </div>
        </div>
    );
}