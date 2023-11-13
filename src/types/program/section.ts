import { Competence } from "./competence"
import { Theme } from "./theme"

export interface Section {
    competencies: Competence[]
    themes: Theme[]
}