import { Competence } from "./competence"
import { Theme } from "./theme"

export interface Section {
    id: string
    title: string
    
    competencies: Competence[]
    themes: Theme[]
}