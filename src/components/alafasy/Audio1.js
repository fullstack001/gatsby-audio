import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setPlayingTime, setViewStatus } from '../../state/app';
import AudioProgressBar from './AudioProgressBar';
import IconButton from './IconButton';
import VolumeInput from './VolumeInput';
import { MdPlayArrow, MdPause, MdSkipNext, MdVolumeOff, MdVolumeUp, MdSkipPrevious } from 'react-icons/md';
import { songs } from './songs';

function formatDurationDisplay(duration) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
    const formatted = [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':'); // format - mm:ss
    return formatted;
}

const AudioPlayer11 = (props) => {
    const { songIndex, songCount, onNext, onPrev, currentPlayingTime, viewStatus } = props;
    const audioRef = useRef();
    const [volume, setVolume] = useState(0.2);
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(viewStatus);
    const [currrentProgress, setCurrrentProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [isHidden, setIsHidden] = useState(viewStatus);
    const currentSong = songs[songIndex];

    // useEffect(() => {
    //     setIsHidden(viewStatus);
    // }, [viewStatus]);

    useEffect(() => {
        if (audioRef.current && isFinite(currentPlayingTime)) {
            audioRef.current.currentTime = currentPlayingTime;
        }
    }, [currentPlayingTime]);

    useEffect(() => {
        if (!audioRef.current) return;

        const autoPlaying = async () => {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                window.alert('Data error:', error);
            }
        };

        autoPlaying();
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
        if (audioRef.current) {
            audioRef.current.volume = audioRef.current.volume === 0 ? 1 : 0;
        }
    };

    const handleBufferProgress = (e) => {
        const audio = e.currentTarget;
        const dur = audio.duration;

        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
                    const bufferedLength = audio.buffered.end(audio.buffered.length - 1 - i);
                    setBuffered(bufferedLength);
                    break;
                }
            }
        }
    };

    const close = () => {
        props.playingTimeSet(0);
        props.setShowPlay(false);
        setIsHidden(false);
    };

    return (
        <>
            {(
                <div id="audioPlayer" className="sticky-player">
                    <div className="row progress-bar">
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
                            <div className="close-btn">
                                <button className="sbtn audio-close-btn" onClick={close}>
                                    X
                                </button>
                            </div>
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
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                    size={32}
                                >
                                    {!isReady && currentSong ? (
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
                                {currentSong?.title ?? 'Select a song'}
                            </p>
                        </div>
                        <div className="col-2 during-time">
                            <p className="text-xs">
                                {elapsedDisplay} / {durationDisplay}
                            </p>
                        </div>
                        <div className="col text-center song-title"></div>
                        <div className="col volume-control">
                            <div className="flex">
                                <IconButton
                                    intent="secondary"
                                    size="sm"
                                    onClick={handleMuteUnmute}
                                    aria-label={volume === 0 ? 'unmute' : 'mute'}
                                >
                                    {volume === 0 ? <MdVolumeOff size={32} /> : <MdVolumeUp size={32} />}
                                </IconButton>
                                <p>
                                    <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentSongNumber: state.currentSongNumber,
        currentPlayingTime: state.currentPlayingTime,
        viewStatus: state.viewStatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playingTimeSet: (time) => dispatch(setPlayingTime(time)),
        setShowPlay: (status) => dispatch(setViewStatus(status)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer11);
