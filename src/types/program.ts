import { Developer, Competence, Section } from "./program/index"

export interface Program {
    id: string
    title: string
    developmentYear: string
    academicSpecialty: string
    academicDiscipline: string

    developers: Developer[]
    competencies: Competence[]

    disciplineVolume: {
        theoretical: number
        laboratory: number
        practical: number
        independent: number
        certification: number
    }

    thematicPlan: {
        sections: Section[]
    }
}
