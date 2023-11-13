export interface EducationalUnit {
    title: string
    volume: number // Default 2
}

export interface Theme {
    theoretical: EducationalUnit[]
    laboratory: EducationalUnit[]
    practical: EducationalUnit[]
    independent: EducationalUnit[]
    certification: EducationalUnit[]
}