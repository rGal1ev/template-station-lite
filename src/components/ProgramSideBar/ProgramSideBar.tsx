import { Info } from 'react-feather'

interface ProgramSideBarProps {
    isOpened?: boolean;
    programId: string;

    onClose: () => void;
}
 
export default function ProgramSideBar({ programId, isOpened=false, onClose }: ProgramSideBarProps) {
    return (
        <div className={`transition-all shadow-md ease bg-[#3A3A3A] w-[350px] h-full flex flex-col justify-between absolute top-0 z-10 ${isOpened ? 'right-0' : 'right-[-100%]'}`}>
            <div className='flex gap-2 items-center p-4 font-semibold'>
                <Info />
                Информация о документе
            </div>

            <div>
                <button onClick={onClose} className='py-4 w-full font-semibold bg-[#4F4F4F]'>
                    Закрыть
                </button>
            </div>
        </div>
    );
}