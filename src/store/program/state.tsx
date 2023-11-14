import { Program } from "../../types/program"

export interface ProgramState {
    program: Program | undefined,

    update: (newProgram: Program) => void
    clear: () => void
}