import * as React from "react";
import AudioProgressBar from "./AudioProgressBar";
import IconButton from "./IconButton";
import VolumeInput from "./VolumeInput";
import { MdPlayArrow, MdPause, MdSkipNext, MdVolumeOff, MdVolumeUp, MdSkipPrevious } from 'react-icons/md';
// import { LoadingSpinner } from "./Spinner";

function formatDurationDisplay(duration) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
    return formatted;
}


export default function AudioPlayer(props) {
    const { currentSong, songCount, songIndex, onNext, onPrev } = props;
    const audioRef = React.useRef();
    // states
    const [volume, setVolume] = React.useState(0.2); // set to 0.2, max is 1.0
    const handleVolumeChange = (volumeValue) => {
        if (!audioRef.current) return;
        audioRef.current.volume = volumeValue;
        setVolume(volumeValue);
    };
    const [duration, setDuration] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(true);
    // states
    const [currrentProgress, setCurrrentProgress] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);

    React.useEffect(() => {
        if (!audioRef.current) return
        if (audioRef.current) {
            console.log(audioRef.current);
            audioRef.current?.pause();
            const timeout = setTimeout(() => {
                audioRef.current?.play();
            }, 500);
            return () => {
                clearTimeout(timeout);
            };
        }

    }, [songIndex]);

    const durationDisplay = formatDurationDisplay(duration);
    const elapsedDisplay = formatDurationDisplay(currrentProgress);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };
    const handleMuteUnmute = () => {
        if (!audioRef.current) return;
        if (audioRef.current.volume !== 0) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = 1;
        }
    };

    // handler
    const handleBufferProgress = (e) => {
        const audio = e.currentTarget;
        const dur = audio.duration;
        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (
                    audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime
                ) {
                    const bufferedLength = audio.buffered.end(
                        audio.buffered.length - 1 - i,
                    );
                    setBuffered(bufferedLength);
                    break;
                }
            }
        }
    };

    return (
        <div className="sticky-player">

            <div className="row progress-bar">
                <AudioProgressBar
                    duration={duration}
                    currentProgress={currrentProgress}
                    buffered={buffered}
                    onChange={(e) => {
                        if (!audioRef.current) return;
                        audioRef.current.currentTime = e.currentTarget.valueAsNumber;
                        setCurrrentProgress(e.currentTarget.valueAsNumber);
                    }}
                />
                <audio
                    ref={audioRef}
                    preload="metadata"
                    onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                    onEnded={onNext}
                    onCanPlay={(e) => {
                        e.currentTarget.volume = volume;
                        setIsReady(true);
                    }}
                    onTimeUpdate={(e) => {
                        setCurrrentProgress(e.currentTarget.currentTime);
                        handleBufferProgress(e);
                    }}
                    onPlaying={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
                    onProgress={handleBufferProgress}
                >
                    <source type="audio/mpeg" src={currentSong?.src} />
                </audio>
            </div>
            <div className="row justify-content-center">
                <div className="col-1 space"></div>
                <div className="col-3 control-btn">
                    <div className="flex justify-content-center">
                        <IconButton
                            onClick={onPrev}
                            disabled={songIndex === 0}
                            aria-label="go to previous"
                            intent="secondary"
                        >
                            <MdSkipPrevious size={24} />
                        </IconButton>
                        <IconButton
                            id="play-btn"
                            disabled={!isReady}
                            onClick={togglePlayPause}
                            aria-label={isPlaying ? "Pause" : "Play"}
                            size={50}
                        >
                            {!isReady && currentSong ? (
                                // <LoadingSpinner size={24} className="animate-spin" />
                                <div>O</div>

                            ) : isPlaying ? (
                                <MdPause size={30} />
                            ) : (
                                <MdPlayArrow size={30} />
                            )}
                        </IconButton>
                        <IconButton
                            onClick={onNext}
                            disabled={songIndex === songCount - 1}
                            aria-label="go to next"
                            intent="secondary"
                        >
                            <MdSkipNext size={24} />
                        </IconButton>
                    </div>
                </div>
                <div className="justify-text-center mb-1">
                    <h3>Abdur-Rahman as-Sudais</h3>
                    <p className="text-slate-300 font-bold">
                        {currentSong?.title ?? "Select a song"}
                    </p>
                    {/* <p className="text-xs">Singer Name</p> */}
                </div>
                <div className="col-2 during-time">
                    <p className="text-xs">
                        {elapsedDisplay} / {durationDisplay}
                    </p>
                </div>
                <div className="col text-center song-title">


                </div>
                <div className="col volume-control">
                    <div className="flex">
                        <IconButton
                            intent="secondary"
                            size="sm"
                            onClick={handleMuteUnmute}
                            aria-label={volume === 0 ? "unmute" : "mute"}
                        >
                            {volume === 0 ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
                        </IconButton>
                        <p>
                            <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
                        </p>

                    </div>

                </div>
            </div>

        </div>
    );
}
