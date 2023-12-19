import React, { useEffect } from "react";
import { connect } from "react-redux";
// import AudioPlayer from "./Audio";
import TrackItem from "./TrackItem";
import { songs } from "./songs";
import { useState } from "react";
import AudioProgressBar1 from './AudioProgressBar.js'
import { songSelect, setViewStatus } from "../../state/app";

function formatDurationDisplay(duration) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);
  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
  return formatted;
}

const Comp1 = (props) => {

  const [currentSongIndex, setCurrentSongIndex] = useState(
    props.currentSongNumber
  );

  //set current song in redux
  const setCurrentSong = (index) => {
    setCurrentSongIndex(index);
    props.setCurrentSongNumber(index);
    props.setShowPlay(true);
  };
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
              onClick={() => setCurrentSong(index)}
              link_url={song.src}
              trackTime={song.trackTime}
            />
          ))}

        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentSongNumber: state.currentSongNumber,
    viewStatus: state.viewStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSongNumber: (index) => dispatch(songSelect(index)),
    setShowPlay: (status) => dispatch(setViewStatus(status)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp1);
