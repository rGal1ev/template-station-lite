import { useProgram } from "../ProgramEditor";

export default function General() {
    const {editingProgram} = useProgram()

    return (
        <>
            {editingProgram?.title}
        </>
    );
}