import { DragDropContext } from "react-beautiful-dnd";
import React from "react";
import Sidebar from "./Sidebar/Index";
import MidArea from "./MidArea/Index";
import { useSelector } from "react-redux";
import { createNewCommandId } from "../Utility/dndUtils";
import { useDispatch } from "react-redux";
import { normalShift, sourceShift } from "../../store/dndReducer";

const PlayGround = () => {
  const { columns, columnOrder, commands } = useSelector(state => state.dnd);
  const dispatch = useDispatch();

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // stopping them from moving from one COMMAND source into another COMMAND source
    if (
      columnOrder.indexOf(destination.droppableId) !== -1 &&
      columnOrder.indexOf(source.droppableId) !== -1 &&
      destination.droppableId !== source.droppableId
    ) {
      return;
    }

    // STOP ->Mid Area THREAD to  Side Bar SOURCE transfer
    if (
      columnOrder.indexOf(destination.droppableId) !== -1 &&
      columnOrder.indexOf(source.droppableId) === -1 &&
      destination.droppableId !== source.droppableId
    ) {
      return;
    }

    if (columnOrder.indexOf(source.droppableId) !== -1) {
      // transferring from SOURCE to any MID AREA thread

      const newCommandId = createNewCommandId(draggableId, commands);
      dispatch(sourceShift({ source, destination, draggableId, newCommandId }));
      return;
    } else {
      // transferring between THREADS
      dispatch(normalShift({ source, destination, draggableId }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Sidebar />
      <MidArea />
    </DragDropContext>
  );
};

export default PlayGround;
