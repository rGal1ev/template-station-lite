import { NavLink } from "react-router-dom";

export default function EditorNavBar() {
    return (
        <div className="w-[300px] h-full flex flex-col justify-between items-stretch p-3">
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
        </div>
    );
}