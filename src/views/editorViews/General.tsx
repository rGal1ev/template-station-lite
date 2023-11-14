import { ChangeEvent } from "react"
import { useProgramStore } from "../../store/program"
import { useEditorStore } from "../../store/editor"
import { useNavigate } from "react-router-dom"
import Field, { FieldType } from "../../components/UI/Field"
import DeveloperCard from "../../components/Editor/DeveloperCard/DeveloperCard"
import { v4 as uuid } from "uuid"

export default function General() {
    const { developmentYear, academicSpecialty, academicDiscipline } = useProgramStore((state) => ({
        developmentYear: state.program?.developmentYear,
        academicSpecialty: state.program?.academicSpecialty, 
        academicDiscipline: state.program?.academicDiscipline
    }))

    const { setDevelopmentYear, setAcademicSpecialty, setAcademicDiscipline } = useProgramStore((state) => ({
        setDevelopmentYear: state.setDevelopmentYear,
        setAcademicSpecialty: state.setAcademicSpecialty,
        setAcademicDiscipline: state.setAcademicDiscipline
    }));

    const editingProgram = useProgramStore((state) => state.program)
    const updateDeveloperId = useEditorStore((state) => state.updateDeveloperId)

    const { addDeveloperToProgram, removeDeveloperBy } = useProgramStore((state) => ({
        addDeveloperToProgram: state.addDeveloper,
        removeDeveloperBy: state.removeDeveloper
    }))

    const programDocumentName = () => {
        return `РП_${editingProgram?.academicDiscipline}_${editingProgram?.developmentYear}`
    }

    const navigate = useNavigate()

    function handleFieldsChange(e: ChangeEvent<HTMLInputElement>) {
        setDevelopmentYear(e.target.value)
    }

    function handleAcademicSpecialtyChange(e: ChangeEvent<HTMLInputElement>) {
        setAcademicSpecialty(e.target.value)
    }

    function handleAcademicDisciplineChange(e: ChangeEvent<HTMLInputElement>) {
        setAcademicDiscipline(e.target.value)
    }

    function handleDeveloperClick(id: string) {
        updateDeveloperId(id)
        navigate('../developer')
    }

    function handleDeveloperDelete(id: string) {
        removeDeveloperBy(id)
    }

    function handleNewDeveloper() {
        const newDeveloperID = uuid();

        addDeveloperToProgram({
            id: newDeveloperID,
            name: '',
            post: ''
        })

        updateDeveloperId(newDeveloperID)
        navigate('../developer')
    }

    return (
        <div className="flex-1 gap-4 p-4">   
                <div className="flex gap-4">
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Название документа
                        </label>
                        <Field value={programDocumentName()} readable={FieldType.READONLY} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Год
                        </label>

                        <Field onChange={handleFieldsChange} value={developmentYear || ''}/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Специальность
                        </label>
                        <Field onChange={handleAcademicSpecialtyChange} value={academicSpecialty || ''}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Дисциплина
                        </label>
                        <Field onChange={handleAcademicDisciplineChange} value={academicDiscipline || ''}/>
                    </div>
                </div>

                <div>
                    <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                        Разработчики
                    </label>
                        <ul className="flex flex-col gap-2">
                            {editingProgram?.developers.map(developer => (
                                <DeveloperCard key={developer.id}
                                               name={developer.name} 
                                               post={developer.post}
                                               onClick={() => handleDeveloperClick(developer.id)}
                                               onDeleteClick={() => handleDeveloperDelete(developer.id)}/>
                            ))}

                            {(editingProgram?.developers.length === 0) && 
                                <div className="dark:bg-[#3A3A3A] bg-[#E1E1E1] w-fit dark:text-secondary-text py-1 px-3 rounded font-medium">Список разработчиков пуст</div>
                            }

                            <button onClick={handleNewDeveloper} className="text-sm px-6 py-2 rounded w-fit font-medium dark:bg-[#3A3A3A] bg-[#E1E1E1] text-white">
                                Добавить разработчика
                            </button>
                        </ul>
                </div>
            </div>
    );
}