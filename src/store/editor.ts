import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EditorState {
    id: string | undefined

    developerId: string | undefined
    sectionId: string | undefined
    themeId: string | undefined
}

interface EditorActions {
    updateId: (newId: string) => void
    updateDeveloperId: (newId: string) => void
    updateSectionId: (newId: string) => void
    updateThemeId: (newId: string) => void

    clear: () => void
}

const useEditorStore = create<EditorState & EditorActions>()(
    persist(
        (set) => ({
            id: undefined,

            developerId: undefined,
            sectionId: undefined,
            themeId: undefined,

            updateId: (newId) => set(() => ({id: newId})),
            updateDeveloperId: (newId) => set(() => ({developerId: newId})),
            updateSectionId: (newId) => set(() => ({sectionId: newId})),
            updateThemeId: (newId) => set(() => ({themeId: newId})),

            clear: () => set(() => ({
                id: undefined,
                developerId: undefined,
                sectionId: undefined,
                themeId: undefined
            }))
        }),

        {
            name: 'editor-state'
        }
    )
)

export { useEditorStore }