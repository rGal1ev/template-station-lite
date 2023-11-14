import { useProgramStore } from "../../store/program"
import Field from "../../components/UI/Field"
import { ChangeEvent, useEffect, useState } from "react"
import { Developer } from "../../types/program/index"
import { useNavigate } from "react-router-dom"
import { useEditorStore } from "../../store/editor"

export default function DeveloperEditor() {
    const [developer, setDeveloper] = useState<Developer | undefined>(undefined)
    
    const developerId = useEditorStore((state) => state.developerId)
    const getDeveloperBy = useProgramStore((state) => state.developerBy)
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
            <div className=" bg-neutral-700 p-4 rounded mb-4 border-2 border-neutral-500">
                <p className="font-semibold text-sm w-[300px] leading-5 mb-2">Впишите одного из разработчиков учебной программы</p>
                <p className="text-neutral-400 w-[350px]">Информация о разработчиках помещается на второй странице документа</p>
            </div>
            <div className="flex gap-4">
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
            <button onClick={() => navigate(-1)} className="text-sm px-6 py-2 rounded w-fit font-medium dark:bg-[#3A3A3A] bg-[#E1E1E1] text-white">
                Вернуться назад
            </button>
        </div>
    );
}