export interface FirstLoadProps {
    onOpenClick: () => void
}

export default function FirstLoad({ onOpenClick }: FirstLoadProps) {
    return (
        <div className="flex h-full p-10 justify-between flex-col">
            <div>
                <div className='flex flex-col gap-2 mb-10'>
                    <p className='font-semibold text-secondary-text'>Конструктор рабочих программ</p>
                    <h1 className='font-bold text-4xl w-1/2'>Работать с рабочими программами стало еще проще</h1>
                </div>
            </div>

            <div>
                <button onClick={onOpenClick} className='transition-all bg-sky-600 hover:bg-sky-700 text-sm px-14 py-3 rounded-full text-white font-medium'>
                    Открыть
                </button>
            </div>
        </div>
    );
}