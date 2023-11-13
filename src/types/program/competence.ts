export enum CompetenceType {
    PRACTICIAL = "practicial",
    GENERAL = "general"
}

export interface Competence {
    type: CompetenceType
    title: string
}
