import { ChangeEvent } from "react";
import Field from "../../UI/form/Field";
import { memo } from "react";

interface LessonCardProps {
    id: string
    index: number
    type: string
    typeName: string
    title: string

    onTitleChange: (e: ChangeEvent<HTMLInputElement>, type: string, id: string) => void
    onDeleteClick: (type: string, id: string) => void
}

function LessonCard({
    id,
    index,
    type,
    typeName,
    title,

    onTitleChange,
    onDeleteClick
}: LessonCardProps) {
    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        onTitleChange(e, type, id)
    }
    
    return (
        <li className="group transition-all w-full bg-[#3A3A3A] border-2 border-transparent rounded flex overflow-clip hover:border-[#575757]">
            <div className="text-left p-3 w-full">
                <p className="mb-2">{typeName} {index + 1}</p>
                <Field value={title} stretch={true} onChange={(e) => handleTitleChange(e)}/>
            </div>

            <button onClick={() => onDeleteClick(type, id)} className="transition-all px-6 bg-[#575757] invisible translate-x-[50%] group-hover:translate-x-0 group-hover:visible group-hover:opacity-100 opacity-0">
                Удалить
            </button>
        </li>
    );
}

export default memo(LessonCard);