import * as React from "react";

import Button from "elements/TWButton";
import clsx from "clsx";
import { useAlert } from "globalState/AlertContext";
import { useLocalStorage } from "../utils/useLocalStorage";

interface PProps {
  param: string;
  initial: string | number;
  classes?: any;
  label: string;
  color?: string;
  keyUp: any;
  // other?: TextFieldProps;
  onChange?: any;
}

export const Parameter: React.FC<PProps> = ({ param, initial, classes = "", label, keyUp, color = "blue", onChange }) => {
  // const { param, initial } = props;
  const baseClass = "rounded w-8 font-normal shadow-md cursor-pointer flex items-center justify-center text-lg ";
  function getColorClasses(color: string) {
    switch (color) {
      case "red":
        return "bg-red-500 text-white hover:bg-red-400";
      case "teal":
        return "bg-teal-500 text-white hover:bg-teal-400";
      case "purple":
        return "bg-purple-900 text-white hover:bg-purple-400";
      case "pink":
        return "bg-pink-500 text-white hover:bg-pink-400";
      case "lightblue":
        return "bg-blue-200 text-blue-600 hover:bg-blue-300";

      default:
        return "bg-blue-500 text-white hover:bg-blue-400";
    }
  }
  const className = clsx(baseClass, getColorClasses(color));

  const [val, setVal] = useLocalStorage(param, initial);
  const inc = () => setVal((old: number) => old + 1);
  const dec = () => setVal((old: number) => (old >= 1 ? old - 1 : old));
  return (
    <div className="m-2">
      <div className="text-xs text-gray-600 font-semibold">{label}</div>
      <div className="p-1 rounded-lg bg-white border-blue-200 border  w-24 flex justify-between">
        <span className={className} onClick={dec}>
          -
        </span>
        <span className="font-semibold mx-1">{val}</span>

        <span className={className} onClick={inc}>
          +
        </span>
      </div>
    </div>
  );
};

// const Parameter = withStyles(styles)(Pazameter);

interface Props {
  history?: any;
}

export const Parameters: React.FC<Props> = (props) => {
  const alert: any = useAlert();
  console.log(`hi`, alert);
  function handleKeyUp() {
    console.log("Item changes");
    if (alert) {
      alert.setMessage("Parameter Updated");
    }
  }

  return (
    <div className="h-screen bg-gray-200 flex items-start justify-center">
      <div className="m-4 px-6 py-4 flex flex-col rounded shadow-lg bg-white w-auto">
        <h2 className="font-bold text-gray-700 tracking-wide">PARAMETERS</h2>
        <h5 className="text-sm text-gray-600 pb-4">These parameters will be stored and used the next time the Worklist is run</h5>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Parameter param="N_AWAITINGCUSTOMER" initial={7} label="Awaiting Customer" keyUp={handleKeyUp} color="lightblue" />
          <Parameter param="N_AWAITINGINFOR" initial={1} label="Awaiting Infor" keyUp={handleKeyUp} />
          <Parameter param="N_RESEARCHING" initial={3} label="Researching" keyUp={handleKeyUp} color="pink" />
          <Parameter param="N_NEW" initial={1} label="New" keyUp={handleKeyUp} />
          <Parameter param="N_MAJORIMPACT" initial={2} label="Major Impact" keyUp={handleKeyUp} color="red" />
          <Parameter param="N_SOLUTIONPROPOSED" initial={30} label="Solution Proposed" keyUp={handleKeyUp} />
          <Parameter param="N_AGING" initial={90} label="Aging" keyUp={handleKeyUp} color="purple" />
          <Parameter param="C_AGING" initial={30} label="Cloud Aging" keyUp={handleKeyUp} color="teal" />
          <Parameter param="C_MT" initial={30} label="MT Cloud Not updated" keyUp={handleKeyUp} color="lightblue" />
        </div>
        <div style={{ margin: 5, display: "flex" }}>
          <Button color="primary" style={{ width: 200 }} onClick={() => props.history.push("/mywork")}>
            To Worklist
          </Button>
        </div>{" "}
      </div>
    </div>
  );
};

export default Parameters;
