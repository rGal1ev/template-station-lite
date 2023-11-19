import { ReactNode } from "react";

interface ListColumnProps {
    children: ReactNode
    spacing?: number
}

function ListColumn({
    children,
    spacing=2
}: ListColumnProps) {
    return (
        <ul className={`flex flex-col gap-${spacing}`}>
            { children }
        </ul>
    );
}

export default ListColumn;