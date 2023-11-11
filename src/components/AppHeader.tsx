import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useProgramsStore } from '../store/programs';
import { Program } from '../types/program';

export default function AppHeader() {
    const [isProgramEditing, setProgramEditing] = useState<boolean>(false);

    const getProgramCount = useProgramsStore((state) => state.getCount);
    const addProgram = useProgramsStore((state) => state.add);

    const location = useLocation();
    const navigate = useNavigate();

    function processRouteChange() {
        const locationPathArray = location.pathname.split('/');

        if (locationPathArray[1] === 'program') {
            setProgramEditing(true);
            return
        }

        setProgramEditing(false);
    }

    function generateEmptyProgram(newID: string): Program {
        return {
            id: newID,
            title: `Новый документ ${newID}`
        }
    }

    function createEmptyProgram() {
        const newID: string = `${getProgramCount() + 1}`;
        const newEmptyProgram = generateEmptyProgram(newID);

        addProgram(newEmptyProgram);
        navigate(`/program/${newID}`);
    }

    useEffect(() => {
        processRouteChange();
    }, [location])

    return (
        <header className="relative z-[1] flex items-center justify-between bg-header-bg h-14 px-3 overflow-clip ">
            <div className='flex items-center gap-10'>
                <button onClick={() => navigate('/')} 
                        className={`text-left text-sm font-bold leading-4 text-white ${!isProgramEditing ? 'before:absolute before:bg-[#51FF62] before:w-[70px] before:h-[70px] before:top-[-110%] before:opacity-60 before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#5158FF] after:w-[70px] after:h-[70px] after:left-[-20px] after:opacity-60 after:rounded-full after:blur-2xl after:z-[-1]' : ''}`}>
                    Конструктор<br /> рабочих программ
                </button>

                <div className='flex items-center gap-3'>
                    <span className='w-[2px] h-[15px] bg-secondary-text rounded'></span> 
                    {!isProgramEditing ?  
                        <div className='flex gap-3'>
                            <p className='text-secondary-text font-medium w-[150px] leading-4'>Ваши документы сохранены локально</p>     
                            <div className='flex gap-2'>
                                <button className='py-1 px-3 bg-[#4A4A4A] rounded'>Импортировать</button>
                                <button className='py-1 px-3 bg-[#4A4A4A] rounded'>Экспортировать</button>
                            </div>
                        </div>     
                    :
                        <div className='relative before:absolute before:bg-[#489CFF] before:w-[70px] before:h-[70px] before:top-[150%] before:opacity-60 before:left-[50px] before:rounded-full before:blur-2xl before:z-[-1] after:absolute after:bg-[#9948FF] after:w-[70px] after:h-[70px] after:left-[100px] after:top-[150%] after:opacity-60 after:rounded-full after:blur-2xl after:z-[-1]'>
                            <p className='font-medium'><span className='text-secondary-text block text-xm'>Редактирование</span>Рабочая программа</p>
                        </div>}   
                </div>
            </div>

            <div>
                <button onClick={createEmptyProgram} className="bg-accent text-sm px-6 py-2 rounded text-white font-medium">
                    Создать программу
                </button>
            </div>
        </header>
    );
}
