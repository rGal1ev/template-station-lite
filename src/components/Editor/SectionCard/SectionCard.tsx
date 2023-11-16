import { MouseEvent } from "react"

interface SectionCardProps {
    title: string 
    name?: string
    
    onClick: () => void
    onDeleteClick: () => void
}

export default function SectionCard({
    title,
    name,
    onClick,
    onDeleteClick
}: SectionCardProps) {
    function handleDeleteClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDeleteClick()
    }

    return (
        <li onClick={onClick} className="group transition-all w-full bg-[#3A3A3A] border-2 border-transparent rounded flex overflow-clip hover:border-[#575757]">
            <button className=" text-left p-3 w-full">
                <p className="font-semibold">{title === '' ? 'Название не указано' : title}</p>
                <span className="text-secondary-text">{name === '' ? 'Название не указано' : name}</span>
            </button>

            <button onClick={handleDeleteClick} className="transition-all px-6 bg-[#575757] invisible translate-x-[50%] group-hover:translate-x-0 group-hover:visible group-hover:opacity-100 opacity-0">
                Удалить
            </button>
        </li>
    );
}