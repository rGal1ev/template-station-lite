import { CompetenceType } from "./competence";
import { Competence } from "./competence";
import { Developer } from "./developer";
import { EducationalUnit, Theme } from "./theme";
import { Section } from "./section";
import { Speciality } from "./speciality";

export interface Program {
    id: string
    title: string
    developmentYear: string
    academicSpecialty: Speciality | undefined
    academicDiscipline: string
    createdAt: string
    isPinned: boolean

    developers: Developer[]
    competencies: Competence[]

    disciplineVolume: {
        theoretical: number
        laboratory: number
        practical: number
        independent: number
        certification: number
    }

    sections: Section[]
}

export { type CompetenceType, 
         type Competence, 
         type Developer,
         type EducationalUnit,
         type Theme,
         type Section }