import { create } from "zustand"
import { persist } from "zustand/middleware"

import { ProgramState } from "./state"
import { ProgramStateCompetenciesActions, ProgramStateDeveloperActions, ProgramStateGeneralActions } from "./actions"
import { createDevelopersProgramActions, createGeneralProgramActions, createCompetenciesProgramActions } from "./actions"

const useProgramStore = create<ProgramState & 
                               ProgramStateGeneralActions & 
                               ProgramStateDeveloperActions &
                               ProgramStateCompetenciesActions>()(
    persist(
        (set, get) => ({
            program: undefined,

            update: (newProgram) => set(() => ({program: {
                ...newProgram
            }})),

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
            
            clear: () => set(() => ({program: undefined})),
            ...createGeneralProgramActions(set),
            ...createDevelopersProgramActions(set, get),
            ...createCompetenciesProgramActions(set, get)
        }),

        {
            name: 'current-program'
        }
    )
)

export { useProgramStore }