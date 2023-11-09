import { Droppable } from "react-beautiful-dnd";
import Command from "./Command";
import React from "react";

const Column = ({ id: key, column, commands }) => {
  let titleBackground = "";
  switch (column.title) {
    case "Events":
      titleBackground = "bg-yellow-500";
      break;
    case "Motion":
      titleBackground = "bg-blue-500";
      break;
    case "Controls":
      titleBackground = "bg-pink-600 ";
      break;
    case "Looks":
      titleBackground = " bg-green-500 ";
      break;
  }
  return (
    <div key={key} className="m-2 !w-[80] border border-solid border-lightgrey">
      <div className={`p-4 ${titleBackground} font-bold `}>{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className="p-1 "
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {commands?.map((command, index) => (
              <div key={command.id}>
                <Command
                  id={command.id}
                  command={command}
                  index={index}
                  customStyle={titleBackground}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
