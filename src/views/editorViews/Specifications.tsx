import { useEffect } from "react";
import OutletLayout from "../../components/UI/OutletLayout";
import Column from "../../components/UI/columns/Column";
import Label from "../../components/UI/form/Label";
import { useProgramStore } from "../../store/program";
import { useState } from "react";
import toast from "react-hot-toast";
import DataSelect from "../../components/UI/form/DataSelect";
import CompetenceCard from "../../components/Editor/CompetenceCard/CompetenceCard";
import { useApiStore } from "../../store/api";
import { Competence } from "../../types/program";

export default function Specifications() {
    const [selectableFetchedCompetencies, setSelectableFetchedCompetencies] = useState<any[]>([])

    const fetchedCompetencies = useApiStore((state) => state.competencies)
    const fetchCompetencies = useApiStore((state) => state.fetchCompetencies)

    const programCompetencies = useProgramStore((state) => state.program?.competencies)
    const programSpecialityId = useProgramStore((state) => state.program?.academicSpecialty?.id)

    const addCompetence = useProgramStore((state) => state.addCompetence)
    const removeCompetence = useProgramStore((state) => state.removeCompetence)

    const [professionalCompetencies, setProfessionalCompetencies] = useState<Competence[] | undefined>([])
    const [generalCompetencies, setGeneralCompetencies] = useState<Competence[] | undefined>([])

    function updateSelectableCompetencies(competencies: any[]) {
        const updatedSelectableCompetencies: any[] = []

        if (programCompetencies?.length === 0) {
            const updatedSelectableCompetenciesForSelect = competencies.map(competency => ({
                label: competency.title,
                value: {
                    id: competency.id,
                    title: competency.title,
                    type: competency.type
                }
            }))
            
            setSelectableFetchedCompetencies([...updatedSelectableCompetenciesForSelect]);
            return
        }

        competencies.forEach(competency => {
            let isCompetenceInProgram = false

            programCompetencies?.forEach(competencyInProgram => {
                if (competency.id === competencyInProgram.id) {
                    isCompetenceInProgram = true
                    return
                }
            })

            if (!isCompetenceInProgram) {
                updatedSelectableCompetencies.push(competency)
            }
        })

        const updatedSelectableCompetenciesForSelect = updatedSelectableCompetencies.map(competency => ({
            label: competency.title,
            value: {
                id: competency.id,
                title: competency.title,
                type: competency.type
            }
        }))
        
        setSelectableFetchedCompetencies([...updatedSelectableCompetenciesForSelect]);
    }

    function validateCompetencies(fetchedCompetencies: any[]) {
        if (fetchedCompetencies.length === 0) return
        const unvalidatedCompetencies: any[] = []
        
        programCompetencies?.forEach(competency => {
            let isCompetenceInFetchedCompetencies = false

            fetchedCompetencies.forEach(fetchedCompetency => {
                if (fetchedCompetency.id === competency.id) {
                    isCompetenceInFetchedCompetencies = true
                }
            })

            if (!isCompetenceInFetchedCompetencies) {
                unvalidatedCompetencies.push(competency)
            }
        })

        if (unvalidatedCompetencies.length !== 0) {
            unvalidatedCompetencies.forEach(unvalidateCompetency => {
                removeCompetence(unvalidateCompetency.id)
            })

            toast.error("Несоответствие специальности: Некоторые компетенции были удалены")
        }
    }

    function onFetchedCompetenciesChange(option: any) {
        addCompetence({
            id: option.value.id,
            type: option.value.type,
            title: option.value.title
        })
    }

    function handleCompetenceDelete(id: number) {
        removeCompetence(id)
    }

    useEffect(() => {
        if (programSpecialityId === undefined) return
        const fetchCompetenciesPromise = fetchCompetencies(programSpecialityId)

        toast.promise(fetchCompetenciesPromise, {
            loading: 'Загружаю компетенции',
            success: 'Компетенции загружены',
            error: 'Ошибка загрузки компетенций',
          })
    }, [])



    useEffect(() => {
        updateSelectableCompetencies(fetchedCompetencies)

        setProfessionalCompetencies(programCompetencies?.filter(competency => competency.type === "professional"))
        setGeneralCompetencies(programCompetencies?.filter(competency => competency.type === "general"))
    }, [programCompetencies])

    useEffect(() => {
        updateSelectableCompetencies(fetchedCompetencies)
        validateCompetencies(fetchedCompetencies)
    }, [fetchedCompetencies])

    return (
        <OutletLayout>
            <Column>
                <Label title="Профессиональные компетенции"/>
                {professionalCompetencies?.map((competency) => (
                    <CompetenceCard 
                        key={competency.id}
                        title={competency.title}
                        type={competency.type}
                        onClick={() => handleCompetenceDelete(competency.id)}
                    />
                    
                ))}

                <Label title="Общие компетенции"/>
                {generalCompetencies?.map((competency) => (
                    <CompetenceCard 
                        key={competency.id}
                        title={competency.title}
                        type={competency.type}
                        onClick={() => handleCompetenceDelete(competency.id)}
                    />
                    
                ))}

                <DataSelect options={selectableFetchedCompetencies}
                            onChange={onFetchedCompetenciesChange}/>
            </Column>
        </OutletLayout>
    );
}