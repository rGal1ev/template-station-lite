import { Program } from "../../types/program";
import { v4 as uuid } from "uuid";

export function duplicateProgram(program: Program): Program | undefined {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    if (program === undefined) {
        return
    }

    const duplicatedProgram: Program = JSON.parse(JSON.stringify(program));
    
    duplicatedProgram.id = uuid()
    duplicatedProgram.createdAt = `${year}.${month}.${day}`
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