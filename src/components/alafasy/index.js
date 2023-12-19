import React, { useEffect } from "react";
import { connect } from "react-redux";
import AudioPlayer from "./Audio";
// import TrackItem from "./TrackItem";
import { songs } from "./songs";
import { useState } from "react";

import { songSelect, setViewStatus } from "../../state/app";

const Comp = (props) => {

  const [currentSongIndex, setCurrentSongIndex] = useState(
    props.currentSongNumber
  );
  const currentSong = songs[currentSongIndex];

  return (
    <div className="not-prose border border-slate-800 rounded-lg my-10">
      <AudioPlayer
        key={currentSongIndex}
        currentSong={currentSong}
        songCount={songs.length}
        songIndex={currentSongIndex}
        onNext={() => setCurrentSongIndex((i) => i + 1)}
        onPrev={() => setCurrentSongIndex((i) => i - 1)}
      />

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentSongNumber: state.app.currentSongNumber,
    // viewStatus: state.viewStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSongNumber: (index) => dispatch(songSelect(index)),
    // setShowPlay: (status) => dispatch(setViewStatus(status)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
