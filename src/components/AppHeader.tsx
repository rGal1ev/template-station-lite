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
        <header className="flex items-center justify-between bg-header-bg h-12 px-3">
            <button onClick={() => navigate('/')} className=" text-left text-sm font-bold leading-4 text-white">
                Конструктор<br /> рабочих программ
            </button>

            {isProgramEditing && "Редактируем!"}

            <div>
                <button onClick={createEmptyProgram} className="bg-accent text-sm px-6 py-2 rounded text-white font-medium">
                    Создать программу
                </button>
            </div>
        </header>
    );
}
