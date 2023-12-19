import AudioPlayer from "./Audio"
import TrackItem from "./TrackItem";
import { songs } from "./songs";
import { useState } from "react";
import React from "react"

export default function Comp() {
    // console.log('songs:', songs);
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);
    const currentSong = songs[currentSongIndex];
    // console.log('C.S:', currentSong);
    return (
        <div className="not-prose border border-slate-800 rounded-lg my-10">
            <div className="container mx-auto p-6 flex-1">
                <ul>
                    {songs.map((song, index) => (
                        <TrackItem
                            key={index}
                            selected={index === currentSongIndex}
                            title={song.title}
                            trackNumberLabel={song.trackNumber}
                            onClick={() => setCurrentSongIndex(index)}
                            link_url={song.src}
                            trackTime={song.trackTime}
                        />
                    ))}
                </ul>
            </div>
            {currentSongIndex > -1 && <AudioPlayer
                key={currentSongIndex}
                currentSong={currentSong}
                songCount={songs.length}
                songIndex={currentSongIndex}
                onNext={() => setCurrentSongIndex((i) => i + 1)}
                onPrev={() => setCurrentSongIndex((i) => i - 1)}
            />}
        </div>
    );
}