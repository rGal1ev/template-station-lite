import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PreferencesState } from '../types/preferences'

const useUserPreferences = create<PreferencesState>()(
    persist(
        (set, get) => ({
            isDarkMode: true,
            isMeetingHandled: false,

            setDarkMode: (newValue) => set(() => ({isDarkMode: newValue})),
            setMeetingHandled: (newValue) => set(() => ({isMeetingHandled: newValue})),

            getDarkMode: () => get().isDarkMode,
            getMeetingHandled: () => get().isMeetingHandled
        }),

        {
            name: 'user-preferences'
        }
    )
)

export { useUserPreferences }