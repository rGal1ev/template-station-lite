import { Info } from 'react-feather'

interface ProgramSideBarProps {
    isOpened?: boolean;
    programId: string;

    onClose: () => void;
}
 
export default function ProgramSideBar({ isOpened=false, onClose }: ProgramSideBarProps) {
    return (
        <div className={`transition-all ease w-[350px] h-full p-2 fixed top-0 z-10 ${isOpened ? 'right-0 opacity-100' : ' invisible right-[-10%] opacity-0'}`}>
            <div className='bg-neutral-700 shadow-md h-full flex flex-col justify-between rounded overflow-clip'>
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
        </div>
    );
}