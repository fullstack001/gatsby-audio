import * as React from "react";

export default function AudioProgressBar(props) {
    const { duration, currentProgress, buffered, ...rest } = props;
    const progressBarWidth = isNaN(currentProgress / duration)
        ? 0
        : currentProgress / duration;
    const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;
    const progressStyles = {
        "--progress-width": progressBarWidth,
        "--buffered-width": bufferedWidth,
    };
    return (
        <div className="progress-bar">
            <input
                type="range"
                name="progress"
                style={progressStyles}
                min={0}
                max={duration}
                value={currentProgress}
                {...rest}
            />
        </div>
    );
}