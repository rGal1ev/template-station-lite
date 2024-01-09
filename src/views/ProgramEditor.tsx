import EditorNavBar from "../components/EditorNavBar/EditorNavBar";
import { Outlet } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";

export default function ProgramEditor() {
    return (
        <div className="h-[calc(100%-56px)] flex">
            <EditorNavBar />

            <Scrollbar>
                <Outlet />
            </Scrollbar>
        </div>
    );
}