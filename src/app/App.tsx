import AppHeader from '../components/Header/AppHeader';
import ProgramList from '../views/ProgramList';
import ProgramEditor from '../views/ProgramEditor';

import ProgramExport from '../views/ProgramExport';
import { Routes, Route } from 'react-router-dom'
import General from '../views/editorViews/General';
import FirstLoad from '../views/FirstLoad';
import { useUserPreferences } from '../store/preferences';
import DeveloperEditor from '../views/editorViews/DeveloperEditor';
import Specifications from '../views/editorViews/Specifications';
import Plan from '../views/editorViews/Plan';
import { Toaster } from 'react-hot-toast';
import SectionEditor from '../views/editorViews/SectionEditor';
import ThemeEditor from '../views/editorViews/ThemeEditor';

export default function App() {
    const { getMeetingHandled } = useUserPreferences()
    const { setMeetingHandled } = useUserPreferences()

    function handleOpenClick() {
        setMeetingHandled(!getMeetingHandled())
    }

    return (
        <div className='relative text-sm h-full bg-[#272727] text-white overflow-hidden'>
            <Toaster toastOptions={{
                        style: {
                        background: '#333',
                        color: '#fff',
                        }
                     }}
            />
            
            {getMeetingHandled() ? 
                <>
                    <AppHeader />
                
                    <Routes>
                        <Route path='/' element={<ProgramList />} />

                        <Route path='/program' element={<ProgramEditor />}>
                            <Route path='general' element={<General />} />
                            <Route path='specifications' element={<Specifications />} />
                            <Route path='plan' element={<Plan />} />

                            <Route path='developer' element={<DeveloperEditor />} />
                            <Route path='section' element={<SectionEditor />} />
                            <Route path='theme' element={<ThemeEditor />} />
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