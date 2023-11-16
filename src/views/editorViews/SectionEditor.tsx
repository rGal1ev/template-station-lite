import { useNavigate } from "react-router-dom";
import OutletLayout from "../../components/UI/OutletLayout";
import RoundedButton from "../../components/UI/buttons/RoundedButton";
import Column from "../../components/UI/columns/Column";
import Label from "../../components/UI/form/Label";
import { useEditorStore } from "../../store/editor";
import { useProgramStore } from "../../store/program";
import { Section } from "../../types/program";
import { useEffect, useState } from "react";

function SectionEditor() {
    const [section, setSection] = useState<Section | undefined>(undefined)
    
    const sectionId = useEditorStore((state) => state.sectionId)
    const getSectionBy = useProgramStore((state) => state.sectionBy)
    const updateSection = useProgramStore((state) => state.updateSection)

    const navigate = useNavigate()

    useEffect(() => {
        if (sectionId === undefined) return

        const currentSection = getSectionBy(sectionId)
        if (currentSection === undefined) return

        setSection(currentSection)
    }, [])

    useEffect(() => {
        return () => {
            if (section === undefined) return
            updateSection(section)
        }

    }, [section])

    return (
        <OutletLayout>
            <Column>
                <Label title="Умения и знания"/>
            </Column>

            <Column>
                <Label title="Содержание"/>
            </Column>

            <RoundedButton title="Вернуться назад" onClick={() => navigate(-1)}/>
        </OutletLayout>
    );
}

export default SectionEditor;