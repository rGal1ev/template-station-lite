import { Program } from "../types/program"
import { v4 as uuid } from "uuid"

export function generateEmptyProgram(): Program {
    return {
        id: uuid(),
        title: `Новый документ с длинным названием`,
        developmentYear: '',
        academicSpecialty: '',
        academicDiscipline: '',

        developers: [],
        competencies: [],

        disciplineVolume: {
            theoretical: 0,
            laboratory: 0,
            practical: 0,
            independent: 0,
            certification: 0,
        },
    
        thematicPlan: {
            sections: []
        }
    }
}