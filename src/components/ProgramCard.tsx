interface ProgramCardProps {
    id: string;
    name: string;

    onClick: (id: string) => void;
}
 
export default function ProgramCard({id, name, onClick }: ProgramCardProps) {
    return (
        <div onClick={() => onClick(id)} className="flex justify-between flex-col p-3 w-[270px] h-[130px] bg-[#3A3A3A] rounded cursor-pointer">
            <p className="font-medium">{name}</p>
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
