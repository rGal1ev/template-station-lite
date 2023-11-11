import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProgramListState } from '../types/program'

const useProgramsStore = create<ProgramListState>()(
    persist(
        (set, get) => ({
            programList: [],
        
            add: (newProgram) => set((state) => ({
                programList: [...state.programList, newProgram]
            })),
        
            remove: (by) => set((state) => ({
                programList: [...state.programList.filter(program => program.id !== by)]
            })),
        
            get: (by) => get().programList.find(program => program.id === by),
            getIdCount: () => get().programList.length
        }),

        {
            name: 'program-list'
        }
    )
)

export { useProgramsStore }