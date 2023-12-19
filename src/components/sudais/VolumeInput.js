import React from 'react'
// interface VolumeInputProps {
//     volume: number;
//     onVolumeChange: (volume: number) => void;
// }
export default function VolumeInput(props) {
    const { volume, onVolumeChange } = props;
    return (
        <input
            id='volumeInput1'
            aria-label="volume"
            name="volume"
            type="range"
            min={0}
            step={0.05}
            max={1}
            value={volume}
            className="volumeInput"
            onChange={(e) => {
                onVolumeChange(e.currentTarget.valueAsNumber);
            }}
        />
    );
}