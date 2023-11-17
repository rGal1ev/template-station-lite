export enum CompetenceType {
    PRACTICIAL = "practicial",
    GENERAL = "general"
}

export interface Competence {
    id: number
    type: CompetenceType
    title: string
}
