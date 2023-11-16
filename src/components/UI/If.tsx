import { ReactNode } from "react";

interface IfProps {
    condition: boolean,
    content: ReactNode
}

function If({
    condition,
    content
}: IfProps) {
    return (
        condition ? content : null
    );
}

export default If;