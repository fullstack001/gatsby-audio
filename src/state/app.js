const initialState = {
  currentSongNumber: -1,
  currentPlayingTime: 0,
  viewStatus: false
};

//action
const SET_CURRENT_SONG = "SET_CURRENT_SONG",
  SET_PLAYING_TIME = "SET_PLAYING_TIME",
  SET_VIEW_STATUS = "SET_VIEW_STATUS"

//set current song
export const songSelect = (index) => ({
  type: SET_CURRENT_SONG,
  payload: index,
});

//set playing time
export const setPlayingTime = (time) => ({
  type: SET_PLAYING_TIME,
  payload: time,
});
//set playing status or view audio form
export const setViewStatus = (status) => ({
  type: SET_VIEW_STATUS,
  payload: status,
});

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      console.log(action.payload);
      return { ...state, currentSongNumber: action.payload };
    case SET_PLAYING_TIME:
      return { ...state, currentPlayingTime: action.payload };
    case SET_VIEW_STATUS:
      return { ...state, viewStatus: action.payload }
    default:
      return state;
  }
};
