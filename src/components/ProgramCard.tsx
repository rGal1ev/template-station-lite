import { Trash, Info, Plus } from 'react-feather';
import { MouseEvent } from 'react';
import { useProgramsStore } from '../store/programs';
import { useNavigate } from 'react-router-dom';

interface ProgramCardProps {
    id: string;
    title: string;
    onDuplicateClick: (id: string) => void;
}
 
export default function ProgramCard({id, title, onDuplicateClick }: ProgramCardProps) {
    const removeProgramById = useProgramsStore((state) => state.remove)
    const navigate = useNavigate()

    function handleDuplicateClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        onDuplicateClick(id);
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        removeProgramById(id)
    }

    function handleClick() {
        navigate(`/program/${id}/general`)
    }

    return (
        <div onClick={handleClick} className="overflow-clip group relative flex justify-between flex-col p-3 w-[350px] dark:bg-[#3A3A3A] bg-[#E1E1E1] rounded cursor-pointer dark:hover:border-[#575757] hover:border-[#BDBDBD] hover:border-2 border-2 border-transparent transition-all">
            <p className="font-medium truncate h-full mb-4">{title}</p>
            <div className="transition-all group-hover:opacity-0 opacity-100">
                <div className="flex justify-between mb-2">
                    <span>Заполнено</span>
                    <span>34%</span>
                </div>
                <div className="h-[3px] dark:bg-[#5C5C5C] bg-[#B8B8B8] rounded overflow-clip">
                    <div className="bg-accent w-[30%] h-full"></div>
                </div>
            </div>

            <div className="flex dark:text-[#B9B9B9] text-[#272727] transition-all font-medium group-hover:visible group-hover:opacity-100 group-hover:bottom-0 invisible opacity-0 absolute bottom-[-10%] left-0 dark:bg-[#575757] bg-[#BDBDBD] w-full">
                <button className='hover:bg-accent hover:text-white block px-2 py-2 w-full text-left font-medium'>
                    Сформировать
                </button>
                <button onClick={(e) => handleDelete(e)} className='px-2 hover:bg-[#BF3C3C] hover:text-white'>
                    <Trash size={20}/>
                </button>
                <button onClick={handleDuplicateClick} className='px-2 hover:bg-accent hover:text-white'>
                    <Plus size={20}/>
                </button>
                <button className='px-2 hover:bg-accent hover:text-white'>
                    <Info size={20}/>
                </button>
            </div>
        </div>
    );
}
