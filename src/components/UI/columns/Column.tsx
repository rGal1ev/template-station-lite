import { ReactNode } from "react";

interface ColumnProps {
    style?: string
    children: ReactNode
}

function Column({
    style,
    children
}: ColumnProps) {
    return (
        <div className={`flex flex-col gap-2 ${style && style}`}>
            { children }
        </div>
    );
}

export default Column;