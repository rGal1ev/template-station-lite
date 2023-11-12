import { NavLink } from "react-router-dom";

export default function EditorNavBar() {
    return (
        <div className="w-[250px] h-full flex flex-col justify-between border-[#808080] border-r-2">
            <nav>
                <ul>
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "block text-left px-4 py-2 hover:bg-[#444444] w-full bg-[#3A3A3A]" : "block text-left px-4 py-2 hover:bg-[#444444] w-full"} to="general">
                            <p className="font-semibold">Основная информация</p>
                            <p className="medium text-[#BFBFBF]">Заполняется основная информация о рабочей программе</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "block text-left px-4 py-2 hover:bg-[#444444] w-full bg-[#3A3A3A]" : "block text-left px-4 py-2 hover:bg-[#444444] w-full"} to="specifications">
                            <p className="font-semibold">Общая характеристика</p>
                            <p className="medium text-[#BFBFBF]">Заполнение ПК, ОК</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "block text-left px-4 py-2 hover:bg-[#444444] w-full bg-[#3A3A3A]" : "block text-left px-4 py-2 hover:bg-[#444444] w-full"} to="plan">
                            <p className="font-semibold">Тематический план</p>
                            <p className="medium text-[#BFBFBF]">Заполняются разделы и темы рабочей программы</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "block text-left px-4 py-2 hover:bg-[#444444] w-full bg-[#3A3A3A]" : "block text-left px-4 py-2 hover:bg-[#444444] w-full"} to="other">
                            <p className="font-semibold">Прочее</p>
                            <p className="medium text-[#BFBFBF]">Дополнительная информация рабочей программы</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}