import AppHeader from './components/AppHeader';
import ProgramList from './views/ProgramList';
import ProgramEditor from './views/ProgramEditor';

import { Routes, Route } from 'react-router-dom'

export default function App() {
    return (
        <div className='text-sm'>
            <AppHeader />
            
            <Routes>
                <Route path='/' element={<ProgramList />}/>
                <Route path='/program/:id' element={<ProgramEditor />} />

                <Route path='*' element={<h1>Такой страницы не существует</h1>} />
            </Routes>
        </div>
    )
}
