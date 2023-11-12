import { Program } from "../../types/program"
import { v4 as uuid } from "uuid"

export function updateImportedProgramsId(importedPrograms: Program[]): Program[] {
    return importedPrograms.map(program => {
        program.id = uuid()
        return program
    })
}