import { CompetenceType } from "../../../types/program";

interface CompetenceCardProps {
    title: string
    type: CompetenceType

    onClick: () => void
}

function CompetenceCard({
    title,
    type,
    onClick
}: CompetenceCardProps) {
    return (
        <li onClick={onClick} className="group transition-all w-full bg-[#3A3A3A] border-2 border-transparent rounded flex overflow-clip hover:border-[#575757]">
            <button className=" text-left p-3 w-full">
                <p className="font-semibold">{title}</p>
                <span className="text-secondary-text">{type === 'practicial' ? 'Практическая компетенция' : 'Общая компетенция'}</span>
            </button>

            <button onClick={onClick} className="transition-all px-6 bg-[#575757] invisible translate-x-[50%] group-hover:translate-x-0 group-hover:visible group-hover:opacity-100 opacity-0">
                Удалить
            </button>
        </li>
    );
}

export default CompetenceCard;