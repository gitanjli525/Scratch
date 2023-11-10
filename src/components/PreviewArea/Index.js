import React, { useState } from "react";
import CatSprite from "./CatSprite";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  MyButton,
  findPressedKey,
  findPressedKeyEventType,
} from "../Utility/dndUtils";
import Icon from "../Utility/Icon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  compileScripts,
  moveBack,
  moveDown,
  moveForward,
  moveUp,
  resetScripts,
  rotateAntiClockWise,
  rotateClockWise,
  speak,
} from "../../store/spriteReducer";
import Info from "./Info";
import { useEffect } from "react";
import { resetDND, setIsCompiled } from "../../store/dndReducer";

export default function PreviewArea() {
  const [playSize, setPlaySize] = useState(25);
  const [stopSize, setStopSize] = useState(25);
  const [equalsSize, setEqualsSize] = useState(25);

  const { midAreaThreads, columns, commands } = useSelector(state => state.dnd);

  const { left, top, rotation, events, speaking } = useSelector(
    state => state.sprite
  );
  const dispatch = useDispatch();

  const equalClickHandler = () => {
    dispatch(resetScripts());
    midAreaThreads.forEach(threadId => {
      if (threadId !== "garbage") {
        const threadCommands = [...columns[threadId].commandIds];

        // if thread is empty
        if (threadCommands.length === 0) return;

        const command = commands[threadCommands[0]];
        const originalId = command.originalId;

        if (
          originalId !== undefined &&
          columns.events.commandIds.findIndex(event => event === originalId) !==
            -1
        ) {
          dispatch(setIsCompiled());
          dispatch(
            compileScripts({
              threadId,
              eventId: originalId,
              eventValue: command?.value,
            })
          );
        } else {
        }
      }
    });
  };

  const executeCommand = (
    allCommandIds,
    command,
    startTime,
    index,
    stack = []
  ) => {
    switch (command.content) {
      case "moveDown":
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveDown());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "moveForward":
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveForward());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "moveBackward":
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveBack());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "moveUp":
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveUp());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "rotateClockWise":
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(rotateClockWise());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1 + 100;

      case "rotateAntiClockWise":
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(rotateAntiClockWise());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1 + 100;

      case "say":
        let time = command.inputValue2 !== undefined ? command.inputValue2 : 1;
        setTimeout(() => {
          dispatch(speak({ message: command.inputValue1 }));
        }, startTime);

        setTimeout(() => {
          dispatch(speak({ message: "" }));
        }, startTime + time * 1000);

        return startTime + time * 1000 + 100;

      case "wait":
        return startTime + +command.inputValue1 * 1000;

      case "repeat":
        let startIndex = index;
        stack.push({
          startIndex,
          commandId: command.id,
          repeatNumber: command.inputValue1 - 1,
        });

        return startTime;

      case "infiniteLoop":
        // let startIndex = index;
        stack.push({
          startIndex: index,
          commandId: command.id,
          repeatNumber: 999,
        });

        return startTime;

      case "end":
        let endIndex = index;
        if (stack.length > 0) {
          const { startIndex, commandId, repeatNumber } =
            stack[stack.length - 1];

          startTime = executeAllCommands(
            allCommandIds,
            startIndex + 1,
            endIndex - 1,
            repeatNumber,
            startTime,
            stack
          );

          stack.pop();
        }

        return startTime;

      default:
        return startTime + 0;
    }
  };

  const executeAllCommands = (
    allCommandIds,
    startIndex = 0,
    endIndex = 0,
    iteration = 0,
    startTime = 0,
    stack = []
  ) => {
    // const stack = [];

    if (
      startIndex < endIndex &&
      startIndex !== endIndex &&
      endIndex !== 0 &&
      iteration !== 0
    ) {
      for (let count = 0; count < iteration; count++) {
        for (let i = startIndex; i <= endIndex; i++) {
          const commandId = allCommandIds[i];
          const command = commands[commandId];

          startTime = executeCommand(
            allCommandIds,
            command,
            startTime,
            i,
            stack
          );
        }
      }
      return startTime;
    } else {
      allCommandIds.forEach((commandId, index) => {
        const command = commands[commandId];
        const repeatNumber = 0;
        const startIndex = 0;

        startTime = executeCommand(
          allCommandIds,
          command,
          startTime,
          index,
          stack
        );

        return startTime;
      });
    }
  };

  const executeThreads = subscribedThreads => {
    subscribedThreads.forEach(threadId => {
      const { commandIds: allCommandIds } = columns[threadId];

      let startTime = 0;
      executeAllCommands(allCommandIds);
    });
  };

  const playClickHandler = () => {
    const { subscribedThreads } = events["event-4"];

    executeThreads(subscribedThreads);
  };

  const spriteClickHandler = () => {
    const { subscribedThreads } = events["event-6"];

    executeThreads(subscribedThreads);
  };

  const onKeyPress = (key, events) => {
    const eventType = findPressedKeyEventType(key);

    if (eventType !== undefined) {
      const { subscribedThreads } = events["event-5"][eventType];

      executeThreads(subscribedThreads);
    }
  };

  useEffect(() => {
    const handleKeyPress = event => {
      onKeyPress(event.key, events);
      // Do something based on the key press
    };

    // Add event listener when component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

    // events is required here else onKeyPress is getting older state of 'events' from redux
  }, [events]);

  return (
    <>
      <div className="w-full  flex flex-col justify-between overflow-y-auto overflow-x-auto">
        <Info />

        <div className="flex flex-row">
          <div
            onMouseEnter={() => {
              setEqualsSize(30);
            }}
            onMouseLeave={() => {
              setEqualsSize(25);
            }}
            className="h-10 w-10 flex flex-row "
            onClick={equalClickHandler}
          >
            <Icon
              name="equals"
              size={equalsSize}
              className="text-green-400  hover:text-green-600 !active:text-green-900 mx-2 my-2"
            />
          </div>
          <div
            onMouseEnter={() => {
              setPlaySize(30);
            }}
            onMouseLeave={() => {
              setPlaySize(25);
            }}
            className="h-10 w-10 flex flex-row "
            onClick={playClickHandler}
          >
            <Icon
              name="play"
              size={playSize}
              className="text-yellow-400  hover:text-yellow-600 !active:text-red-400 mx-2 my-2"
            />
          </div>
          <div
            onMouseEnter={() => {
              setStopSize(30);
            }}
            onMouseLeave={() => {
              setStopSize(25);
            }}
            className="h-10 flex flex-row"
            onClick={() => {
              dispatch(resetScripts());
              dispatch(resetDND());
            }}
          >
            <Icon
              name="undo"
              size={stopSize}
              className="text-red-400 hover:text-red-600 mx-2 my-2"
            />
          </div>
        </div>
        <div className="flex-none h-full overflow-y-auto p-2 ">
          <div
            className="inline-block relative transform "
            style={{
              left: `${left}px`,
              top: `${top}px`,
              "--tw-rotate": `${rotation}deg`,
            }}
          >
            {speaking !== "" && speaking !== undefined && (
              <h1 className="p-1 ml-2 text-center border-2 border-yellow-500 absolute top-0 left-16 bg-white">
                {speaking}
              </h1>
            )}
            <CatSprite onClick={spriteClickHandler} />
          </div>
        </div>
      </div>
    </>
  );
}
