import { Trash, Info, Plus } from 'react-feather'
import { MouseEvent } from 'react'

interface ProgramCardProps {
    id: string
    title: string

    onClick: (id: string) => void
    onDuplicateClick: (id: string) => void
    onInfoClick: (id: string) => void
    onDeleteClick: (id: string) => void
}
 
export default function ProgramCard({id, title, onDuplicateClick, onInfoClick, onDeleteClick, onClick }: ProgramCardProps) {
    function handleDuplicateClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDuplicateClick(id)
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDeleteClick(id)
    }

    function handleInfoOpening(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onInfoClick(id)
    }

    function handleClick() {
        onClick(id)
    }

    return (
        <div onClick={handleClick} className="overflow-clip group relative flex justify-between flex-col p-3 w-[350px] bg-[#3A3A3A] rounded cursor-pointer hover:border-[#575757] hover:border-2 border-2 border-transparent transition-all">
            <p className="font-medium truncate h-full mb-4">{title}</p>
            <div className="transition-all group-hover:opacity-0 opacity-100">
                <div className="flex justify-between mb-2">
                    <span>Заполнено</span>
                    <span>34%</span>
                </div>
                <div className="h-[3px] bg-[#5C5C5C] rounded overflow-clip">
                    <div className="bg-sky-600 w-[30%] h-full"></div>
                </div>
            </div>

            <div className="flex text-[#B9B9B9] transition-all font-medium group-hover:visible group-hover:opacity-100 group-hover:bottom-0 invisible opacity-0 absolute bottom-[-10%] left-0 bg-[#575757] w-full">
                <button className='hover:bg-accent hover:text-white block px-2 py-2 w-full text-left font-medium'>
                    Сформировать
                </button>
                <button onClick={handleDelete} className='px-2 hover:bg-[#BF3C3C] hover:text-white'>
                    <Trash size={20}/>
                </button>
                <button onClick={handleDuplicateClick} className='px-2 hover:bg-accent hover:text-white'>
                    <Plus size={20}/>
                </button>
                <button onClick={handleInfoOpening} className='px-2 hover:bg-accent hover:text-white'>
                    <Info size={20}/>
                </button>
            </div>
        </div>
    );
}
