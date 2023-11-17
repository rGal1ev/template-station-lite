import { Speciality } from "../../types/program/speciality"
import { Competence, Developer, Section } from "../../types/program/index"
import { ProgramState } from "./state"

export interface ProgramStateGeneralActions {
    setDevelopmentYear: (newValue: string) => void
    setAcademicSpecialty: (newValue: Speciality) => void
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

    removeCompetence: (by: number) => void
    competenceBy: (by: number) => void
}

export interface ProgramStateSectionActions {
    addSection: (section: Section) => void
    updateSection: (section: Section) => void

    removeSection: (by: string) => void
    sectionBy: (by: string) => Section | undefined
}

export interface ProgramStateDisciplineVolumeActions {
    updateTheoreticalVolume: (newValue: number) => void
    updateLaboratoryVolume: (newValue: number) => void
    updatePracticalVolume: (newValue: number) => void
    updateIndependentVolume: (newValue: number) => void
    updateCertificationVolume: (newValue: number) => void
}

export const createSectionProgramActions = (set: any, get: any): ProgramStateSectionActions => ({
    addSection: (section) => set((state: ProgramState) => ({program: {
        ...state.program,
        sections: state.program ? [...state.program.sections, section] : [section]
    }})),

    updateSection: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        sections: state.program?.sections.map(section => {
            if (section.id === by.id) {
                return by
            }

            return section
        })
    }})),

    sectionBy: (by) => get().program.sections.find((section: Section) => section.id === by),
    removeSection: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        sections: state.program?.sections.filter(section => section.id != by)
    }}))
})

export const createDisciplineVolumeProgramActions = (set: any): ProgramStateDisciplineVolumeActions => ({
    updateTheoreticalVolume: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        disciplineVolume: {
            ...state.program?.disciplineVolume,
            theoretical: newValue
        }
    }})),

    updateLaboratoryVolume: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        disciplineVolume: {
            ...state.program?.disciplineVolume,
            laboratory: newValue
        }
    }})),

    updatePracticalVolume: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        disciplineVolume: {
            ...state.program?.disciplineVolume,
            practical: newValue
        }
    }})),

    updateIndependentVolume: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        disciplineVolume: {
            ...state.program?.disciplineVolume,
            independent: newValue
        }
    }})),

    updateCertificationVolume: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        disciplineVolume: {
            ...state.program?.disciplineVolume,
            certification: newValue
        }
    }})),
})

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

    competenceBy: (by) => get().program.competencies.find((competence: Competence) => competence.id === by),
    removeCompetence: (by) => set((state: ProgramState) => ({program: {
        ...state.program,
        competencies: state.program?.competencies.filter(competence => competence.id != by)
    }}))
})