import { MouseEvent } from "react"

interface DeveloperCardProps {
    name: string
    post: string

    onClick: () => void
    onDeleteClick: () => void
}
 
export default function DeveloperCard({ name, post, onDeleteClick, onClick }: DeveloperCardProps) {
    function handleDeleteClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDeleteClick()
    }

    return (
        <li onClick={onClick} className="group w-full bg-[#323232] rounded flex overflow-clip">
            <button className=" text-left p-3 w-full">
                <p className="font-semibold">{name === '' ? 'Имя не указано' : name}</p>
                <span className="text-secondary-text">{post === '' ? 'Должность не указана' : post}</span>
            </button>

            <button onClick={handleDeleteClick} className="transition-all px-6 bg-[#444444] group-hover:opacity-100 opacity-0">
                Удалить
            </button>
        </li>
    );
}