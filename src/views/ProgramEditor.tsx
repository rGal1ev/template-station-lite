import { useParams } from "react-router-dom";
import { useProgramsStore } from "../store/programs";
import { useEffect, useState } from "react";
import { Program } from "../types/program";

export default function ProgramEditor() {
    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined);
    const [isProgramExist, setProgramExist] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    const get = useProgramsStore((state) => state.get);

    const { id } = useParams();

    function handleProgram(program: Program | undefined) {
        if (program === undefined) {
            setProgramExist(false);
            return;
        }

        setEditingProgram(program);
        setProgramExist(true);
        setLoading(false);
    }

    useEffect(() => {        
        if (id === undefined) {
            return;
        }

        const program = get(id);
        handleProgram(program);
    }, [])

    return (
        <div className="p-3">
            {!isLoading &&
                <div>
                    {isProgramExist ? 
                    <div>
                        <p><span className="font-bold mr-1">ID:</span>{editingProgram?.id}</p>
                        <p><span className="font-bold mr-1">TITLE:</span>{editingProgram?.title}</p>
                    </div>
                :
                    <div>
                        Такого документа не существует!
                    </div>
                }    
                </div>
            }  
        </div>
    );
}
