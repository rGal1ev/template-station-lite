import { ChangeEvent, MouseEvent } from "react";

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
    width?: number
    readable?: FieldType
    style?: FieldStyle
    stretch?: boolean

    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onClick?: (e: MouseEvent<HTMLInputElement>) => void
}
 
export default function Field({ 
    value,
    width=220,
    readable=FieldType.EDITABLE, 
    style=FieldStyle.DEFAULT,
    stretch=false, 

    onChange,
    onClick
}: FieldProps) {
    return (
        <input onClick={onClick} onChange={onChange} readOnly={readable === FieldType.READONLY ? true : false} value={value || ''} className={`appearance-none rounded py-2 px-3 ${stretch ? 'w-full' : `w-[${width}px]`} focus:outline-none text-white ${style === FieldStyle.DEFAULT ? 'bg-[#474747] focus:ring-neutral-400 focus:ring-1' : 'bg-transparent'}`} />
    );
}