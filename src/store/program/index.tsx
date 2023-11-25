import { create } from "zustand"
import { persist } from "zustand/middleware"

import { ProgramState } from "./state"
import { ProgramStateCompetenciesActions, 
         ProgramStateDeveloperActions, 
         ProgramStateGeneralActions,
         ProgramStateDisciplineVolumeActions,
         ProgramStateSectionActions,
        ProgramStateThemeActions } from "./actions"

import { createDevelopersProgramActions, 
         createGeneralProgramActions, 
         createCompetenciesProgramActions, 
         createDisciplineVolumeProgramActions,
         createSectionProgramActions,
         createThemeProgramActions } from "./actions"

const useProgramStore = create<ProgramState & 
                               ProgramStateGeneralActions & 
                               ProgramStateDeveloperActions &
                               ProgramStateCompetenciesActions &
                               ProgramStateDisciplineVolumeActions &
                               ProgramStateSectionActions &
                               ProgramStateThemeActions>()(
    persist(
        (set, get) => ({
            program: undefined,

            update: (newProgram) => set(() => ({program: {
                ...newProgram
            }})),

            updatePinned: (newValue) => set((state) => {
                if (state.program === undefined) return {
                    program: undefined
                }

                return {
                    program: {
                        ...state.program,
                        isPinned: newValue
                    }
                }
            }),

            updateTitle: (newTitle) => set((state) => {
                if (state.program === undefined) return {
                    program: undefined
                }

                return {
                    program: {
                        ...state.program,
                        title: newTitle
                    }
                }
            }),

            updateFinishedStatus: (newValue) => set((state) => {
                if (state.program === undefined) return {
                    program: undefined
                }

                return {
                    program: {
                        ...state.program,
                        isFinished: newValue
                    }
                }
            }),
            
            clear: () => set(() => ({program: undefined})),

            ...createGeneralProgramActions(set),
            ...createDevelopersProgramActions(set, get),
            ...createCompetenciesProgramActions(set, get),
            ...createDisciplineVolumeProgramActions(set),
            ...createSectionProgramActions(set, get),
            ...createThemeProgramActions(set, get)
        }),

        {
            name: 'current-program'
        }
    )
)

export { useProgramStore }