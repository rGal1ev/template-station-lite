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

export function getProgramById(by: string, programList: Program[]): Program | undefined {
    return programList.find(program => program.id === by)
}

export function deleteProgramFromList(by: string, programList: Program[]): Program[] {
    return [...programList.filter(program => program.id !== by)]
}

export function updateProgramInList(program: Program, programList: Program[]) {
    return programList.map(programInList => {
        if (programInList.id === program.id) {
            return program
        }

        return programInList
    })
}