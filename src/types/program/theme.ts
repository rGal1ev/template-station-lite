export interface EducationalUnit {
    id: string
    title: string
    volume: number // По умолчанию 2
}

export interface Theme {
    [key: string]: any

    id: string
    title: string
    
    theoreticals: {
        isHidden: boolean
        lessons: EducationalUnit[] // Теоретические лекции
    }

    laboratorys: {
        isHidden: boolean
        lessons: EducationalUnit[] // Лабораторные лекции
    }

    practicals: {
        isHidden: boolean
        lessons: EducationalUnit[] // Практические лекции
    }

    independents: {
        isHidden: boolean
        lessons: EducationalUnit[] // Самостоятельные лекции
    }
}