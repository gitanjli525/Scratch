import React from "react";
import Icon from "../Utility/Icon";
import { useSelector } from "react-redux";

const Info = () => {
  const { isCompiled } = useSelector((state) => state.dnd);
  const styling = isCompiled
    ? "bg-green-500 text-white"
    : "bg-red-500 text-white";
  return (
    <>
      <h2 className={`text-center ${styling}`}>
        {isCompiled ? "COMPILED" : "COMPILATION REQUIRED !"}
      </h2>
      <h1 className="bg-red-100 p-2 flex flex-row">
        Click on
        <Icon
          name="equals"
          size={15}
          className="text-green-400  hover:text-green-600 !active:text-green-900 mx-2 my-2"
        />
        to compile/ Re-compile & then trigger _<strong> YOUR EVENT </strong>_ to
        execute!
      </h1>
    </>
  );
};

export default Info;
