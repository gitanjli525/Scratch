import { createSlice, current } from "@reduxjs/toolkit";
import { removeKeys } from "../components/Utility/dndUtils";

const initialState = {
  commands: {
    "event-0": {
      id: "event-0",
      content: "moveDown",
      text1: "Move",
      iconName: "",
      text2: "step down",
      inputValue1: "100",
      inputValueType1: "number",
    },
    "event-1": {
      id: "event-1",
      content: "moveForward",
      text1: "Move",
      iconName: "",
      text2: "steps right",
      inputValue1: "100",
      inputValueType1: "number",
    },
    "event-100": {
      id: "event-100",
      content: "moveForward",
      text1: "Move",
      iconName: "",
      text2: "steps right",
      inputValue1: "100",
      inputValueType1: "number",
      color: "bg-blue-500",
      originalId: "event-1",
    },
    "event-101": {
      id: "event-101",
      content: "moveUp",
      text1: "Move",
      iconName: "",
      text2: "steps UP",
      inputValue1: "100",
      inputValueType1: "number",
    },
    "event-102": {
      id: "event-102",
      content: "moveBackward",
      text1: "Move",
      iconName: "",
      text2: "steps left",
      inputValue1: "100",
      inputValueType1: "number",
    },
    "event-1020": {
      id: "event-1020",
      content: "moveBackward",
      text1: "Move",
      iconName: "",
      text2: "steps left",
      inputValue1: "100",
      inputValueType1: "number",
      color: "bg-blue-500",
      originalId: "event-102",
    },
    "event-2": {
      id: "event-2",
      content: "rotateAntiClockWise",
      text1: "Turn ",
      inputValue1: 10,
      inputValueType1: "number",
      isIcon: "undo",
      text2: "degrees",
    },
    "event-3": {
      id: "event-3",
      content: "rotateClockWise",
      text1: "Turn ",
      inputValue1: 10,
      inputValueType1: "number",
      isIcon: "redo",
      text2: " 15 degrees",
    },
    // ! EVENTS of sprite ****************************
    "event-4": {
      id: "event-4",
      content: "When PLAY clicked",
      text1: "When ",
      isIcon: "play",
      text2: " Clicked",
    },
    "event-41": {
      id: "event-41",
      content: "When PLAY clicked",
      text1: "When ",
      isIcon: "play",
      text2: " Clicked",
      color: "bg-yellow-500",
      originalId: "event-4",
    },
    "event-5": {
      id: "event-5",
      content: "When KEY pressed",
      text1: "When",
      isIcon: "",
      text2: "pressed",
      options: ["space", "upArrow", "downArrow", "leftArrow", "rightArrow"],
      value: "space",
    },
    "event-6": {
      id: "event-6",
      content: "When THIS SPRITE is CLICKED",
      text1: "When this SPRITE is CLICKED",
      isIcon: "",
      text2: "",
    },
    // ! LOOKS of sprite ********************************
    "event-7": {
      id: "event-7",
      content: "say",
      text1: "Say",
      isIcon: "",
      text2: " for",
      text3: "seconds",
      inputValue1: "Welcome",
      inputValue2: 2,
      inputValueType1: "text",
      inputValueType2: "number",
    },
    "event-71": {
      id: "event-71",
      content: "say",
      text1: "Say",
      isIcon: "",
      text2: " for",
      text3: "seconds",
      inputValue1: "Welcome",
      inputValue2: 2,
      inputValueType1: "text",
      inputValueType2: "number",
      color: "bg-green-500",
      originalId: "event-7",
    },
    "event-8": {
      id: "event-8",
      content: "say",
      text1: "say",
      isIcon: "",
      text2: "",
      inputValue1: "Hello",
      inputValueType1: "text",
    },
    "event-9": {
      id: "event-9",
      content: "say",
      text1: "think",
      isIcon: "",
      text2: " for",
      text3: "seconds",
      inputValue1: "HMMMM",
      inputValue2: 2,
      inputValueType1: "text",
      inputValueType2: "number",
    },
    "event-91": {
      id: "event-91",
      content: "say",
      text1: "think",
      isIcon: "",
      text2: " for",
      text3: "seconds",
      inputValue1: "HMMMM",
      inputValue2: 2,
      inputValueType1: "text",
      inputValueType2: "number",
      color: "bg-blue-500",
      originalId: "event-9",
    },
    // ! CONTROLS of sprite ****************************
    "event-10": {
      id: "event-10",
      content: "wait",
      text1: "Wait",
      isIcon: "pause",
      inputValue1: 1,
      text2: "seconds",
      inputValueType1: "number",
    },
    "event-11": {
      id: "event-11",
      content: "repeat",
      text1: "Repeat",
      isIcon: "",
      inputValue1: 10,
      inputValueType1: "number",
    },
    "event-111": {
      id: "event-111",
      content: "repeat",
      text1: "Repeat",
      isIcon: "",
      inputValue1: 10,
      inputValueType1: "number",
      color: "bg-pink-600",
      originalId: "event-11",
    },
    "event-12": {
      id: "event-12",
      content: "infiniteLoop",
      text1: "Forever loop",
      isIcon: "redo",
      text2: "",
    },
    "event-13": {
      id: "event-13",
      content: "end",
      text1: "End any iteration/repeat/loop",
      isIcon: "",
      text2: "",
    },
    "event-131": {
      id: "event-131",
      content: "end",
      text1: "End any iteration/repeat/loop",
      isIcon: "",
      text2: "",
      color: "bg-green-500",
      originalId: "event-13",
    },
  },
  columns: {
    events: {
      id: "events",
      title: "Events",
      commandIds: ["event-4", "event-5", "event-6"],
    },
    motions: {
      id: "motions",
      title: "Motion",
      commandIds: [
        "event-0",
        "event-1",
        "event-101",
        "event-102",
        "event-2",
        "event-3",
      ],
    },
    controls: {
      id: "controls",
      title: "Controls",
      commandIds: ["event-10", "event-11", "event-12", "event-13"],
    },
    looks: {
      id: "looks",
      title: "Looks",
      commandIds: ["event-7", "event-8", "event-9"],
    },
    thread1: {
      id: "thread1",
      title: "Thread",
      commandIds: [
        "event-41",
        "event-71",
        "event-111",
        "event-100",
        "event-91",
        "event-1020",
        "event-131",
      ],
    },
    thread2: {
      id: "thread2",
      title: "Thread",
      commandIds: [],
    },
    thread3: {
      id: "thread3",
      title: "Thread",
      commandIds: [],
    },
    garbage: {
      id: "garbage",
      title: "Garbage",
      commandIds: [],
    },
  },
  isCompiled: false,
  // Facilitate reordering of the columns
  columnOrder: ["events", "motions", "looks", "controls"],
  midAreaThreads: ["thread1", "garbage"],
};

const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    sourceShift: (state, { payload }) => {
      const { source, destination, draggableId, newCommandId } = payload;

      // created new command to prevent duplicated commands

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const column = state.columns[source.droppableId];

        const newcommandIds = Array.from(column.commandIds);
        newcommandIds.splice(source.index, 1);
        newcommandIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...column,
          commandIds: newcommandIds,
        };

        state.columns = { ...state.columns, [newColumn.id]: newColumn };
      } else {
        

        let background = "";

        switch (source.droppableId) {
          case "events":
            background = "bg-yellow-500";
            break;
          case "motions":
            background = "bg-blue-500";
            break;
          case "controls":
            background = "bg-pink-600 ";
            break;
          case "looks":
            background = " bg-green-500 ";
            break;
        }

        state.commands[newCommandId] = {
          ...state.commands[draggableId],
          id: newCommandId,
          color: background,
          originalId: draggableId,
        };

        // Moving from one list to another
        // const startcommandIds = Array.from(start.commandIds);
        // startcommandIds.splice(source.index, 1);

        // only add new id to the destination
        const finishcommandIds = Array.from(finish.commandIds);
        finishcommandIds.splice(destination.index, 0, newCommandId);

        const newFinish = {
          ...finish,
          commandIds: finishcommandIds,
        };

        state.columns[newFinish.id] = newFinish;
        state.isCompiled = false;
      }

      
    },
    normalShift: (state, { payload }) => {
      const { source, destination, draggableId } = payload;

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const column = state.columns[source.droppableId];

        const newcommandIds = Array.from(column.commandIds);
        newcommandIds.splice(source.index, 1);
        newcommandIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...column,
          commandIds: newcommandIds,
        };

        state.columns = { ...state.columns, [newColumn.id]: newColumn };
      } else {
        // Moving from one list to another
        const startcommandIds = Array.from(start.commandIds);
        startcommandIds.splice(source.index, 1);

        const finishcommandIds = Array.from(finish.commandIds);
        finishcommandIds.splice(destination.index, 0, draggableId);

        const newStart = {
          ...start,
          commandIds: startcommandIds,
        };

        const newFinish = {
          ...finish,
          commandIds: finishcommandIds,
        };

        state.columns[newStart.id] = newStart;
        state.columns[newFinish.id] = newFinish;
      }
      state.isCompiled = false;
    },
    addNewThread: (state, { payload }) => {
      let totalThreads = state.midAreaThreads.length;
      const newThreadId = "thread" + +totalThreads;
      
      
      state.columns = {
        ...state.columns,
        [newThreadId]: {
          id: newThreadId,
          title: "Thread " + totalThreads,
          commandIds: [],
        },
      };
      state.midAreaThreads = [...state.midAreaThreads, newThreadId];
      state.isCompiled = false;
    },
    clearGarbage: state => {
      const newState = { ...current(state) };
      const columns = { ...newState.columns };
      const garbageEvents = columns?.garbage?.commandIds;

      const newCommands = removeKeys(newState.commands, garbageEvents);

      return {
        ...newState,
        commands: newCommands,
        columns: {
          ...columns,
          garbage: { ...columns.garbage, commandIds: [] },
        },
      };
    },
    updateDropDownEventValue: (state, { payload }) => {
      const { commandId, value } = payload;
      state.commands[commandId].value = value;

      state.isCompiled = false;
    },
    updateInputValue: (state, { payload }) => {
      
      const { commandId, inputValue1, inputValue2 } = payload;
      if (inputValue1 !== undefined)
        state.commands[commandId].inputValue1 = inputValue1;

      if (inputValue2 !== undefined)
        state.commands[commandId].inputValue2 = inputValue2;

      state.isCompiled = false;
    },
    setIsCompiled: state => {
      state.isCompiled = true;
    },
    resetDND: state => {
      return initialState;
    },
    // Other actions here
  },
});

export const {
  sourceShift,
  normalShift,
  addNewThread,
  clearGarbage,
  updateDropDownEventValue,
  updateInputValue,
  setIsCompiled,
  resetDND,
} = dndSlice.actions;

export default dndSlice.reducer;
