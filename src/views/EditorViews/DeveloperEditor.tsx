import { useProgramStore } from "../../store/program"
import Field from "../../components/UI/Field"
import { ChangeEvent, useEffect, useState } from "react"
import { Developer } from "../../types/program/index"
import { Program } from "../../types/program"
import { useLocation, useNavigate } from "react-router-dom"
import { OpenType } from "../../types/editor"
import { useEditorStore } from "../../store/editor"

export default function DeveloperEditor() {
    const editingProgram = useProgramStore((state) => state.program)
    const developerId = useEditorStore((state) => state.developerId)

    const [developer, setDeveloper] = useState<Developer | undefined>(undefined)
    const getDeveloperBy = useProgramStore((state) => state.developerBy)
    const addDeveloperToProgram = useProgramStore((state) => state.addDeveloper)
    const updateDeveloper = useProgramStore((state) => state.updateDeveloper)

    const navigate = useNavigate()

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
        if (developerId === undefined) return  

        const currentDeveloper: Developer | undefined = getDeveloperBy(developerId)
        if (currentDeveloper === undefined) return
        setDeveloper({...currentDeveloper})
    }, [])

    useEffect(() => {
        return () => {
            if (developer === undefined) return
            updateDeveloper(developer)
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
            <button onClick={() => navigate(-1)}>
                Вернуться назад
            </button>
        </div>
    );
}