interface RoundedButtonProps {
    title: string
    onClick?: () => void
}

function RoundedButton({
    title,
    onClick
}: RoundedButtonProps) {
    return (
        <button onClick={onClick} className="text-sm px-6 py-2 rounded w-fit font-medium bg-[#3A3A3A] text-white">
            { title }
        </button>        
    );
}

export default RoundedButton;