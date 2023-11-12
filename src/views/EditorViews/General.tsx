import { ChangeEvent, useEffect, useState } from "react";
import { useEditingProgramId } from "../ProgramEditor";

import { Program } from "../../types/program";
import { useProgramsStore } from "../../store/programs";
import { useOutlet } from "react-router-dom";
import Field, { FieldType } from "../../components/UI/Field";

export default function General() {
    const outlet = useOutlet()

    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined)
    const { editingProgramId } = useEditingProgramId()

    const programDocumentName = () => {
        if (editingProgram === undefined) return
        return `РП_${editingProgram?.academicDiscipline}_${editingProgram?.developmentYear}`
    }

    const get = useProgramsStore((state) => state.get)
    const update = useProgramsStore((state) => state.update)

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

    useEffect(() => {
        setEditingProgram(get(editingProgramId))
    }, [editingProgramId])

    useEffect(() => {
        if (editingProgram === undefined) return

        return () => {
            if (editingProgram === undefined) return
            update(editingProgramId, editingProgram)
        }
    }, [editingProgram])

    return (
        <div>
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

                </div>
            </div>
            :
                outlet
            }
        </div>
        
    );
}