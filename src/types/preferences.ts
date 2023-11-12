export interface PreferencesState {
    isMeetingHandled: boolean;
    isDarkMode: boolean;
    
    setDarkMode: (newValue: boolean) => void;
    setMeetingHandled: (newValue: boolean) => void;

    getDarkMode: () => boolean | undefined;
    getMeetingHandled: () => boolean | undefined;
}