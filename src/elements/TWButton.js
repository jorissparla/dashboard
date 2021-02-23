import React from "react";
import clsx from "clsx";
const base_class = "mx-2 rounded px-4  py-2  font-semibold font-sans   leading-tight shadow-md pointer";
const def_classes = "bg-gray-700 text-white hover:bg-gray-400";
const grey_class = "text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 btn-tw font-semibold font-sansI";
const grey_forbidden_class = "cursor-not-allowed text-sm bg-gray-200  btn-tw font-semibold font-sansI";
const teal_class = "bg-teal-300 hover:bg-teal-400 text-teal-800";
const black_class = "bg-gray-800 hover:bg-bg-gray-600 text-white";
const pink_class = "bg-pink-200 text-pink-800 hover:bg-pink-300";
const amber_class = "bg-amber-200 text-amber-800 hover:bg-amber-300";
const purple_class = "bg-purp text-white hover:bg-purple-400 ";
const indigo_class =
  "bg-indigo-400 text-indigo-800 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 ";

const graybut =
  "inline-flex items-center  rounded border border-gray-400 px-4 py-1 bg-transparent uppercase text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 mx-1";
const TWButton = ({ children, className = null, ...props }) => {
  let classes = className;
  let color = props?.color || "";
  if (props.disabled) {
    color = "greyforbidden";
  }
  // console.log(props);
  switch (color) {
    case "teal":
      classes = clsx(classes, base_class, teal_class);
      break;
    case "amber":
      classes = clsx(classes, base_class, amber_class);
      break;
    case "black":
      classes = clsx(classes, base_class, black_class);
      break;
    case "grey":
      classes = clsx(classes, base_class, grey_class);
      break;
    case "transp":
      classes = clsx(graybut);
      break;
    case "greyforbidden":
      classes = clsx(classes, base_class, grey_forbidden_class);
      break;
    case "pink":
      classes = clsx(classes, base_class, pink_class);
      break;
    case "indigo":
      classes = clsx(classes, base_class, indigo_class);
      break;
    case "primary":
      classes = clsx(classes, base_class, purple_class);
      break;
    default:
      classes = clsx(classes, base_class, def_classes);
      break;
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const TWHyperLink = ({ children, className = null, link = "", ...props }) => {
  let classes = className;
  const newBaseClass = base_class + " no-underline ";
  let color = props?.color || "";
  // console.log(props);
  switch (color) {
    case "teal":
      classes = clsx(classes, newBaseClass, teal_class);
      break;
    case "black":
      classes = clsx(classes, newBaseClass, black_class);
      break;
    case "grey":
      classes = clsx(classes, newBaseClass, grey_class);
      break;
    case "greyforbidden":
      classes = clsx(classes, newBaseClass, grey_forbidden_class);
      break;
    case "pink":
      classes = clsx(classes, newBaseClass, pink_class);
      break;
    case "indigo":
      classes = clsx(classes, newBaseClass, indigo_class);
      break;
    case "primary":
      classes = clsx(classes, newBaseClass, purple_class);
      break;
    default:
      classes = clsx(classes, newBaseClass, def_classes);
      break;
  }
  return (
    <a href={link} className={classes} {...props} target="_blank_">
      {children}
    </a>
  );
};

export { TWHyperLink };
export default TWButton;
