import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  left: 0,
  top: 0,
  rotation: 0,
  speaking: "",

  events: {
    "event-4": {
      id: "event-4",
      content: "When PLAY clicked",
      subscribedThreads: [],
    },
    "event-5": {
      space: {
        id: "space",
        content: "When key clicked",
        subscribedThreads: [],
      },
      upArrow: {
        id: "upArrow",
        content: "When key clicked",
        subscribedThreads: [],
      },
      downArrow: {
        id: "downArrow",
        content: "When key clicked",
        subscribedThreads: [],
      },
      leftArrow: {
        id: "leftArrow",
        content: "When key clicked",
        subscribedThreads: [],
      },
      rightArrow: {
        id: "rightArrow",
        content: "When key clicked",
        subscribedThreads: [],
      },
    },
    "event-6": {
      id: "event-6",
      content: "When SPRITE clicked",
      subscribedThreads: [],
    },
  },
};

const spriteSlice = createSlice({
  name: "sprite",
  initialState,
  reducers: {
    compileScripts: (state, { payload }) => {
      const { threadId, eventId, eventValue } = payload;

      const newState = current(state);
      if (eventId === "event-5") {
        state.events[eventId][eventValue].subscribedThreads = [
          ...state.events[eventId][eventValue].subscribedThreads,
          threadId,
        ];
      } else {
        state.events[eventId].subscribedThreads = [
          ...state.events[eventId].subscribedThreads,
          threadId,
        ];
      }
    },
    resetScripts: () => {
      return initialState;
    },
    moveForward: state => {
      state.left += 1;
    },
    moveDown: state => {
      state.top += 1;
    },
    moveUp: state => {
      state.top -= 1;
    },
    moveBack: state => {
      state.left -= 1;
    },
    rotateClockWise: state => {
      state.rotation += 1;
    },
    rotateAntiClockWise: state => {
      let newRotation = state.rotation - 1;
      if (newRotation < 0) state.rotation = 360 + newRotation;
      else state.rotation = newRotation;
    },
    speak: (state, { payload }) => {
      const { message } = payload;

      state.speaking = message;
    },
    // Other actions here
  },
});

export const {
  compileScripts,
  resetScripts,

  // motion
  moveDown,
  moveForward,
  moveUp,
  moveBack,

  // rotation
  rotateClockWise,
  rotateAntiClockWise,

  //looks
  speak,
} = spriteSlice.actions;

export default spriteSlice.reducer;
