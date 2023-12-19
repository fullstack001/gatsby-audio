import React, { useState, useRef } from "react"
import GlobalStyles from "./GlobalStyles"
import Player from "./Player"
import Song from "./Song"
import Library from "./Library"
import { Helmet } from "react-helmet"
import Nav from "./Nav"
import { graphql } from "gatsby"
import styled from "styled-components"

const IndexPage = ({ data }) => {
  const songData = data ? data : "";
  const [songs, setSongs] = useState(songData)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  // Get a reference to the audio html element
  const audioRef = useRef(null)

  const timeUpdateHandler = e => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime: current, duration })
  }
  return (
    <StyledIndex className="index">
      <GlobalStyles />
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong}
      >
        <track
          default
          kind="captions"
          srcLang="en"
          src={currentSong}
        ></track>
      </audio>
    </StyledIndex>
  )
}

// export const query = graphql`
//   query {
//     allSanitySongs {
//       nodes {
//         title
//         cover {
//           asset {
//             fluid {
//               ...GatsbySanityImageFluid
//             }
//           }
//         }
//         artist
//         audio
//         active
//         _id
//       }
//     }
//   }
// `

const StyledIndex = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  audio {
    margin: 0 auto;
  }
`

export default IndexPage