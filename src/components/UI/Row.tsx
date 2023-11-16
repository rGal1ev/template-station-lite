import { ReactNode } from "react";

interface RowProps {
    children: ReactNode
    spacing?: number
}

function Row({
    spacing = 4,
    children
}: RowProps) {
    return (
        <div className={`flex gap-${spacing} mb-4 flex-wrap`}>
            { children }
        </div>
    );
}

export default Row;