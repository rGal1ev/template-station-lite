import { ChangeEvent, useEffect, useState } from "react"
import { useProgramStore } from "../../store/program"
import { useEditorStore } from "../../store/editor"
import { useNavigate } from "react-router-dom"
import Field, { FieldType } from "../../components/UI/form/Field"
import DeveloperCard from "../../components/Editor/DeveloperCard/DeveloperCard"
import { v4 as uuid } from "uuid"
import OutletLayout from "../../components/UI/OutletLayout"
import Row from "../../components/UI/Row"
import Label from "../../components/UI/form/Label"
import Column from "../../components/UI/columns/Column"
import DataSelect from "../../components/UI/form/DataSelect"
import ListColumn from "../../components/UI/columns/ListColumn"
import RoundedButton from "../../components/UI/buttons/RoundedButton"
import If from "../../components/UI/If"
import toast from 'react-hot-toast'
import { useApiStore } from "../../store/api"

export default function General() {
    // const [specialties, setSpecialties] = useState<any[]>([])
    // const [disciplines, setDisciplines] = useState<any[]>([])

    const specialties = useApiStore((state) => state.specialties)
    const disciplines = useApiStore((state) => state.disciplines)

    const fetchSpecialties = useApiStore((state) => state.fetchSpecialties)
    const fetchDisciplines = useApiStore((state) => state.fetchDisciplines)

    const [selectableSpecialties, setSelectableSpecialties] = useState<any[]>([])
    const [selectableDisciplines, setSelectableDisciplines] = useState<any[]>([])

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
        return `РП_${editingProgram?.academicSpecialty?.code || ''}_${editingProgram?.developmentYear || ''}`
    }

    const navigate = useNavigate()

    function handleFieldsChange(e: ChangeEvent<HTMLInputElement>) {
        setDevelopmentYear(e.target.value)
    }

    function onAcademicSpecialtyChange(option: any) {
        setAcademicSpecialty({
            id: option.value.id,
            code: option.value.code,
            value: option.value.value
        })

        const fetchDisciplinesPromise = fetchDisciplines(option.value.id)
        toast.promise(fetchDisciplinesPromise, {
                loading: 'Загружаю дисциплины',
                success: 'Дисциплины загружены',
                error: 'Произошла ошибка',
              })
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

    // async function fetchSpecialties() {
    //     const res = await axios.get<any[]>('http://localhost:5000/api/specialties')

    //     if (res.status === 200) {
    //         const preparedData = res.data.map(item => ({
    //             label: `${item.code} ${item.value}`,
    //             value: {
    //                 id: item.id,
    //                 code: item.code,
    //                 value: item.value
    //             }
    //         }))

    //         setSpecialties([...preparedData])
    //         return true
    //     }

    //     return false
    // }

    // async function fetchDisciplinesById(id: number) {
    //     const res = await axios.get<any[]>(`http://localhost:5000/api/speciality_disciplines/${id}`)

    //     if (res.status === 200) {
    //         const preparedData = res.data.map(item => ({
    //             label: item.value,
    //             value: item.value
    //         }))

    //         setDisciplines([...preparedData])
    //         return true
    //     }

    //     return false
    // }

    useEffect(() => {
        if (specialties.length === 0) {
            const fetchSpecialtiesPromise = fetchSpecialties()
            toast.promise(fetchSpecialtiesPromise, {
                loading: 'Загружаю специальности',
                success: 'Специальности загружены',
                error: 'Произошла ошибка',
            })
        }

        if (disciplines.length === 0) {
            if (academicSpecialty === undefined) return
            const fetchDisciplinesPromise = fetchDisciplines(academicSpecialty.id)
            toast.promise(fetchDisciplinesPromise, {
                loading: 'Загружаю дисциплины',
                success: 'Дисциплины загружены',
                error: 'Произошла ошибка',
            })
        }
        // const fetchSpecialtiesPromise = fetchSpecialties()

        // toast.promise(fetchSpecialtiesPromise, {
        //     loading: 'Загружаю специальности',
        //     success: 'Специальности загружены',
        //     error: 'Произошла ошибка',
        //   })

        // if (academicSpecialty) {
        //     const fetchDisciplinesPromise = fetchDisciplinesById(academicSpecialty.id)
        //     toast.promise(fetchDisciplinesPromise, {
        //         loading: 'Загружаю дисциплины',
        //         success: 'Дисциплины загружены',
        //         error: 'Произошла ошибка',
        //     })
        // }

    }, [])

    useEffect(() => {
        setSelectableSpecialties([...specialties.map(speciality => ({
            label: `${speciality.code} ${speciality.value}`,
            value: {
                id: speciality.id,
                code: speciality.code,
                value: speciality.value
            }
        }))])

    }, [specialties])

    useEffect(() => {
        setSelectableDisciplines([...disciplines.map(discipline => ({
            label: discipline.value,
            value: discipline.value
        }))])

    }, [disciplines])

    return (
        <OutletLayout>
            <Row>
                <Column>
                    <Label title="Название документа"/>
                    <Field value={programDocumentName()} readable={FieldType.READONLY}/>
                </Column>

                <Column>
                    <Label title="Год" />
                    <Field onChange={handleFieldsChange} value={developmentYear || ''}/>
                </Column>
            </Row>

            <Row>
                <Column>
                    <Label title="Специальность"/>
                    <DataSelect options={selectableSpecialties}
                                value={academicSpecialty}
                                label={`${academicSpecialty?.code} ${academicSpecialty?.value}`} 
                                onChange={onAcademicSpecialtyChange}/>
                </Column>
                <Column>
                    <Label title="Дисциплина"/>
                    <DataSelect options={selectableDisciplines} 
                                value={academicDiscipline} 
                                label={academicDiscipline} 
                                onChange={onAcademicDisciplineChange}/>
                </Column>
            </Row>

            <Column>
                <Column>
                    <Label title="Разработчики"/>
                    <ListColumn>
                        {editingProgram?.developers.map(developer => (
                            <DeveloperCard key={developer.id}
                                            name={developer.name} 
                                            post={developer.post}
                                            onClick={() => handleDeveloperClick(developer.id)}
                                            onDeleteClick={() => handleDeveloperDelete(developer.id)}/>
                        ))}

                        <If condition={editingProgram?.developers.length === 0}
                            content={<div className="bg-[#3A3A3A] w-fit text-secondary-text py-1 px-3 rounded font-medium">Список разработчиков пуст</div>} />

                        <RoundedButton title="Добавить разработчика" onClick={handleNewDeveloper}/> 
                    </ListColumn>
                </Column>
            </Column>
        </OutletLayout>
    );
}