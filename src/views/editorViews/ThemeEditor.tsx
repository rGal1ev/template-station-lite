import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useEditorStore } from "../../store/editor";
import { EducationalUnit, Theme } from "../../types/program";
import OutletLayout from "../../components/UI/OutletLayout";
import Column from "../../components/UI/columns/Column";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../components/UI/buttons/RoundedButton";
import { useProgramStore } from "../../store/program";
import Field from "../../components/UI/form/Field";
import Label from "../../components/UI/form/Label";
import { v4 as uuid } from "uuid";
import LessonHeader from "../../components/Editor/LessonHeader/LessonHeader";
import ListColumn from "../../components/UI/columns/ListColumn";
import LessonCard from "../../components/Editor/LessonCard/LessonCard";

export default function ThemeEditor() {
    const [theme, setTheme] = useState<Theme | undefined>(undefined)

    const sectionId = useEditorStore((state) => state.sectionId)
    const themeId = useEditorStore((state) => state.themeId)

    const getThemeById = useProgramStore((state) => state.themeBy)
    const updateTheme = useProgramStore((state) => state.updateTheme)

    const navigate = useNavigate()

    function handleThemeTitleChange(e: ChangeEvent<HTMLInputElement>) {
        if (theme === undefined) return

        setTheme({
            ...theme,
            title: e.target.value
        })
    }

    function handleThemeSectionHiding(type: string) {
        if (theme === undefined) return

        setTheme({
            ...theme,
            [type]: {
                isHidden: !theme[type].isHidden,
                lessons: [...theme[type].lessons]
            }
        })
    }

    function handleLessonDelete(type: string, id: string) {
        if (theme === undefined) return

        setTheme({
            ...theme,
            [type]: {
                isHidden: theme[type].isHidden,
                lessons: theme[type].lessons.filter((lesson: EducationalUnit) => lesson.id !== id)
            }
        })   
    }

    function handleLessonTitleChange(e: ChangeEvent<HTMLInputElement>, type: string, id: string) {
        if (theme === undefined) return

        setTheme({
            ...theme,
            [type]: {
                isHidden: theme[type].isHidden,
                lessons: theme[type].lessons.map((lesson: EducationalUnit) => {
                    if (lesson.id === id) {
                        return {
                            ...lesson,
                            title: e.target.value
                        }
                    }

                    return lesson
                })
            }
        })
    }

    function handleNewLesson(type: string) {
        if (theme === undefined) return
        const newLessonUnit: EducationalUnit = {
            id: uuid(),
            title: '',
            volume: 2
        }

        setTheme({
            ...theme,
            [type]: {
                isHidden: theme[type].isHidden,
                lessons: [...theme[type].lessons, newLessonUnit]
            }
        })
    }

    useEffect(() => {
        if (sectionId === undefined) return
        if (themeId === undefined) return
        
        setTheme(getThemeById(sectionId, themeId))
    }, [])

    useEffect(() => {
        if (sectionId === undefined) return
        if (theme === undefined) return

        updateTheme(sectionId, theme)
    }, [theme])

    return (
        <OutletLayout>
            <Column>
                <Column>
                    <Label title="Наименование темы"/>
                    <Field value={theme?.title} onChange={(e) => handleThemeTitleChange(e)} />
                </Column>

                <Label title="Список лекций"/>

                <LessonHeader title="Теоретические"
                              type="theoreticals"
                              hiddenValue={theme?.theoreticals.isHidden}
                              onHide={(type) => handleThemeSectionHiding(type)}
                              onNewLessonClick={(type) => handleNewLesson(type)}/>

                {!theme?.theoreticals.isHidden && (
                    <ListColumn spacing={1}>
                        {theme?.theoreticals.lessons.map((lesson, index) => (
                            <LessonCard key={lesson.id}
                                        id={lesson.id}
                                        index={index}
                                        type="theoreticals"
                                        typeName="Лекция"
                                        title={lesson.title}
                                        onTitleChange={(e, type, id) => handleLessonTitleChange(e, type, id)}
                                        onDeleteClick={(type, id) => handleLessonDelete(type, id)}/>
                        ))}
                    </ListColumn>
                )}

                <LessonHeader title="Лабораторные"
                              type="laboratorys"
                              hiddenValue={theme?.laboratorys.isHidden}
                              onHide={(type) => handleThemeSectionHiding(type)}
                              onNewLessonClick={(type) => handleNewLesson(type)}/>

                {!theme?.laboratorys.isHidden && (
                    <ListColumn spacing={1}>
                        {theme?.laboratorys.lessons.map((lesson, index) => (
                            <LessonCard key={lesson.id}
                                        id={lesson.id}
                                        index={index}
                                        type="laboratorys"
                                        typeName="Лабораторная"
                                        title={lesson.title}
                                        onTitleChange={(e, type, id) => handleLessonTitleChange(e, type, id)}
                                        onDeleteClick={(type, id) => handleLessonDelete(type, id)}/>
                        ))}
                    </ListColumn>
                )}

                <LessonHeader title="Практические"
                              type="practicals"
                              hiddenValue={theme?.practicals.isHidden}
                              onHide={(type) => handleThemeSectionHiding(type)}
                              onNewLessonClick={(type) => handleNewLesson(type)}/>

                {!theme?.practicals.isHidden && (
                    <ListColumn spacing={1}>
                        {theme?.practicals.lessons.map((lesson, index) => (
                            <LessonCard key={lesson.id}
                                        id={lesson.id}
                                        index={index}
                                        type="practicals"
                                        typeName="Практическая"
                                        title={lesson.title}
                                        onTitleChange={(e, type, id) => handleLessonTitleChange(e, type, id)}
                                        onDeleteClick={(type, id) => handleLessonDelete(type, id)}/>
                        ))}
                    </ListColumn>
                )}

                <LessonHeader title="Самостоятельные"
                              type="independents"
                              hiddenValue={theme?.independents.isHidden}
                              onHide={(type) => handleThemeSectionHiding(type)}
                              onNewLessonClick={(type) => handleNewLesson(type)}/>

                {!theme?.independents.isHidden && (
                    <ListColumn spacing={1}>
                        {theme?.independents.lessons.map((lesson, index) => (
                            <LessonCard key={lesson.id}
                                        id={lesson.id}
                                        index={index}
                                        type="independents"
                                        typeName="Самостоятельная"
                                        title={lesson.title}
                                        onTitleChange={(e, type, id) => handleLessonTitleChange(e, type, id)}
                                        onDeleteClick={(type, id) => handleLessonDelete(type, id)}/>
                        ))}
                    </ListColumn>
                )}

                <RoundedButton title="Вернуться назад" onClick={() => navigate(-1)}/>
            </Column>
        </OutletLayout>
    );
}