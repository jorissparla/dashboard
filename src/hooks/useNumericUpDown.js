import React, { useState } from "react";
import clsx from "clsx";
import { useLocalStorage } from "utils/useLocalStorage";

export const useCounter = (color = "blue", field = "Parameter", initial = 0, description = "Parameter") => {
  const baseClass = "rounded w-8 font-normal shadow-md cursor-pointer flex items-center justify-center ";
  function getColorClasses(color) {
    switch (color) {
      case "red":
        return "bg-red-500 text-white hover:bg-red-400";

      default:
        return "bg-blue-500 text-white hover:bg-blue-400";
    }
  }
  const className = clsx(baseClass, getColorClasses(color));

  const [val, setVal] = useLocalStorage(field, initial);
  const inc = () => setVal((old) => old + 1);
  const dec = () => setVal((old) => (old >= 1 ? old - 1 : old));
  return [
    <div>
      <div className="text-xs text-gray-600">{description}</div>
      <div className="p-1 rounded-lg bg-white border-blue-200 border  w-24 flex justify-between">
        <span disabled={val === 0} className={className} type="button" onClick={dec}>
          -
        </span>
        <span className="font-semibold mx-1">{val}</span>

        <span className={className} type="button" onClick={inc}>
          +
        </span>
      </div>
    </div>,
  ];
};
