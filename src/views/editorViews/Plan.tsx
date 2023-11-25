import Field from "../../components/UI/form/Field"
import OutletLayout from "../../components/UI/OutletLayout"
import Row from "../../components/UI/Row"
import Label from "../../components/UI/form/Label"
import Column from "../../components/UI/columns/Column"
import RoundedButton from "../../components/UI/buttons/RoundedButton"
import { useProgramStore } from "../../store/program"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { useEditorStore } from "../../store/editor"
import SectionCard from "../../components/Editor/SectionCard/SectionCard"

export default function Plan() {
    const { theoreticalVolume, 
            practicalVolume, 
            independentVolume, 
            laboratoryVolume, 
            certificationVolume,
            sections } = useProgramStore((state) => ({
        theoreticalVolume: state.program?.disciplineVolume.theoretical,
        practicalVolume: state.program?.disciplineVolume.practical,
        independentVolume: state.program?.disciplineVolume.independent,
        laboratoryVolume: state.program?.disciplineVolume.laboratory,
        certificationVolume: state.program?.disciplineVolume.certification,
        sections: state.program?.sections
    }))

    const { addSection, removeSection } = useProgramStore((state) => ({
        addSection: state.addSection,
        removeSection: state.removeSection
    }))

    const updateSectionId = useEditorStore((state) => state.updateSectionId)
    
    const { updateTheoreticalVolume, 
            updatePracticalVolume, 
            updateIndependentVolume, 
            updateLaboratoryVolume, 
            updateCertificationVolume } = useProgramStore((state) => ({
        updateTheoreticalVolume: state.updateTheoreticalVolume,
        updatePracticalVolume: state.updatePracticalVolume,
        updateIndependentVolume: state.updateIndependentVolume,
        updateLaboratoryVolume: state.updateLaboratoryVolume,
        updateCertificationVolume: state.updateCertificationVolume
    }))

    const navigate = useNavigate()

    function handleNewSectionClick() {
        const newSectionId = uuid()

        addSection({
            id: newSectionId,
            title: '',

            competencies: [],
            themes: []
        })

        updateSectionId(newSectionId)
        navigate("../section")
    }

    function handleSectionClick(id: string) {
        updateSectionId(id)
        navigate("../section")
    }

    function handleSectionDelete(id: string) {
        removeSection(id)
    }

    const totalVolumesSum = (): number => {
        if (theoreticalVolume === undefined || 
            practicalVolume === undefined || 
            independentVolume === undefined ||
            laboratoryVolume === undefined ||
            certificationVolume === undefined) return 0

        return theoreticalVolume + 
               practicalVolume + 
               independentVolume + 
               laboratoryVolume +
               certificationVolume

    }
    return (
        <OutletLayout>
            <Row>
                <Label title="Объем учебной дисциплины"/>
                <span className="text-secondary-text ml-2">Всего: {!isNaN(totalVolumesSum()) ? totalVolumesSum() : '-'}</span>
            </Row>
            <Row>
                <Column>
                    <Label title="Теория"/>
                    <Field value={theoreticalVolume} 
                           onChange={(e) => updateTheoreticalVolume(e.target.value === '' || isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}/>
                </Column>

                <Column>
                    <Label title="Лабораторные"/>
                    <Field value={laboratoryVolume} 
                           onChange={(e) => updateLaboratoryVolume(e.target.value === '' || isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}/>
                </Column>

                <Column>
                    <Label title="Практические"/>
                    <Field value={practicalVolume} 
                           onChange={(e) => updatePracticalVolume(e.target.value === '' || isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}/>
                </Column>

                <Column>
                    <Label title="Самостоятельные"/>
                    <Field value={independentVolume} 
                           onChange={(e) => updateIndependentVolume(e.target.value === '' || isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}/>
                </Column>

                <Column>
                    <Label title="Промеж-ая аттестация"/>
                    <Field value={certificationVolume} 
                           onChange={(e) => updateCertificationVolume(e.target.value === '' || isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}/>
                </Column>
            </Row>

            <Column>
                <Label title="Тематический план"/>

                {sections?.map((section, index) => (
                    <SectionCard key={index}
                                 index={index}
                                 title={section.title}
                                 themes={section.themes}
                                 onClick={() => handleSectionClick(section.id)}
                                 onDeleteClick={() => handleSectionDelete(section.id)} />
                ))}

                <RoundedButton onClick={handleNewSectionClick} title="Добавить раздел"/>
            </Column>
        </OutletLayout>
    );
}