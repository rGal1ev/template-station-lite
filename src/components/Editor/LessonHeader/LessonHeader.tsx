interface LessonHeaderProps {
    title: string
    type: string
    hiddenValue: boolean | undefined

    onHide: (type: string) => void
    onNewLessonClick: (type: string) => void
}

export default function LessonHeader({
    title,
    type,
    hiddenValue,

    onHide,
    onNewLessonClick
}: LessonHeaderProps) {
    function handleHiding() {
        onHide(type)
    }

    function handleNewLesson() {
        onNewLessonClick(type)
    }

    return (
        <div className="flex justify-between gap-1">
            <div className="bg-neutral-700 px-3 py-2 flex-1 rounded">{ title }</div>
            <div className="flex gap-1">
                <button onClick={handleHiding} className="bg-neutral-700 px-3 py-1 rounded">{hiddenValue ? 'Раскрыть' : 'Скрыть'}</button>
                <button onClick={handleNewLesson} className="bg-neutral-700 px-3 py-1 rounded">Добавить</button>
            </div>
        </div>
    );
}