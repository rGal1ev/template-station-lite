import {ArrowRight} from 'react-feather'

export interface FirstLoadProps {
    onOpenClick: () => void
}

export default function FirstLoad({ onOpenClick }: FirstLoadProps) {
    return (
        <div onClick={onOpenClick} className="flex h-full p-10 justify-between flex-col">
            <div>
                <div className='flex items-center gap-2 mb-10'>
                    <h2 className="font-bold text-lg">TemplateStation Lite</h2>
                    <ArrowRight size={20} />
                    <p className='font-semibold'>Конструктор рабочих программ</p>
                </div>

                <div>
                    <h1 className='font-bold text-4xl w-1/2'>Работать с рабочими программами стало еще проще</h1>
                </div>
            </div>

            <div>
                <button className='px-12 py-4 bg-accent rounded font-semibold text-white'>
                    Открыть
                </button>
            </div>
        </div>
    );
}