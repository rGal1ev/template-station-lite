import { useState } from "react";

interface ProgramCardChooserProps {
    id: string;
    title: string;

    onClick: (id: string, isSelected: boolean) => void;
}
 
export default function ProgramCardChooser({id, title, onClick}: ProgramCardChooserProps) {
    const [isSelected, setSelected] = useState<boolean>(false)

    function handleSelecting() {
        setSelected((prev) => !prev)
        onClick(id, !isSelected)
    }

    return (
        <div onClick={handleSelecting} className={`overflow-clip relative flex justify-between flex-col p-3 w-[350px] dark:bg-[#3A3A3A] bg-[#E1E1E1] rounded cursor-pointer border-2 border-transparent transition-all ${isSelected ? 'dark:border-accent border-accent' : 'dark:hover:border-[#575757] hover:border-[#BDBDBD]'}`}>
            <p className="font-medium truncate h-full mb-4">{title}</p>
            <div>
                <div className="flex justify-between mb-2">
                    <span>Заполнено</span>
                    <span>34%</span>
                </div>
                <div className="h-[3px] dark:bg-[#5C5C5C] bg-[#B8B8B8] rounded overflow-clip">
                    <div className="bg-accent w-[30%] h-full"></div>
                </div>
            </div>
        </div>
    );
}
