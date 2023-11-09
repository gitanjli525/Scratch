import React from "react";

export function generateRandomCharacter() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Characters to choose from
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

export const createNewCommandId = (originalId, commands) => {
  const allCommandIds = Object.keys(commands);
  // console.log("all command ids", allCommandIds);
  let newId = originalId;

  // console.log({ newId });

  while (
    newId === originalId ||
    allCommandIds.find((str) => str === newId) !== undefined
  ) {
    newId = newId + `${generateRandomCharacter()}`;
  }
  return newId;
};

export const MyButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-400  p-2">
      Add New Thread
    </button>
  );
};

export function removeKeys(obj, keysToRemove) {
  // Create a copy of the original object
  const updatedObject = { ...obj };

  // Loop through the keys to remove
  keysToRemove.forEach((key) => {
    // Check if the key exists in the object, then delete it
    if (key in updatedObject) {
      delete updatedObject[key];
    }
  });

  return updatedObject;
}

export const findPressedKeyEventType = (key) => {
  switch (key) {
    case " ":
      return "space";
    case "ArrowUp":
      return "upArrow";
    case "ArrowDown":
      return "downArrow";
    case "ArrowLeft":
      return "leftArrow";
    case "ArrowRight":
      return "rightArrow";

    default:
      return undefined;
  }
};
