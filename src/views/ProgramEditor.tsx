import EditorNavBar from "../components/EditorNavBar/EditorNavBar";
import { Outlet } from "react-router-dom";

export default function ProgramEditor() {
    return (
        <div className="h-[calc(100%-56px)] flex">
                <EditorNavBar />
                <Outlet />
        </div>
    );
}