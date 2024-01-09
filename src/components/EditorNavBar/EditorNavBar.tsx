import { NavLink } from "react-router-dom";
import { useProgramStore } from "../../store/program";
import { useEffect, useState } from "react";
import VolumeCard from "../Editor/VolumeCard/VolumeCard";

export default function EditorNavBar() {
    const sections = useProgramStore(state => state.program?.sections);
    const volumes = useProgramStore(state => state.program?.disciplineVolume);

    const [sectionsVolume, setSectionsVolume] = useState({
        independents: 0,
        laboratorys: 0,
        practicals: 0,
        theoreticals: 0
    }); 

    useEffect(() => {
        const sectionsVolume = {
            independents: 0,
            laboratorys: 0,
            practicals: 0,
            theoreticals: 0
        }

        sections?.forEach(section => {
            section.themes.forEach(theme => {
                setSectionsVolume({
                    independents: sectionsVolume.independents += theme.independents.lessons.length * 2,
                    laboratorys: sectionsVolume.laboratorys += theme.laboratorys.lessons.length * 2,
                    practicals: sectionsVolume.practicals += theme.practicals.lessons.length * 2,
                    theoreticals: sectionsVolume.theoreticals += theme.theoreticals.lessons.length * 2
                })
            })
        })
    }, [sections])

    return (
        <div className="w-[350px] h-full flex flex-col justify-between items-stretch p-3">
            <nav>
                <ul className="flex flex-col gap-2">
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "rounded block text-left px-4 py-2 w-full bg-neutral-700" : "transition-all block text-left px-4 py-2 w-full rounded hover:bg-neutral-600"} to="general">
                            <p className="font-semibold">Основная информация</p>
                            <p className="medium text-[#BFBFBF]">Заполняется основная информация о рабочей программе</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "rounded block text-left px-4 py-2 w-full bg-neutral-700" : "transition-all block text-left px-4 py-2 w-full rounded hover:bg-neutral-600"} to="specifications">
                            <p className="font-semibold">Общая характеристика</p>
                            <p className="medium text-[#BFBFBF]">Заполнение ПК, ОК</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "rounded block text-left px-4 py-2 w-full bg-neutral-700" : "transition-all block text-left px-4 py-2 w-full rounded hover:bg-neutral-600"} to="plan">
                            <p className="font-semibold">Тематический план</p>
                            <p className="medium text-[#BFBFBF]">Заполняются разделы и темы рабочей программы</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            
            <div>
                <p className="mb-1">Количество часов</p>

                <ul>
                    <li className="flex flex-col gap-2">
                        <VolumeCard title="Лекционные"
                                    volume={volumes?.theoretical || 0} 
                                    sectionsVolume={sectionsVolume.theoreticals} />
                        
                        <VolumeCard title="Лабораторные"
                                    volume={volumes?.laboratory || 0} 
                                    sectionsVolume={sectionsVolume.laboratorys} />

                        <VolumeCard title="Практические"
                                    volume={volumes?.practical || 0} 
                                    sectionsVolume={sectionsVolume.practicals} />

                        <VolumeCard title="Самостоятельные"
                                    volume={volumes?.independent || 0} 
                                    sectionsVolume={sectionsVolume.independents} />
                    </li>
                </ul>
            </div>
        </div>
    );
}