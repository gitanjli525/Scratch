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

  const { midAreaThreads, columns, commands } = useSelector(
    (state) => state.dnd
  );

  const { left, top, rotation, events, speaking } = useSelector(
    (state) => state.sprite
  );
  const dispatch = useDispatch();

  const equalClickHandler = () => {
    dispatch(resetScripts());
    midAreaThreads.forEach((threadId) => {
      if (threadId !== "garbage") {
        console.log({ threadId });
        const threadCommands = [...columns[threadId].commandIds];

        // if thread is empty
        if (threadCommands.length === 0) return;
        console.log({ first: threadCommands[0] });
        const command = commands[threadCommands[0]];
        const originalId = command.originalId;

        console.log({ originalId });
        if (
          originalId !== undefined &&
          columns.events.commandIds.findIndex(
            (event) => event === originalId
          ) !== -1
        ) {
          console.log("dispatching", originalId);
          dispatch(setIsCompiled());
          dispatch(
            compileScripts({
              threadId,
              eventId: originalId,
              eventValue: command?.value,
            })
          );
        } else {
          console.log({ originalId, events: columns.events.commandIds });
          console.log(originalId in columns.events.commandIds);
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
        console.log("move Down start", startTime);
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveDown());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "moveForward":
        console.log("move forward", startTime);
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveForward());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "moveBackward":
        console.log("move backward", startTime);
        for (let i = 0; i < +command.inputValue1; i++) {
          setTimeout(() => {
            dispatch(moveBack());
          }, startTime + 3 * i);
        }

        return startTime + 3 * +command.inputValue1;

      case "moveUp":
        console.log("move up start", startTime);
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
        console.log({ stack });

        return startTime;

      case "infiniteLoop":
        // let startIndex = index;
        stack.push({
          startIndex: index,
          commandId: command.id,
          repeatNumber: 999,
        });
        console.log({ stack });

        return startTime;

      case "end":
        console.log({ stack });
        let endIndex = index;
        if (stack.length > 0) {
          const { startIndex, commandId, repeatNumber } =
            stack[stack.length - 1];

          console.log("detail:", stack[stack.length - 1]);

          console.log("starting loop", startTime);
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
        console.log("start time", startTime);
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
    console.log({ stack });

    if (
      startIndex < endIndex &&
      startIndex !== endIndex &&
      endIndex !== 0 &&
      iteration !== 0
    ) {
      console.log("starting loop", startTime);
      for (let count = 0; count < iteration; count++) {
        console.log("count:", count);
        for (let i = startIndex; i <= endIndex; i++) {
          console.log("index:", i);
          console.log(allCommandIds[i]);
          console.log("start time", startTime);
          const commandId = allCommandIds[i];
          const command = commands[commandId];
          console.log({ allCommandIds, command });
          startTime = executeCommand(
            allCommandIds,
            command,
            startTime,
            i,
            stack
          );
          console.log("recieved time", startTime);
        }
      }
      return startTime;
    } else {
      allCommandIds.forEach((commandId, index) => {
        const command = commands[commandId];
        const repeatNumber = 0;
        const startIndex = 0;

        console.log("now doing", command.content);
        startTime = executeCommand(
          allCommandIds,
          command,
          startTime,
          index,
          stack
        );
        console.log("time recieved", startTime);

        return startTime;
        // switch (command.content) {
        //   case "moveDown":
        //     console.log("move Down start", startTime);
        //     for (let i = 0; i < +command.inputValue1; i++) {
        //       setTimeout(() => {
        //         dispatch(moveDown());
        //       }, startTime + 3 * i);
        //     }

        //     startTime += 3 * +command.inputValue1;

        //     break;
        //   case "moveForward":
        //     console.log("move forward", startTime);
        //     for (let i = 0; i < +command.inputValue1; i++) {
        //       setTimeout(() => {
        //         dispatch(moveForward());
        //       }, startTime + 3 * i);
        //     }

        //     startTime += 3 * +command.inputValue1;
        //     break;

        //   case "moveBackward":
        //     console.log("move backward", startTime);
        //     for (let i = 0; i < +command.inputValue1; i++) {
        //       setTimeout(() => {
        //         dispatch(moveBack());
        //       }, startTime + 3 * i);
        //     }

        //     startTime += 3 * +command.inputValue1;
        //     break;

        //   case "moveUp":
        //     console.log("move up start", startTime);
        //     for (let i = 0; i < +command.inputValue1; i++) {
        //       setTimeout(() => {
        //         dispatch(moveUp());
        //       }, startTime + 3 * i);
        //     }

        //     startTime += 3 * +command.inputValue1;
        //     break;

        //   case "rotateClockWise":
        //     for (let i = 0; i < +command.inputValue1; i++) {
        //       setTimeout(() => {
        //         dispatch(rotateClockWise());
        //       }, startTime + 3 * i);
        //     }

        //     startTime += 3 * +command.inputValue1 + 100;
        //     break;

        //   case "rotateAntiClockWise":
        //     for (let i = 0; i < +command.inputValue1; i++) {
        //       setTimeout(() => {
        //         dispatch(rotateAntiClockWise());
        //       }, startTime + 3 * i);
        //     }

        //     startTime += 3 * +command.inputValue1 + 100;
        //     break;

        //   case "say":
        //     let time = command.inputValue2 !== undefined ? 1 : inputValue2;
        //     setTimeout(() => {
        //       dispatch(speak({ message: command.inputValue1 }));
        //     }, startTime);

        //     setTimeout(() => {
        //       dispatch(speak({ message: "" }));
        //     }, startTime + time * 1000);

        //     startTime += time * 1000 + 100;
        //     break;

        //   case "wait":
        //     startTime += +command.inputValue1 * 1000;
        //     break;

        //   case "repeat":
        //     let startIndex = index;
        //     stack.push({
        //       startIndex,
        //       commandId,
        //       repeatNumber: command.inputValue1 - 1,
        //     });

        //     break;

        //   case "end":
        //     let endIndex = index;
        //     if (stack.length > 0) {
        //       const { startIndex, commandId, repeatNumber } =
        //         stack[stack.length - 1];
        //       executeAllCommands(
        //         allCommandIds,
        //         startIndex + 1,
        //         endIndex - 1,
        //         repeatNumber
        //       );

        //       stack.pop();
        //     }

        //     break;
        // }
      });
    }
  };

  const executeThreads = (subscribedThreads) => {
    subscribedThreads.forEach((threadId) => {
      console.log({ threadId });
      const { commandIds: allCommandIds } = columns[threadId];
      console.log({ allCommandIds, threadId });

      let startTime = 0;
      executeAllCommands(allCommandIds);

      // allCommandIds.forEach((commandId, index) => {
      //   const command = commands[commandId];
      //   const repeatNumber = 0;
      //   const startIndex = 0;

      //   console.log("now doing", command);
      //   // startTime = executeCommand(command);
      //   switch (command.content) {
      //     case "moveDown":
      //       console.log("move Down start", startTime);
      //       for (let i = 0; i < +command.inputValue1; i++) {
      //         setTimeout(() => {
      //           dispatch(moveDown());
      //         }, startTime + 3 * i);
      //       }

      //       startTime += 3 * +command.inputValue1;

      //       break;
      //     case "moveForward":
      //       console.log("move forward", startTime);
      //       for (let i = 0; i < +command.inputValue1; i++) {
      //         setTimeout(() => {
      //           dispatch(moveForward());
      //         }, startTime + 3 * i);
      //       }

      //       startTime += 3 * +command.inputValue1;
      //       break;

      //     case "moveBackward":
      //       console.log("move backward", startTime);
      //       for (let i = 0; i < +command.inputValue1; i++) {
      //         setTimeout(() => {
      //           dispatch(moveBack());
      //         }, startTime + 3 * i);
      //       }

      //       startTime += 3 * +command.inputValue1;
      //       break;

      //     case "moveUp":
      //       console.log("move up start", startTime);
      //       for (let i = 0; i < +command.inputValue1; i++) {
      //         setTimeout(() => {
      //           dispatch(moveUp());
      //         }, startTime + 3 * i);
      //       }

      //       startTime += 3 * +command.inputValue1;
      //       break;

      //     case "rotateClockWise":
      //       for (let i = 0; i < +command.inputValue1; i++) {
      //         setTimeout(() => {
      //           dispatch(rotateClockWise());
      //         }, startTime + 3 * i);
      //       }

      //       startTime += 3 * +command.inputValue1 + 100;
      //       break;

      //     case "rotateAntiClockWise":
      //       for (let i = 0; i < +command.inputValue1; i++) {
      //         setTimeout(() => {
      //           dispatch(rotateAntiClockWise());
      //         }, startTime + 3 * i);
      //       }

      //       startTime += 3 * +command.inputValue1 + 100;
      //       break;

      //     case "say":
      //       let time = command.inputValue2 !== undefined ? 1 : inputValue2;
      //       setTimeout(() => {
      //         dispatch(speak({ message: command.inputValue1 }));
      //       }, startTime);

      //       setTimeout(() => {
      //         dispatch(speak({ message: "" }));
      //       }, startTime + time * 1000);

      //       startTime += time * 1000 + 100;
      //       break;

      //     case "wait":
      //       startTime += +command.inputValue1 * 1000;
      //       break;
      //   }
      // });
    });
  };

  const playClickHandler = () => {
    const { subscribedThreads } = events["event-4"];
    console.log({ subscribedThreads });
    executeThreads(subscribedThreads);

    // subscribedThreads.forEach((threadId) => {
    //   const { commandIds: allCommandIds } = columns[threadId];
    //   console.log({ allCommandIds, threadId });

    //   let startTime = 0;

    //   allCommandIds.forEach((commandId) => {
    //     const command = commands[commandId];
    //     console.log("now doing", command);
    //     switch (command.content) {
    //       case "moveDown":
    //         for (let i = 0; i < +command.inputValue1; i++) {
    //           setTimeout(() => {
    //             dispatch(moveDown({ value: command.inputValue1 }));
    //           }, startTime + 3 * i);
    //         }

    //         startTime = 3 * +command.inputValue1;

    //         break;
    //       case "moveForward":
    //         for (let i = 0; i < +command.inputValue1; i++) {
    //           setTimeout(() => {
    //             dispatch(moveForward({ value: command.inputValue1 }));
    //           }, startTime + 3 * i);
    //         }

    //         startTime = 3 * +command.inputValue1;
    //         break;
    //     }
    //   });
    // });
  };

  const spriteClickHandler = () => {
    const { subscribedThreads } = events["event-6"];
    console.log({ subscribedThreads });
    executeThreads(subscribedThreads);
  };
  // console.log({ events });

  const onKeyPress = (key, events) => {
    console.log("Key pressed:", key);
    const eventType = findPressedKeyEventType(key);

    if (eventType !== undefined) {
      console.log("Event triggered", eventType);
      // console.log({ events });
      console.log("myevent ", events["event-5"]);
      const { subscribedThreads } = events["event-5"][eventType];
      console.log({ subscribedThreads });
      executeThreads(subscribedThreads);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
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
