import { useEffect, useState } from "react";

interface VolumeCardProps {
    title: string
    volume: number
    sectionsVolume: number
}

function VolumeCard({
    title,
    volume,
    sectionsVolume
}: VolumeCardProps) {

    const [isSatisfy, setSatisfy] = useState<boolean>(false);

    useEffect(() => {
        console.log(sectionsVolume)
        if (volume < sectionsVolume || volume > sectionsVolume) {
            setSatisfy(false);
            return;
        }

        setSatisfy(true);
    }, [volume, sectionsVolume])

    return (
        <div className="p-2 bg-neutral-700 rounded flex justify-between">
            <p>{title}</p>
            <div>
                <span className={`${isSatisfy ? 'text-white' : 'text-red-300'}`}>{sectionsVolume}</span> / <span>{volume}</span>
            </div>
        </div>
    );
}

export default VolumeCard;