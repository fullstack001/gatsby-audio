// YourComponent.js
import React from 'react';
import { useAudioPlayer } from '../audioPlayerContext';

const YourComponent = () => {
    const { isPlaying, togglePlay } = useAudioPlayer();

    return (
        <div>
            <p>Current Song: {'/* Display current song info here */'}</p>
            <p>Is Playing: {isPlaying ? 'Yes' : 'No'}</p>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default YourComponent;