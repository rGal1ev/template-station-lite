import { Program } from "../../types/program"

export interface ProgramState {
    program: Program | undefined,

    update: (newProgram: Program) => void
    updateTitle: (newTitle: string) => void
    clear: () => void
}