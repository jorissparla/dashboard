/* This example requires Tailwind CSS v2.0+ */

import { Switch } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ITWSwitch {
  value: boolean;
  onChange: any;
}

export default function TWSwitch({ value = false, onChange = () => console.log("change") }: ITWSwitch) {
  const [enabled, setEnabled] = useState(value);

  function handleChange() {
    setEnabled(!enabled);
    onChange(enabled);
  }
  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={classNames(
        enabled ? "bg-teal-400" : "bg-gray-200",
        "relative inline-flex flex-shrink-0 h-6 w-11  border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      />
    </Switch>
  );
}
