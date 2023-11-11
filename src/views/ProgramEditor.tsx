import EditorNavBar from "../components/EditorNavBar";

import { useParams, Outlet, useOutletContext } from "react-router-dom";
import { useProgramsStore } from "../store/programs";
import { useEffect, useState } from "react";
import { Program } from "../types/program";

type ContextType = { editingProgram: Program | undefined };
export function useProgram() {
    return useOutletContext<ContextType>();
}

export default function ProgramEditor() {
    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined)
    const [isProgramExist, setProgramExist] = useState<boolean>(false)

    const get = useProgramsStore((state) => state.get)
    const { id } = useParams()

    function handleProgram(program: Program | undefined) {
        if (program === undefined) {
            setProgramExist(false)
            return
        }

        setEditingProgram(program)
        setProgramExist(true)
    }

    useEffect(() => {        
        if (id === undefined) {
            return
        }

        const program = get(id)
        handleProgram(program)
    }, [id])

    return (
        <div className="h-[calc(100%-56px)] flex">
            {isProgramExist &&
            <>
                <EditorNavBar />
                <Outlet context={{editingProgram}} />
            </>}  
        </div>
    );
}