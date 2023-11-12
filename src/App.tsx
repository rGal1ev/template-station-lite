import AppHeader from './components/Header/AppHeader';
import ProgramList from './views/ProgramList';
import ProgramEditor from './views/ProgramEditor';

import ProgramExport from './views/ProgramExport';
import { Routes, Route } from 'react-router-dom'
import General from './views/editorViews/General';
import FirstLoad from './views/FirstLoad';
import { useUserPreferences } from './store/preferences';

export default function App() {
    const { getMeetingHandled } = useUserPreferences()
    const { setMeetingHandled } = useUserPreferences()

    function handleOpenClick() {
        setMeetingHandled(!getMeetingHandled())
    }

    return (
        <div className='relative text-sm h-full bg-[#272727] text-white overflow-hidden'>
            {getMeetingHandled() ? 
                <>
                    <AppHeader />
                
                    <Routes>
                        <Route path='/' element={<ProgramList />} />

                        <Route path='/program/:id' element={<ProgramEditor />}>
                            <Route path='general' element={<General />}>
                                <Route path='edit' element={<h1>Edit</h1>} />
                            </Route>
                            <Route path='specifications' element={<h1>Общая характеристика</h1>}>
                                
                            </Route>
                            <Route path='plan' element={<h1>Тематический план</h1>} />
                            <Route path='other' element={<h1>Прочее</h1>} />
                        </Route>

                        <Route path='/export' element={<ProgramExport />} />
                        <Route path='settings' element={<h1>Settings</h1>} />

                        <Route path='*' element={<h1>Такой страницы не существует</h1>} />
                    </Routes>
                </>
                :
                <FirstLoad onOpenClick={handleOpenClick} />
            }
        </div>
    )
}