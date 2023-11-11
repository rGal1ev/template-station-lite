export interface Program {
    id: string;
    title: string;
}

export interface ProgramListState {
    programList: Program[];
    
    add: (newProgram: Program) => void;
    remove: (by: string) => void;

    get: (by: string) => Program | undefined;
    getCount: () => number;
}