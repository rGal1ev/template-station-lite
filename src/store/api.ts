import { create } from "zustand";
import axios from "axios";
import { CompetenceType } from "../types/program";

interface CompetencyData {
    id: number
    title: string
    type: CompetenceType
}

interface DisciplineData {
    id: number
    value: string
}

interface SpecialtyData {
    id: number
    code: string
    value: string
}

interface ApiStore {
    competencies: CompetencyData[]
    disciplines: DisciplineData[]
    specialties: SpecialtyData[]
}

interface ApiStoreActions {
    fetchSpecialties: () => Promise<void>

    fetchDisciplines: (specialityId: number) => Promise<void>
    fetchCompetencies: (specialityId: number) => Promise<void>

    clear: () => void
}

export const useApiStore = create<ApiStore & ApiStoreActions>((set) => ({
    specialties: [],
    disciplines: [],
    competencies: [],

    fetchSpecialties: async () => {
        const res = await axios.get<any[]>('../../api/specialties')

        if (res.status === 200) {
            const data = res.data.map(item => ({
                id: item.id,
                code: item.code,
                value: item.value
            }))

            set({
                specialties: data
            })
        }
    },

    fetchDisciplines: async (specialityId) => {
        const res = await axios.get<any[]>(`../../api/speciality_disciplines/${specialityId}`)

        if (res.status === 200) {
            const data = res.data.map(item => ({
                id: item.id,
                value: item.value
            }))
            
            set({
                disciplines: data
            })
        }
    },

    fetchCompetencies: async (specialityId) => {
        const res = await axios.get<any[]>(`../../api/speciality_competencies/${specialityId}`)
        
        if (res.status === 200) {
            const data = res.data.map(item => ({
                id: item.id,
                title: item.value,
                type: item.type
            }))

            set({
                competencies: data
            })
        }
    },

    clear: () => {
        set({
            specialties: [],
            disciplines: [],
            competencies: []
        })
    }
}))