import { useState } from "react";

interface ProgramCardChooserProps {
    id: string;
    title: string;

    onClick: (id: string, isSelected: boolean) => void;
}

export default function ProgramCardChooser({id, title, onClick}: ProgramCardChooserProps) {
    const [isSelected, setSelected] = useState<boolean>(false)

    function handleClick() {
        setSelected((prev) => !prev)
        onClick(id, !isSelected)
    }

    return (
        <div onClick={handleClick} className={`overflow-clip relative flex justify-between flex-col p-3 w-[350px] bg-[#3A3A3A] rounded cursor-pointer border-2 transition-all ${isSelected ? ' border-sky-600' : 'hover:border-[#575757] border-transparent '}`}>
            <p className="font-medium truncate h-full mb-4">{title}</p>
            <div>
                <div className="flex justify-between mb-2">
                    <span>Заполнено</span>
                    <span>34%</span>
                </div>
                <div className="h-[3px] bg-[#5C5C5C] rounded overflow-clip">
                    <div className="bg-accent w-[30%] h-full"></div>
                </div>
            </div>
        </div>
    );
}
