import { ReactNode } from "react";

interface OutletLayoutProps {
    children: ReactNode
}

function OutletLayout({
    children
}: OutletLayoutProps) {
    return (
        <div className="flex-1 gap-4 p-4">
            { children }
        </div>
    );
}

export default OutletLayout;