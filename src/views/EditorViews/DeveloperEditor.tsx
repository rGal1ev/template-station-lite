import { useDeveloperContext } from "./General";
import { useProgramsStore } from "../../store/programs";
import Field from "../../components/UI/Field";
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Developer, Program } from "../../types/program";

export default function DeveloperEditor() {
    const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined)
    const [developer, setDeveloper] = useState<Developer | undefined>(undefined)

    const { developerId } = useDeveloperContext()
    const { id } = useParams()

    const get = useProgramsStore((state) => state.get)
    const update = useProgramsStore((state) => state.update)
    
    function handleDeveloperNameChange(e: ChangeEvent<HTMLInputElement>) {
        setDeveloper((prev) => {
            if (prev === undefined) return prev

            return {
                ...prev,
                name: e.target.value
            }
        })
    }

    function handleDeveloperPostChange(e: ChangeEvent<HTMLInputElement>) {
        setDeveloper((prev) => {
            if (prev === undefined) return prev

            return {
                ...prev,
                post: e.target.value
            }
        })
    }
    
    useEffect(() => {
        if (id === undefined) return
        setEditingProgram(get(id))
    }, [id])

    useEffect(() => {
        if (developerId === undefined) {
            setDeveloper({
                name: '',
                post: ''
            })

            return
        }

        setDeveloper(editingProgram?.developers[parseInt(developerId)])
    }, [editingProgram])

    useEffect(() => {
        return () => {
            if (editingProgram === undefined) return
            if (developer === undefined) return

            update(editingProgram.id, {
                ...editingProgram,
                developers: [...editingProgram.developers, developer]
            })
        }
    }, [developer])

    return (
        <div className="flex-1 p-4">
            <div className="mb-4">
                <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                    Название разработчика
                </label>
                <Field value={developer?.name || ''} onChange={handleDeveloperNameChange} />
            </div>

            <div className="mb-4">
                <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                    Должность
                </label>
                <Field value={developer?.post || ''} onChange={handleDeveloperPostChange} />
            </div>
        </div>
    );
}