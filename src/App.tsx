import AppHeader from './components/Header/AppHeader';
import ProgramList from './views/ProgramList';
import ProgramEditor from './views/ProgramEditor';

import ProgramExport from './views/ProgramExport';
import { Routes, Route } from 'react-router-dom'
import General from './views/EditorViews/General';

export default function App() {
    return (
        <div className='text-sm bg-[white] h-full dark:bg-[#272727] dark:text-white text-[#272727]'>
            <AppHeader />
            
            <Routes>
                <Route path='/' element={<ProgramList />} />

                <Route path='/program/:id' element={<ProgramEditor />}>
                    <Route path='general' element={<General />} />
                    <Route path='specifications' element={<h1>Общая характеристика</h1>} />
                    <Route path='plan' element={<h1>Тематический план</h1>} />
                    <Route path='other' element={<h1>Прочее</h1>} />
                </Route>

                <Route path='/export' element={<ProgramExport />} />

                <Route path='*' element={<h1>Такой страницы не существует</h1>} />
            </Routes>
        </div>
    )
}