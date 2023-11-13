import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Program } from '../types/program'
import { Developer } from '../types/program/index'

interface ProgramState {
    program: Program | undefined,

    update: (newProgram: Program) => void
    clear: () => void
}

interface ProgramStateGeneralActions {
    setDevelopmentYear: (newValue: string) => void
    setAcademicSpecialty: (newValue: string) => void
    setAcademicDiscipline: (newValue: string) => void
}

interface ProgramStateDeveloperActions {
    addDeveloper: (developer: Developer) => void
    updateDeveloper: (developer: Developer) => void

    removeDeveloper: (by: string) => void
    developerBy: (by: string) => Developer | undefined
}

const createGeneralProgramActions = (set: any): ProgramStateGeneralActions  => ({
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

const createDevelopersProgramActions = (set: any, get: any): ProgramStateDeveloperActions => ({
    addDeveloper: (newValue) => set((state: ProgramState) => ({program: {
        ...state.program,
        developers: [...state.program?.developers, newValue]
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

const useProgramStore = create<ProgramState & 
                               ProgramStateGeneralActions & 
                               ProgramStateDeveloperActions>()(
    persist(
        (set, get) => ({
            program: undefined,

            update: (newProgram) => set(() => ({program: {
                ...newProgram
            }})),
            
            clear: () => set(() => ({program: undefined})),
            ...createGeneralProgramActions(set),
            ...createDevelopersProgramActions(set, get)
        }),

        {
            name: 'current-program'
        }
    )
)

export { useProgramStore }