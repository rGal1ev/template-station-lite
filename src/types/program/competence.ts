export enum CompetenceType {
    PRACTICIAL = "professional",
    GENERAL = "general"
}

export interface Competence {
    id: number
    type: CompetenceType
    title: string
}
