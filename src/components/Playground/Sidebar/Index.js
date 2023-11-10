import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";

export default function Sidebar() {
  const { columns, columnOrder, commands } = useSelector(state => state.dnd);

  return (
    <div className="w-80 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {columnOrder?.map((columnId, index) => {
        const column = columns[columnId];

        const thisCommand = column?.commandIds?.map(
          commandId => commands[commandId]
        );

        return (
          <Column
            key={columnId}
            id={columnId}
            column={column}
            commands={thisCommand}
          />
        );
      })}
    </div>
  );
}
