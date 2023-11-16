interface LabelProps {
    title: string
}

function Label({
    title
}: LabelProps) {
    return (
        <label className="block text-[#C9C9C9] text-sm font-semibold">
            { title }
        </label>
    );
}

export default Label;