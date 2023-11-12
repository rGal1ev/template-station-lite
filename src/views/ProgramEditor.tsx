import EditorNavBar from "../components/EditorNavBar/EditorNavBar";

import { useParams, Outlet, useOutletContext } from "react-router-dom";
import { useProgramsStore } from "../store/programs";
import { useEffect, useState } from "react";
import { Program } from "../types/program";

type EditingProgramContext = { 
    editingProgramId: string
};

export function useEditingProgramId() {
    return useOutletContext<EditingProgramContext>();
}

export default function ProgramEditor() {
    const [isProgramExist, setProgramExist] = useState<boolean>(false)
    const [editingProgramId, setEditingProgramId] = useState<string>('')

    const get = useProgramsStore((state) => state.get)
    const { id } = useParams()

    function handleProgram(program: Program | undefined) {
        if (program === undefined) {
            setProgramExist(false)
            return
        }

        setProgramExist(true)
    }

    useEffect(() => {     
        if (id === undefined) {
            return
        }
        setEditingProgramId(id)

        const program = get(id)
        handleProgram(program)
    }, [id])

    return (
        <div className="h-[calc(100%-56px)] flex">
            {isProgramExist &&
            <>
                <EditorNavBar />
                <Outlet context={{ editingProgramId }} />
            </>}  
        </div>
    );
}