import { ReactNode } from "react";

interface ListColumnProps {
    children: ReactNode
}

function ListColumn({
    children
}: ListColumnProps) {
    return (
        <ul className="flex flex-col gap-2">
            { children }
        </ul>
    );
}

export default ListColumn;