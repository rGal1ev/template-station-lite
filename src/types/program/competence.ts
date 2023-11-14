export enum CompetenceType {
    PRACTICIAL = "practicial",
    GENERAL = "general"
}

export interface Competence {
    id: string
    type: CompetenceType
    title: string
}
