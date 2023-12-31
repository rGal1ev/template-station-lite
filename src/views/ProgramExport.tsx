import { useState } from "react"
import ProgramCardChooser from "../components/ProgramCardChooser/ProgramCardChooser"
import { useLocalStorage } from 'usehooks-ts'
import { Program } from "../types/program"
import If from "../components/UI/If"
import Column from "../components/UI/columns/Column"
import Row from "../components/UI/Row"

export default function ProgramExport() {
    const [selectedProgramsList, setSelectedProgramsList] = useState<string[]>([])
    const [storageProgramList, ] = useLocalStorage<Program[]>('program-list', [])
    
    function handleProgramClick(id: string, isSelected: boolean) {
        setSelectedProgramsList(prevState => {
            if (isSelected) {
              return [...prevState, id];
            } else {
              return prevState.filter(item => item !== id);
            }
          });
    }

    function handleExporting() {
        const exportablePrograms: Program[] = storageProgramList.filter((item) => selectedProgramsList.includes(item.id))
        const preparedExportablePrograms: Program[] = exportablePrograms.map(program => {
            return {
                ...program,
                title: '[Импортировано] ' + program.title,
                id: '',
                isPinned: false
            }
        })

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(preparedExportablePrograms)
        )}`;

        const link = document.createElement("a");

        link.href = jsonString;
        link.download = `${Date.now()}.json`;
    
        link.click();
    }

    return (
        <Column style="p-4">
            <If condition={selectedProgramsList.length === 0}
                content={
                    <div className="flex mb-2 gap-1">
                        <span className="bg-[#3A3A3A] text-secondary-text py-1 px-3 rounded font-medium">Выберите хотя-бы один элемент</span>
                    </div>
                }/>

            <If condition={!(selectedProgramsList.length === 0)}
                content={
                    <div className="flex mb-2 gap-1">
                        <span className="bg-[#3A3A3A] text-secondary-text py-1 px-3 rounded font-medium">Выбрано</span>
                        <span className="bg-[#3A3A3A] text-white py-1 px-3 rounded">{selectedProgramsList.length}</span>
                    </div>
                }/>
            
            <Row spacing={3}>
                {storageProgramList.map(program => (
                    <ProgramCardChooser key={program.id} 
                                        id={program.id} 
                                        title={program.title}
                                        onClick={(id, isSelected) => handleProgramClick(id, isSelected)}/>
                ))}
            </Row>

            <Row>
                <button onClick={handleExporting} disabled={selectedProgramsList.length === 0} className={`transition-all text-sm px-6 py-2 rounded font-medium ${selectedProgramsList.length === 0 ? 'bg-[#3A3A3A] text-secondary-text' : 'bg-sky-600 text-white'}`}>Экспортировать и скачать</button>
            </Row>
        </Column>
    );
}