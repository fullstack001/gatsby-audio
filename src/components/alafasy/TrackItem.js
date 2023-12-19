// import { MdPlayArrow, MdPause } from "react-icons/md";
import cn from "classnames";
import React from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { Link } from "gatsby"
import AudioProgressBar1 from "./AudioProgressBar";
import { connect } from "react-redux";
import { setPlayingTime, songSelect, setViewStatus } from "../../state/app"

const TrackItem = ({
    title,
    trackNumberLabel,
    selected,
    onClick,
    link_url,
    trackTime,
    isPlaying,
    ...props
}) => {
    const [duration, setDuration] = React.useState(0);
    // const [isReady, setIsReady] = React.useState(false);
    // const [isPlaying, setIsPlaying] = React.useState(false);
    // states
    // const [currrentProgress, setCurrrentProgress] = React.useState(props.);
    const [buffered, setBuffered] = React.useState(0);
    const [isShown, setIsShown] = React.useState(false);

    return (
        <li
            onClick={onClick}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            className={cn(
                "list-group",
                { "bg-cyan-600 text-white": selected },
                { "hover:bg-cyan-600 hover:text-white": !selected },
            )}
        >
            <div className="row">
                <div className="col">{selected ? <MdPause size={20} /> : <MdPlayArrow size={20} />}</div>
                <div className="col">{trackNumberLabel}</div>
                <div className="col-3">{title}</div>
                <div className="col">
                    {isShown && <Link to="https://quranicaudio.com/" className="btn sbtn" > Other Qaris</Link>}
                </div>

                <div className="col">
                    {isShown && <Link to={link_url} className="btn btn-secondary sbtn">Download</Link>}</div>
                <div className="col"></div>
                <div className="col">{trackTime}</div>
            </div>
            <span className="text-sm inline-block"></span>
            <span className=" text-center"></span>
            <div className="row">
                {
                    selected && <AudioProgressBar1 duration={duration}
                        currentProgress={props.currentPlayingTime}
                        buffered={buffered}
                    />
                }
            </div>

        </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);
