import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";

import { Program } from "../../types/program";
import { updateImportedProgramsId } from "./helpers";
import { useProgramsStore } from "../../store/programs";
 
export default function HeaderStatusView() {
    const [isProgramEditing, setProgramEditing] = useState<boolean>(false)
    const [isHomeViewOpened, setHomeViewOpened] = useState<boolean>(true)

    const addProgram = useProgramsStore((state) => state.add)

    const { openFilePicker, filesContent } = useFilePicker({
        accept: '.json',
    });

    const location = useLocation()
    const navigate = useNavigate()

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

    function handleProgramsImport(importedPrograms: Program[]) {
        const importedProgramsWithNewID = updateImportedProgramsId(importedPrograms)

        importedProgramsWithNewID.forEach(program => {
            addProgram(program)
        })
    }

    useEffect(() => {
        processRouteChange()
    }, [location])

    useEffect(() => {
        filesContent.map((file) => {
            const importedPrograms: Program[] = JSON.parse(file.content)
            handleProgramsImport(importedPrograms)
        })

    }, [filesContent])

    return (
        <div className='flex items-center gap-10'>
            <button onClick={() => navigate('/')} 
                    className={`text-left text-sm font-bold leading-4 dark:text-white text-[#272727] ${isHomeViewOpened ? 'before:absolute before:bg-[#51FF62] before:w-[70px] before:h-[70px] before:top-[-110%] before:opacity-60 before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#5158FF] after:w-[70px] after:h-[70px] after:left-[-20px] after:opacity-60 after:rounded-full after:blur-2xl after:z-[-1]' : ''}`}>
                Конструктор<br /> рабочих программ
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
                        <div className='relative before:absolute before:bg-[#489CFF] before:w-[70px] before:h-[70px] before:top-[150%] before:opacity-60 before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#9948FF] after:w-[70px] after:h-[70px] after:left-[100px] after:top-[150%] after:opacity-60 after:rounded-full after:blur-2xl after:z-[-1]'>
                            <p className='font-medium'><span className='text-secondary-text block text-xm'>Редактирование</span>Рабочая программа</p>
                        </div>}   
            </div>
        </div>
    );
}