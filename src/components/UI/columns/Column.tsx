import { ReactNode } from "react";

interface ColumnProps {
    style?: string
    children: ReactNode
}

function Column({
    style=undefined,
    children
}: ColumnProps) {
    return (
        <div className={`flex flex-col gap-2 ${style === undefined ? '' : style}`}>
            { children }
        </div>
    );
}

export default Column;