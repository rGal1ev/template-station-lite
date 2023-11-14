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
        <li onClick={onClick} className="group transition-all w-full bg-[#3A3A3A] border-2 border-transparent rounded flex overflow-clip hover:border-[#575757]">
            <button className=" text-left p-3 w-full">
                <p className="font-semibold">{name === '' ? 'Имя не указано' : name}</p>
                <span className="text-secondary-text">{post === '' ? 'Должность не указана' : post}</span>
            </button>

            <button onClick={handleDeleteClick} className="transition-all px-6 bg-[#575757] invisible translate-x-[50%] group-hover:translate-x-0 group-hover:visible group-hover:opacity-100 opacity-0">
                Удалить
            </button>
        </li>
    );
}