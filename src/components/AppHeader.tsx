import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useProgramsStore } from '../store/programs';

export default function AppHeader() {
    const location = useLocation();
    const navigate = useNavigate();

    const [isProgramEditing, setProgramEditing] = useState<boolean>(false);

    const getIdCount = useProgramsStore((state) => state.getIdCount);
    const addProgram = useProgramsStore((state) => state.add);

    useEffect(() => {
        const locationPathArray = location.pathname.split('/')

        if (locationPathArray[1] === 'program') {
            setProgramEditing(true);
            return;
        }

        setProgramEditing(false)
    }, [location])

    function createEmptyProgram() {
        const newID: string = `${getIdCount() + 1}`;
        const newEmptyProgram = {
            id: newID,
            title: `Новый документ ${newID}`
        }

        addProgram(newEmptyProgram)
        navigate(`/program/${newID}`)
    }

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
