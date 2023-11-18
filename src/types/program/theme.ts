export interface EducationalUnit {
    title: string
    volume: number // Default 2
}

export interface Theme {
    id: string
    title: string
    
    theoreticals: EducationalUnit[]
    laboratorys: EducationalUnit[]
    practicals: EducationalUnit[]
    independents: EducationalUnit[]
    certifications: EducationalUnit[]
}