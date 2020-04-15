import React from "react";
import clsx from "clsx";
const base_class = " rounded px-4  py-3  font-bold   leading-tight shadow-md";
const def_classes = "bg-gray-700 text-white hover:bg-gray-500";
const grey_class = "text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 btn-tw font-semibold font-sansI";
const teal_class = "bg-teal-300 hover:bg-teal-400 text-teal-800";
const black_class = "bg-gray-800 hover:bg-bg-gray-700 text-white";
const pink_class = "bg-pink-200 text-pink-800 hover:bg-pink-300";
const indigo_class =
  "bg-indigo-400 text-indigo-800 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 ";

export default ({ children, ...props }) => {
  let classes = null;
  let color = props?.color || "";
  // console.log(props);
  switch (color) {
    case "teal":
      classes = clsx(base_class, teal_class);
      break;
    case "black":
      classes = clsx(base_class, black_class);
      break;
    case "pink":
      classes = clsx(base_class, pink_class);
      break;
    case "indigo":
      classes = clsx(base_class, indigo_class);
      break;
    default:
      classes = clsx(base_class, def_classes);
      break;
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
