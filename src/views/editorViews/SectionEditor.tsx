import { useNavigate } from "react-router-dom";
import OutletLayout from "../../components/UI/OutletLayout";
import RoundedButton from "../../components/UI/buttons/RoundedButton";
import Column from "../../components/UI/columns/Column";
import Label from "../../components/UI/form/Label";
import { useEditorStore } from "../../store/editor";
import { useProgramStore } from "../../store/program";
import { Section, Theme } from "../../types/program";
import { ChangeEvent, useEffect, useState } from "react";
import ThemeCard from "../../components/Editor/ThemeCard/ThemeCard";
import { v4 as uuid } from "uuid";
import Row from "../../components/UI/Row";
import Field from "../../components/UI/form/Field";

function SectionEditor() {
    const [section, setSection] = useState<Section | undefined>(undefined)
    const sectionId = useEditorStore((state) => state.sectionId)

    const getSectionBy = useProgramStore((state) => state.sectionBy)
    const updateSection = useProgramStore((state) => state.updateSection)

    const navigate = useNavigate()

    function handleNewTheme() {
        const newThemeId = uuid()

        const newTheme: Theme = {
            id: newThemeId,
            title: '',

            theoreticals: [],
            laboratorys: [],
            practicals: [],
            independents: [],
            certifications: []
        }

        setSection(prev => {
            if (prev === undefined) return

            return {
                ...prev,
                themes: [...prev.themes, newTheme]
            }
        })
    }

    function handleThemeDelete(id: string) {
        setSection(prev => {
            if (prev === undefined) return

            return {
                ...prev,
                themes: prev.themes.filter(theme => {
                    if (theme.id !== id) {
                        return theme
                    }
                })
            }
        })
    }

    function handleThemeOpening(id: string) {
        console.log(id)
        navigate('../theme')
    }

    function onSectionTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setSection(prev => {
            if (prev === undefined) return

            return {
                ...prev,
                title: e.target.value
            }
        })
    }

    useEffect(() => {
        if (sectionId === undefined) return

        const currentSection = getSectionBy(sectionId)
        if (currentSection === undefined) return

        setSection(currentSection)
    }, [])

    useEffect(() => {
        if (section === undefined) return
        updateSection(section)

    }, [section])

    return (
        <OutletLayout>
            <Column>
                <Column>
                    <Label title="Наименование раздела"/>
                    <Field value={section?.title} width={300} onChange={(e) => onSectionTitleChange(e)} />
                </Column>

                <Column>
                    <Label title="Список тем"/>

                    {section?.themes.map((theme, index) => (
                        <ThemeCard key={index}
                                   index={index}
                                   title={theme.title}
                                   onClick={() => handleThemeOpening(theme.id)}
                                   onDeleteClick={() => handleThemeDelete(theme.id)} />
                    ))}

                    <Row spacing={2}>
                        <RoundedButton title="Добавить тему" onClick={handleNewTheme}/>
                        <RoundedButton title="Вернуться назад" onClick={() => navigate(-1)}/>
                    </Row>
                </Column>
            </Column>
        </OutletLayout>
    );
}

export default SectionEditor;