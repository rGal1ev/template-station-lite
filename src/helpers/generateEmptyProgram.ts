import { Program } from "../types/program"
import { v4 as uuid } from "uuid"

export function generateEmptyProgram(): Program {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return {
        id: uuid(),
        title: `Новая рабочая программа`,
        developmentYear: '',
        academicSpecialty: undefined,
        academicDiscipline: '',
        createdAt: `${year}.${month}.${day}`,

        isPinned: false,
        isFinished: false,

        developers: [],
        competencies: [],

        disciplineVolume: {
            theoretical: 0,
            laboratory: 0,
            practical: 0,
            independent: 0,
            certification: 0,
        },
    
        sections: []
    }
}