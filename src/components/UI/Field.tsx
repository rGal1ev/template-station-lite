import { ChangeEvent } from "react";

export enum FieldType {
    READONLY = "readonly",
    EDITABLE = "editable"
}

export enum FieldStyle {
    DEFAULT = "default",
    TRANSPARENT = "transparent"
}

interface FieldProps {
    value: any
    readable?: FieldType
    style?: FieldStyle,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
 
export default function Field({ value, readable=FieldType.EDITABLE, style=FieldStyle.DEFAULT, onChange }: FieldProps) {
    return (
        <input onChange={onChange} readOnly={readable === FieldType.READONLY ? true : false} value={value || ''} className={`appearance-none rounded py-2 px-3 text-white focus:outline-none  ${style === FieldStyle.DEFAULT ? 'bg-[#474747]' : 'bg-transparent'}`} type="text" />
    );
}