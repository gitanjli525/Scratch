import { Draggable } from "react-beautiful-dnd";
import React from "react";
import Icon from "../../Utility/Icon";
import { useDispatch } from "react-redux";
import {
  updateDropDownEventValue,
  updateInputValue,
} from "../../../store/dndReducer";

const Command = props => {
  const dispatch = useDispatch();

  const handleOptionChange = event => {
    const payload = { value: event.target.value, commandId: props.command.id };
    dispatch(updateDropDownEventValue(payload));
  };
  const handleInputChange = (value, input) => {
    const payload = { commandId: props.command.id };
    payload[input] = value;
    dispatch(updateInputValue(payload));
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          key={props.key}
          className={`border border-solid border-lightgrey p-2 m-2 bg-yellow-200 ${props.customStyle} text-white`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          //   isDragging={snapshot.isDragging}
        >
          {/* {props.command.content.options !== undefined ? : props.command.content} */}
          <div className="flex flex-row">
            {props.command.text1}
            {props.command.inputValue1 !== undefined && (
              <input
                type={props.command.inputValueType1}
                className="w-16  mx-2 bg-black text-center"
                id={props.command.id}
                value={props.command.inputValue1}
                onChange={event => {
                  handleInputChange(event.target.value, "inputValue1");
                }}
                pattern={
                  props.command.inputValueType1 === "number" ? "[0-9]*" : ""
                }
              />
            )}

            {props.command.isIcon !== "" && (
              <Icon
                name={props.command.isIcon}
                size={10}
                className="text-white m-2"
              />
            )}
            {props.command.options !== undefined && (
              <select
                name={props.command.content}
                id={props.command.content}
                value={props.command.value}
                className="bg-yellow-700 h-6 text-center"
                onChange={handleOptionChange}
              >
                {props.command.options.map(val => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
              // <select name="cars" id="cars">
              //   <option value="volvo">Volvo</option>
              //   <option value="saab">Saab</option>
              //   <option value="mercedes">Mercedes</option>
              //   <option value="audi">Audi</option>
              // </select>
            )}

            {props.command.text2}
            {props.command.inputValue2 !== undefined && (
              <input
                type={props.command.inputValueType2}
                className="w-16 mx-2 bg-black text-center"
                id={props.command.id}
                value={props.command.inputValue2}
                onChange={event => {
                  handleInputChange(event.target.value, "inputValue2");
                }}
                pattern={
                  props.command.inputValueType2 === "number" ? "[0-9]*" : ""
                }
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Command;
