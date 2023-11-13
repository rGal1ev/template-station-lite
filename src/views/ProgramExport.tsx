import { useState } from "react"
import ProgramCardChooser from "../components/ProgramCardChooser/ProgramCardChooser"
import { useLocalStorage } from 'usehooks-ts'
import { Program } from "../types/program"

export default function ProgramExport() {
    const [storageProgramList, setStorageProgramList] = useLocalStorage<Program[]>('program-list', [])
    const [selectedProgramsList, setSelectedProgramsList] = useState<string[]>([])
    
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
                id: ''
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
        <div className=" p-4">
            {selectedProgramsList.length === 0 ? 
            <div className="flex mb-2 gap-1">
                <span className="dark:bg-[#3A3A3A] bg-[#E1E1E1] dark:text-secondary-text text-[#272727] py-1 px-3 rounded font-medium">Выберите хотя-бы один элемент</span>
            </div>
            :
            <div className="flex mb-2 gap-1">
                <span className="dark:bg-[#3A3A3A] bg-[#E1E1E1] dark:text-secondary-text text-[#272727] py-1 px-3 rounded font-medium">Выбрано</span>
                <span className="dark:bg-[#3A3A3A] bg-[#E1E1E1] dark:text-white text-[#272727] py-1 px-3 rounded">{selectedProgramsList.length}</span>
            </div>
            }
            
            <div className="flex flex-wrap gap-3 mb-4">
                {storageProgramList.map(program => (
                    <ProgramCardChooser key={program.id} 
                                        id={program.id} 
                                        title={program.title}
                                        onClick={(id, isSelected) => handleProgramClick(id, isSelected)}/>
                ))}
            </div>

            <div>
                <button onClick={handleExporting} disabled={selectedProgramsList.length === 0} className={`transition-all text-sm px-6 py-2 rounded  font-medium ${selectedProgramsList.length === 0 ? 'dark:bg-[#3A3A3A] bg-[#E1E1E1] text-secondary-text' : 'bg-accent text-white'}`}>Экспортировать и скачать</button>
            </div>
        </div>
    );
}
