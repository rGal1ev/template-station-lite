import { useState } from "react"
import { useProgramsStore } from "../../store/programs"

import { Program } from "../../types/program"
import { duplicateProgram } from "./helpers"
import ProgramCard from "../ProgramCard"

export default function ProgramCardList() {
    const [isProgramListShowed, setProgramListShowed] = useState<boolean>(true)

    const programList = useProgramsStore((state) => state.programList)
    const getProgramsCount = useProgramsStore((state) => state.getCount)
    const getProgramById = useProgramsStore((state) => state.get)
    const addProgram = useProgramsStore((state) => state.add)

    function includeDuplicatedProgram(duplicatedProgram: Program) {
        addProgram(duplicatedProgram)
    }

    function handleProgramDuplication(id: string) {
        const program: Program | undefined = getProgramById(id);
        if (program === undefined) return

        const duplicatedProgram = duplicateProgram(program)
        if (duplicatedProgram === undefined) return

        includeDuplicatedProgram(duplicatedProgram)
    }

    return (
        <div className=" p-4">
            <div className="flex gap-2 items-center mb-2">
                <p className="font-semibold">Все документы</p>

                {!(getProgramsCount() === 0) &&
                    <button onClick={() => {setProgramListShowed((prev) => !prev)}} className="text-secondary-text">
                    {isProgramListShowed ? 'Скрыть' : 'Показать'}
                    </button>
                }
            </div>

            <div className="flex flex-wrap gap-3">
                {isProgramListShowed && programList.map(program => (
                    <ProgramCard onDuplicateClick={(id) => handleProgramDuplication(id)}
                                 key={program.id} 
                                 id={program.id} 
                                 title={program.title} />
                ))}
            </div>
        </div>
    );
}