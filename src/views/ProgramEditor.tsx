import { useParams } from "react-router-dom";
import { useProgramsStore } from "../store/programs";
import { useEffect, useState } from "react";
import { Program } from "../types/program";

export default function ProgramEditor() {
    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined);
    const [isProgramExist, setProgramExist] = useState<boolean>(false);

    const get = useProgramsStore((state) => state.get);

    const { id } = useParams();

    function handleProgram(program: Program | undefined) {
        if (program === undefined) {
            setProgramExist(false);
            return;
        }

        setEditingProgram(program);
        setProgramExist(true);
    }

    useEffect(() => {        
        if (id === undefined) {
            return;
        }

        const program = get(id);
        handleProgram(program);
    }, [])

    return (
        <div>
            {isProgramExist ? 
                <div>
                    Редактирование документа! <br/><br/>

                    ID: {editingProgram?.id} <br/>
                    TITLE: {editingProgram?.title} <br/>
                </div>
            :
                <div>
                    Такого документа не существует!
                </div>
            }         
        </div>
    );
}
