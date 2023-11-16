import { useProgramStore } from "../../store/program"
import Field from "../../components/UI/form/Field"
import { ChangeEvent, useEffect, useState } from "react"
import { Developer } from "../../types/program/index"
import { useNavigate } from "react-router-dom"
import { useEditorStore } from "../../store/editor"
import OutletLayout from "../../components/UI/OutletLayout"
import RoundedButton from "../../components/UI/buttons/RoundedButton"
import Row from "../../components/UI/Row"
import Column from "../../components/UI/columns/Column"
import Label from "../../components/UI/form/Label"

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
        <OutletLayout>
            <div className=" bg-neutral-700 p-4 rounded mb-4 border-2 border-neutral-500">
                <p className="font-semibold text-sm w-[300px] leading-5 mb-2">Впишите одного из разработчиков учебной программы</p>
                <p className="text-neutral-400 w-[350px]">Информация о разработчиках помещается на второй странице документа</p>
            </div>

            <Row>
                <Column>
                    <Label title="Имя разработчика"/>
                    <Field value={developer?.name} onChange={handleDeveloperNameChange} />
                </Column>

                <Column>
                    <Label title="Должность"/>
                    <Field value={developer?.post} onChange={handleDeveloperPostChange} />
                </Column>
            </Row>
            <RoundedButton title="Вернуться назад" onClick={() => navigate(-1)}/>
        </OutletLayout>
    );
}