import * as React from "react";
import { connect } from "react-redux";
import { setPlayingTime, setViewStatus, songSelect } from "../../state/app";
import AudioProgressBar from "./AudioProgressBar";
import IconButton from "./IconButton";
import VolumeInput from "./VolumeInput";
import { MdPlayArrow, MdPause, MdSkipNext, MdVolumeOff, MdVolumeUp, MdSkipPrevious } from 'react-icons/md';
import { songs } from "./songs";

// import { LoadingSpinner } from "./Spinner";

function formatDurationDisplay(duration) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
    return formatted;
}

const AudioPlayer = (props) => {

    const { songCount, currentPlayingTime, viewStatus, currentSongNumber } = props;
    const audioRef = React.useRef();
    // states
    const [duration, setDuration] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(viewStatus);
    const [currrentProgress, setCurrrentProgress] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);
    const [songNumber, setSongNumber] = React.useState(currentSongNumber)
    const [volume, setVolume] = React.useState(0.2); // set to 0.2, max is 1.0
    const [songIndex, setSongIndex] = React.useState(currentSongNumber)
    let currentSong = songs[songIndex];
    React.useEffect(() => {
        setSongIndex(currentSongNumber);
        currentSong = songs[songIndex];
    }, [currentSongNumber])

    const handleVolumeChange = (volumeValue) => {
        if (!audioRef.current) return;
        audioRef.current.volume = volumeValue;
        setVolume(volumeValue);
    };

    const onNext = () => {
        // audioRef.current.pause();
        setSongIndex(songIndex + 1);
        props.setCurrentSongNumber(songIndex + 1);
        props.playingTimeSet(0);
    }
    const onPrev = () => {
        // audioRef.current.pause();
        setSongIndex(songIndex - 1);
        props.setCurrentSongNumber(songIndex - 1);
        props.playingTimeSet(0);
    }

    React.useEffect(() => {
        if (audioRef.current && isFinite(currentPlayingTime)) {
            audioRef.current.currentTime = currentPlayingTime;
            setIsPlaying(true);
            audioRef.current.pause();
            try {
                const timeout = setTimeout(() => {
                    audioRef.current.play();
                }, 500);
                return () => {
                    clearTimeout(timeout);
                };
            } catch (error) {
                window.alert("Data error:", error)
            }
        }
    }, [])

    React.useEffect(() => {
        if (!audioRef.current) return
        if (audioRef.current) {
            const autoPlaying = () => {
                try {
                    audioRef.current?.pause();
                    const timeout = setTimeout(() => {
                        audioRef.current?.play();
                    }, 500);
                    return () => {
                        clearTimeout(timeout);
                    };
                } catch (error) {
                    window.alert("Data error:", error)
                }
            }
        }

    }, [currentSongNumber]);

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
    //close audio form
    const close = () => {
        props.playingTimeSet(0);
        props.setShowPlay(false);
    }
    if ((elapsedDisplay >= durationDisplay) && (durationDisplay != 0)) {
        props.setCurrentSongNumber(songs[songNumber + 1] ? songNumber + 1 : 0)
    }

    return (
        <>
            {props.viewStatus && <div id="audioPlayer" className="sticky-player">
                <div className="row progress-bar">
                    {/* <div className="close-btn">
                        <button class="audio-close-btn" onClick={close}>X</button>
                    </div> */}
                    <div className="flex">
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

                    </div>

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
                            props.playingTimeSet(e.currentTarget.currentTime);
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
                                <MdSkipPrevious size={32} />
                            </IconButton>
                            <IconButton
                                id="play-btn"
                                disabled={!isReady}
                                onClick={togglePlayPause}
                                aria-label={isPlaying ? "Pause" : "Play"}
                                size={32}
                            >
                                {!isReady && currentSong ? (
                                    // <LoadingSpinner size={24} className="animate-spin" />
                                    <div className="text-center">O</div>

                                ) : isPlaying ? (
                                    <MdPause size={32} />
                                ) : (
                                    <MdPlayArrow size={32} />
                                )}
                            </IconButton>
                            <IconButton
                                onClick={onNext}
                                disabled={songIndex === songCount - 1}
                                aria-label="go to next"
                                intent="secondary"
                            >
                                <MdSkipNext size={32} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="justify-text-center mb-1">
                        <h3>Mishari Rashid al-`Afasy</h3>
                        <p className="text-slate-300 font-bold">
                            {currentSong?.title ?? "Select a song"}
                        </p>
                    </div>
                    <div className="col-2 during-time">
                        <p className="text-xs ">
                            {elapsedDisplay} / {durationDisplay}
                        </p>
                    </div>
                    <div className="col volume-control">
                        <div className="flex">
                            <IconButton
                                intent="secondary"
                                size="sm"
                                onClick={handleMuteUnmute}
                                aria-label={volume === 0 ? "unmute" : "mute"}
                            >
                                {volume === 0 ? <MdVolumeOff size={32} /> : <MdVolumeUp size={32} />}
                            </IconButton>
                            <p>
                                <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
                            </p>

                        </div>

                    </div>
                </div>

            </div>}
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        currentSongNumber: state.app.currentSongNumber,
        currentPlayingTime: state.app.currentPlayingTime,
        viewStatus: state.app.viewStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playingTimeSet: (time) => dispatch(setPlayingTime(time)),
        setCurrentSongNumber: (index) => dispatch(songSelect(index)),
        setShowPlay: (status) => dispatch(setViewStatus(status)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);