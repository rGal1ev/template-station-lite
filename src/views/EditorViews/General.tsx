import { ChangeEvent, useEffect, useState } from "react";
import { useEditingProgramId } from "../ProgramEditor";

import { Program } from "../../types/program";
import { useProgramsStore } from "../../store/programs";
import { Outlet, useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import Field, { FieldType } from "../../components/UI/Field";
import DeveloperCard from "../../components/Editor/DeveloperCard/DeveloperCard";

type DeveloperContext = {
    developerId: string | undefined
}

export function useDeveloperContext() {
    return useOutletContext<DeveloperContext>()
}

export default function General() {
    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined)
    const [developerId] = useState<string | undefined>(undefined)
    const { editingProgramId } = useEditingProgramId()

    const programDocumentName = () => {
        if (editingProgram === undefined) return
        return `РП_${editingProgram?.academicDiscipline}_${editingProgram?.developmentYear}`
    }

    const get = useProgramsStore((state) => state.get)

    const outlet = useOutlet()
    const navigate = useNavigate()

    function handleFieldsChange(e: ChangeEvent<HTMLInputElement>) {
        if (editingProgram === undefined) return
        
        setEditingProgram(prev => {
            if (prev === undefined) return prev

            return {
                ...prev,
                developmentYear: e.target.value
            }
        })
    }

    function handleAcademicSpecialtyChange(e: ChangeEvent<HTMLInputElement>) {
        if (editingProgram === undefined) return

        setEditingProgram(prev => {
            if (prev === undefined) return prev

            return {
                ...prev,
                academicSpecialty: e.target.value
            }
        })
    }

    function handleAcademicDisciplineChange(e: ChangeEvent<HTMLInputElement>) {
        if (editingProgram === undefined) return

        setEditingProgram(prev => {
            if (prev === undefined) return prev

            return {
                ...prev,
                academicDiscipline: e.target.value
            }
        })
    }

    function handleDeveloperClick(id: number) {
        console.log(id)
    }

    function handleDeveloperDelete(id: number) {
        console.log(id)
    }

    function handleNewDeveloper() {
        navigate('developer', {
            state: {
                someData: ""
            }
        })
    }

    useEffect(() => {
        setEditingProgram(get(editingProgramId))
    }, [editingProgramId])

    useEffect(() => {
        
    }, [])

    return (
        <div className="flex-1">
            {(outlet === null) ?
            
            <div className="p-4">
                <div className="flex gap-4">
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Вычисляемое название документа
                        </label>
                        <Field value={programDocumentName()} readable={FieldType.READONLY} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Год
                        </label>
                        <Field onChange={handleFieldsChange} value={editingProgram?.developmentYear || ''}/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Специальность
                        </label>
                        <Field onChange={handleAcademicSpecialtyChange} value={editingProgram?.academicSpecialty || ''}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Дисциплина
                        </label>
                        <Field onChange={handleAcademicDisciplineChange} value={editingProgram?.academicDiscipline || ''}/>
                    </div>
                </div>

                <div>
                    <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                        Разработчики
                    </label>
                    <nav>
                        <ul className="flex flex-col gap-2">
                            {get(editingProgramId)?.developers.map((developer, index) => (
                                <DeveloperCard key={index}
                                               name={developer.name} 
                                               post={developer.post}
                                               onClick={() => handleDeveloperClick(index)}
                                               onDeleteClick={() => handleDeveloperDelete(index)}/>
                            ))}

                            <button onClick={handleNewDeveloper} className="text-sm px-6 py-2 rounded font-medium dark:bg-[#3A3A3A] bg-[#E1E1E1] text-white">
                                Добавить разработчика
                            </button>
                        </ul>
                    </nav>
                </div>
            </div>
            :
                <Outlet context={{ developerId }} />
            }
        </div>
        
    );
}