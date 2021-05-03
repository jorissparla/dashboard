import React from "react";

export const HeaderCell = ({ children }) => (
  <th className="  top-0 min-w-28 text-sm font-semibold text-gray-700 bg-gray-100 p-0">
    <div className="p-2 border-b border-gray-300">{children}</div>
  </th>
);

export const HyperLinkCell = ({ value = "", linkPrefix = "http://navigator.infor.com/n/incident.asp?IncidentID=", linkText = "" }) => (
  <td className="p-2 font-sans text-sm font-semibold text-blue-700">
    <a className="inline-block align-baseline font-bold text-sm " href={`${linkPrefix}${value}`} target="_blank" rel="noreferrer">
      {linkText || value}
    </a>
  </td>
);
export const HyperLinkCellRed = ({ value = "", linkPrefix = "http://navigator.infor.com/n/incident.asp?IncidentID=", linkText = "" }) => (
  <td className="p-2 font-sans text-sm font-semibold text-red-700">
    <a
      className="inline-block align-baseline font-bold text-sm bg-red-200 rounded-lg  px-2 text-red-700"
      href={`${linkPrefix}${value}`}
      target="_blank"
      rel="noreferrer"
      title="Target not met"
    >
      {linkText || value}
    </a>
  </td>
);
export const DataCell = ({ children }) => <td className="p-2 font-sans text-sm font-semibold text-blue-700 ">{children}</td>;
export const HTMLCell = ({ children }) => (
  <td className="p-2 font-sans text-sm font-semibold text-blue-700 " dangerouslySetInnerHTML={{ __html: children }}></td>
);
