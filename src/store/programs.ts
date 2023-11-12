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

            update: (by, program) => set((state) => ({
                programList: state.programList.map(prevProgram => prevProgram.id === by ? { ...prevProgram, ...program } : prevProgram)
              })),
        
            get: (by) => get().programList.find(program => program.id === by),
            getAll: () => get().programList,
            getCount: () => get().programList.length
        }),

        {
            name: 'program-list'
        }
    )
)

export { useProgramsStore }