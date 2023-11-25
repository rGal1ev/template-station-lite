import { MouseEvent } from "react"
import { Theme } from "../../../types/program"

interface SectionCardProps {
    index: number
    title: string
    themes: Theme[]
    
    onClick: () => void
    onDeleteClick: () => void
}

export default function SectionCard({
    index,
    title = '',
    themes,

    onClick,
    onDeleteClick
}: SectionCardProps) {
    function handleDeleteClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDeleteClick()
    }

    const { independents, laboratorys, practicals, theoreticals } = themes.reduce((acc, theme) => {
        theme.independents.lessons.forEach(lesson => {
            acc.independents += lesson.volume;
        });

        theme.laboratorys.lessons.forEach(lesson => {
            acc.laboratorys += lesson.volume;
        });

        theme.practicals.lessons.forEach(lesson => {
            acc.practicals += lesson.volume;
        });

        theme.theoreticals.lessons.forEach(lesson => {
            acc.theoreticals += lesson.volume;
        });

        return acc;
    }, {
        independents: 0,
        laboratorys: 0,
        practicals: 0,
        theoreticals: 0
    });

    return (
        <li onClick={onClick} className="group transition-all bg-[#3A3A3A] border-2 border-transparent rounded flex overflow-clip hover:border-[#575757]">
            <button className="text-left p-3 flex-1 flex gap-4">
                <div className="w-[300px]">
                    <p className="font-semibold">Раздел { index + 1 }</p>
                    <span className="text-secondary-text block truncate">{title === '' ? 'Название не указано' : title}</span>
                </div>
            
                <div className="flex gap-5">
                    <div>
                        <p className=" text-secondary-text">Лекц-ых</p>
                        <span>{ theoreticals === 0 ? '-' : theoreticals }</span>
                    </div>
                    <div>
                        <p className="text-secondary-text">ЛПЗ</p>
                        <span>{ (laboratorys + practicals === 0) ? '-' : (laboratorys + practicals) }</span>
                    </div>
                    <div>
                        <p className="text-secondary-text">Сам-ых</p>
                        <span>{ independents === 0 ? '-' : independents }</span>
                    </div>
                </div>
            </button>

            <button onClick={handleDeleteClick} className="transition-all px-6 bg-[#575757] invisible translate-x-[50%] group-hover:translate-x-0 group-hover:visible block group-hover:opacity-100 opacity-0">
                Удалить
            </button>
        </li>
    );
}