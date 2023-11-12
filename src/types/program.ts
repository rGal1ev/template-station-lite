export interface ProgramListState {
    programList: Program[]
    
    add: (newProgram: Program) => void
    remove: (by: string) => void
    update: (by: string, program: Program) => void

    get: (by: string) => Program | undefined
    getAll: () => Program[] | undefined
    getCount: () => number
}

enum CompetenceType {
    PRACTICIAL = "practicial",
    GENERAL = "general"
}

interface Developer {
    name: string
    post: string
}

interface EducationalUnit {
    title: string
    volume: number // Default 2
}

interface Theme {
    theoretical: EducationalUnit[]
    laboratory: EducationalUnit[]
    practical: EducationalUnit[]
    independent: EducationalUnit[]
    certification: EducationalUnit[]
}

interface Competence {
    type: CompetenceType
    title: string
}

interface Section {
    competencies: Competence[]
    themes: Theme[]
}

export interface Program {
    id: string
    title: string
    developmentYear: string
    academicSpecialty: string
    academicDiscipline: string

    developers: Developer[]
    competencies: Competence[]

    disciplineVolume: {
        theoretical: number
        laboratory: number
        practical: number
        independent: number
        certification: number
    }

    thematicPlan: {
        sections: Section[]
    }
}
