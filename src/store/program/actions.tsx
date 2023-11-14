import { Competence, Developer } from "../../types/program/index"
import { ProgramState } from "./state"

export interface ProgramStateGeneralActions {
    setDevelopmentYear: (newValue: string) => void
    setAcademicSpecialty: (newValue: string) => void
    setAcademicDiscipline: (newValue: string) => void
}

export interface ProgramStateDeveloperActions {
    addDeveloper: (developer: Developer) => void
    updateDeveloper: (developer: Developer) => void

    removeDeveloper: (by: string) => void
    developerBy: (by: string) => Developer | undefined
}

export interface ProgramStateCompetenciesActions {
    addCompetence: (competence: Competence) => void
    updateCompetence: (competence: Competence) => void

    removeCompetence: (by: string) => void
    competenceBy: (by: string) => void
}

export const createGeneralProgramActions = (set: any): ProgramStateGeneralActions  => ({
    setDevelopmentYear: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        developmentYear: newValue
    }})),

    setAcademicSpecialty: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        academicSpecialty: newValue
    }})),

    setAcademicDiscipline: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        academicDiscipline: newValue
    }})),
})

export const createDevelopersProgramActions = (set: any, get: any): ProgramStateDeveloperActions => ({
    addDeveloper: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        developers: state.program ? [...state.program.developers, newValue] : [newValue]
    }})),

    updateDeveloper: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        developers: state.program?.developers.map(developer => {
            if (developer.id === by.id) {
                return by
            }

            return developer
        })
    }})),

    developerBy: (by) => get().program.developers.find((developer: Developer) => developer.id === by),
    removeDeveloper: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        developers: state.program?.developers.filter(developer => developer.id != by)
    }}))
})

export const createCompetenciesProgramActions = (set: any, get: any): ProgramStateCompetenciesActions => ({
    addCompetence: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        competencies: state.program ? [...state.program.competencies, newValue] : [newValue]
    }})),

    updateCompetence: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        developers: state.program?.competencies.map(competence => {
            if (competence.id === by.id) {
                return by
            }

            return competence
        })
    }})),

    removeCompetence: (by) => get().program.competencies.find((competence: Competence) => competence.id === by),
    competenceBy: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        developers: state.program?.competencies.filter(competence => competence.id != by)
    }}))
})