import { useState } from "react";
import { useProgramsStore } from "../store/programs";

import ProgramCard from "../components/ProgramCard";
import { useNavigate } from "react-router-dom";

export default function ProgramList() {
    const [isProgramListShowed, setProgramListShowed] = useState<boolean>(true);

    const programList = useProgramsStore((state) => state.programList);
    const getProgramCount = useProgramsStore((state) => state.getCount);

    const navigate = useNavigate();
    
    function handleProgramClick(id: string) {
        navigate(`/program/${id}`)
    }

    return (
        <div className=" p-4">
            <div className="flex gap-2 items-center mb-2">
                <p className="font-semibold">Список документов</p>

                {!(getProgramCount() === 0) &&
                    <button onClick={() => {setProgramListShowed((prev) => !prev)}} className="text-secondary-text">
                    {isProgramListShowed ? 'Скрыть' : 'Показать'}
                    </button>
                }
            </div>

            <div className="flex flex-wrap gap-5">
                {isProgramListShowed && programList.map(program => (
                    <ProgramCard onClick={(id) => handleProgramClick(id)} key={program.id} id={program.id} name={program.title} />
                ))}
            </div>
        </div>
    );
}
