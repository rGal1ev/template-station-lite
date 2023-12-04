import { Trash, Plus, Paperclip } from 'react-feather'
import { MouseEvent } from 'react'
import { Program, Theme } from '../../types/program'

interface ProgramCardProps {
    id: string
    title: string
    isPinned: boolean
    program: Program

    onClick: (id: string) => void
    onGenerateClick: (id: string) => void

    onDuplicateClick: (id: string) => void
    onDeleteClick: (id: string) => void
    onPinnedClick: (id: string) => void
}
 
export default function ProgramCard({
    id, 
    title, 
    isPinned,
    program,

    onDuplicateClick,
    onGenerateClick,
    onDeleteClick, 
    onClick,
    onPinnedClick 
}: ProgramCardProps) {
    function handleDuplicateClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDuplicateClick(id)
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onDeleteClick(id)
    }

    function handlePin(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onPinnedClick(id)
    }

    function handleDocumentGeneration(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        onGenerateClick(id)
    }

    function handleClick() {
        onClick(id)
    }

    function calculateProgramCompleteness(program: Program): number {
        let completeness = 0;
      
        const {
            academicSpecialty,
            academicDiscipline,
            developers,
            competencies,
            disciplineVolume,
            sections,
            developmentYear
        } = program;
      
        if (academicSpecialty !== undefined) {
            completeness += 10;
        }

        if (developmentYear !== "") {
            completeness += 10;
        }

        if (academicDiscipline !== "") {
            completeness += 10;
        }

        if (developers.length > 0) {
            completeness += 10;
        }

        if (competencies.length > 0) {
            completeness += 10;
        }

        if (
            disciplineVolume.theoretical !== 0 ||
            disciplineVolume.laboratory !== 0 ||
            disciplineVolume.practical !== 0 ||
            disciplineVolume.independent !== 0 ||
            disciplineVolume.certification !== 0
        ) {
            completeness += 20;
        }

        if (sections.length > 0) {
            completeness += 30;
        }
      
        return completeness;
    }

    return (
        <div onClick={handleClick} className="overflow-clip group relative flex justify-between flex-col p-3 w-[350px] bg-[#3A3A3A] rounded cursor-pointer hover:border-[#575757] hover:border-2 border-2 border-transparent transition-all">
            <p className="font-medium truncate h-full mb-4">{title}</p>
            <div className="transition-all group-hover:opacity-0 opacity-100">
                <div className="flex justify-between mb-2">
                    <span>Заполнено</span>
                    <span>{calculateProgramCompleteness(program)}%</span>
                </div>
                <div className="h-[3px] bg-[#5C5C5C] rounded overflow-clip">
                    <div className='bg-sky-600 h-full' style={{
                        width: `${calculateProgramCompleteness(program)}%`
                    }}></div>
                </div>
            </div>

            <div className="flex text-[#B9B9B9] transition-all font-medium group-hover:visible group-hover:opacity-100 group-hover:bottom-0 invisible opacity-0 absolute bottom-[-10%] left-0 bg-[#575757] w-full">
                <button onClick={handleDocumentGeneration} className='hover:bg-accent hover:text-white block px-2 py-2 w-full text-left font-medium'>
                    Сформировать
                </button>
                <button onClick={handleDelete} className='px-2 hover:bg-[#BF3C3C] hover:text-white'>
                    <Trash size={20}/>
                </button>
                <button onClick={handlePin} className={`px-2 hover:bg-accent ${isPinned && 'text-white'} hover:text-white`}>
                    <Paperclip size={20}/>
                </button>
                <button onClick={handleDuplicateClick} className='px-2 hover:bg-accent hover:text-white'>
                    <Plus size={20}/>
                </button>
            </div>
        </div>
    );
}
