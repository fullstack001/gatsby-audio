// import { MdPlayArrow, MdPause } from "react-icons/md";
import cn from "classnames";
import React from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { Link } from "gatsby"
import AudioProgressBar from "./AudioProgressBar";

function TrackItem({
    title,
    trackNumberLabel,
    selected,
    onClick,
    link_url,
    trackTime
}) {
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
                    {isShown && <Link to={link_url} className="btn btn-secondary sbtn">Other Qaris</Link>}</div>

                <div className="col">
                    {isShown && <Link to="https://quranicaudio.com/" className="btn sbtn" >Download</Link>}
                </div>
                <div className="col"></div>
                <div className="col">{trackTime}</div>
            </div>
            <span className="text-sm inline-block"></span>
            <span className=" text-center"></span>
            <div className="row">
                {/* <div className="list-progress">
                    <AudioProgressBar />
                </div> */}
            </div>

        </li>
    );
}
export default TrackItem;