import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Command from "../Sidebar/Command";
import { MyButton } from "../../Utility/dndUtils";
import { useDispatch } from "react-redux";
import { addNewThread, clearGarbage } from "../../../store/dndReducer";

export default function MidArea() {
  const { midAreaThreads, columns, commands } = useSelector(
    (state) => state.dnd
  );

  const dispatch = useDispatch();
  const addNewThreadHandler = () => {
    dispatch(addNewThread());
  };

  // console.log({ gar: columns.garbage.commandIds.length });
  const length = columns?.garbage?.commandIds?.length;

  useEffect(() => {
    if (length !== undefined && length > 3) dispatch(clearGarbage());
  }, [columns]);

  return (
    <div className="w-full m-2 bg-blue-100 border border-solid border-lightgrey flex flex-col overflow-y-auto">
      <MyButton onClick={addNewThreadHandler} />
      {midAreaThreads?.map((thread, index) => {
        const column = columns[thread];
        const commandIds = column.commandIds;
        const background =
          thread === "garbage" ? "bg-black absolute" : "bg-blue-200";
        const textColor = thread === "garbage" ? "text-white" : "text-black";
        const bottom = thread === "garbage" ? 0 : "";
        const width = thread === "garbage" ? "20vh" : "";

        return (
          <div
            key={thread}
            style={{ bottom: bottom, minWidth: width }}
            className={`  h-[100px] p-2 m-2 ${background} border border-solid border-black`}
          >
            <div className={`${textColor}`}>{thread}</div>
            <Droppable droppableId={thread}>
              {(provided, snapshot) => (
                <div
                  className={`p-1 w-[100px]`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  {commandIds.map((ids, index) => {
                    const command = commands[ids];

                    console.log(command);

                    return (
                      <div key={command.id}>
                        <Command
                          id={command.id}
                          command={command}
                          index={index}
                          customStyle={command.color}
                        />
                      </div>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <br />
          </div>
        );
      })}
    </div>
  );
}
