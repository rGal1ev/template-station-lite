import { Program } from "../../types/program";
import { v4 as uuid } from "uuid";

export function duplicateProgram(program: Program): Program | undefined {
    if (program === undefined) {
        return
    }

    const duplicatedProgram: Program = JSON.parse(JSON.stringify(program));
    
    duplicatedProgram.id = uuid()
    duplicatedProgram.title = `Дублировано ${duplicatedProgram.title}`

    return duplicatedProgram
}