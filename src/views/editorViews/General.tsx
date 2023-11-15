import { ChangeEvent } from "react"
import { useProgramStore } from "../../store/program"
import { useEditorStore } from "../../store/editor"
import { useNavigate } from "react-router-dom"
import Field, { FieldType } from "../../components/UI/Field"
import DeveloperCard from "../../components/Editor/DeveloperCard/DeveloperCard"
import { v4 as uuid } from "uuid"
import Select from 'react-select'

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

    function onAcademicSpecialtyChange(option: any) {
        setAcademicSpecialty(option.value)
    }

    function onAcademicDisciplineChange(option: any) {
        setAcademicDiscipline(option.value)
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

    const specialties = [
        {value: "Программирование информационных система", label: "Программирование информационных система"},
        {value: "Сетевое и системное администрирование", label: "Сетевое и системное администрирование"},
    ]

    const disciplines = [
        {value: "01.02.03", label: "01.02.03"},
        {value: "01.02.04", label: "01.02.04"}
    ]

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
                        <div className=' w-[220px]'>
                            <Select styles={{
                                        option: (baseStyles) => ({
                                            ...baseStyles,
                                            color: 'white'
                                        }),
                                    }}
                                    placeholder="Выберите специальность"
                                    options={specialties}
                                    defaultValue={{
                                        value: academicSpecialty,
                                        label: academicSpecialty
                                    }}
                                    onChange={onAcademicSpecialtyChange}
                                    noOptionsMessage={() => 'Список пуст'} 
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#525252',
                                            neutral0: '#404040',
                                            neutral80: 'white',
                                            primary25: '#525252',
                                            primary50: '#A3A3A3',
                                        },
                                    })}/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-2">
                            Дисциплина
                        </label>
                        <div className=' w-[220px]'>
                            <Select styles={{
                                        option: (baseStyles) => ({
                                            ...baseStyles,
                                            color: 'white'
                                        }),
                                    }} 
                                    placeholder="Выберите дисциплину"
                                    options={disciplines}
                                    defaultValue={{
                                        value: academicDiscipline,
                                        label: academicDiscipline
                                    }}
                                    onChange={onAcademicDisciplineChange}
                                    noOptionsMessage={() => 'Список пуст'} 
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                        ...theme.colors,
                                        primary: '#525252',
                                        neutral0: '#404040',
                                        neutral80: 'white',
                                        primary25: '#525252',
                                        primary50: '#A3A3A3'
                                        },
                                    })}/>
                        </div>
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
                                <div className="bg-[#3A3A3A] w-fit text-secondary-text py-1 px-3 rounded font-medium">Список разработчиков пуст</div>
                            }

                            <button onClick={handleNewDeveloper} className="text-sm px-6 py-2 rounded w-fit font-medium bg-[#3A3A3A] text-white">
                                Добавить разработчика
                            </button>
                        </ul>
                </div>
            </div>
    );
}