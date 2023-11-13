import { ChangeEvent } from "react";

export enum FieldType {
    READONLY = "readonly",
    EDITABLE = "editable"
}

interface FieldProps {
    value: any
    readable?: FieldType
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
 
export default function Field({ value, readable = FieldType.EDITABLE, onChange }: FieldProps) {
    return (
        <input onChange={onChange} readOnly={readable === FieldType.READONLY ? true : false} value={value || ''} className="shadow appearance-none border rounded py-2 px-3 text-white bg-[#474747] focus:outline-none focus:shadow-outline" type="text" />
    );
}