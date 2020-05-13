import { Typography, withStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { SelectionContext } from "../globalState/SelectionContext";
import _ from "lodash";
import { format } from "./../utils/format";

const BacklogTableNewStyle = ({
  backlog,
  additionalFields = [],
  classes,
  title,
  sub = "",
  description = title,
  filterValues = { owner: "", products: ["LN"], region: "EMEA" },
  includeservicerestored = false,
}) => {
  const [tableData, setTableData] = useState(backlog || []);
  const [avgAge, setAvgAge] = useState(0);
  const [sortState, setSortState] = useState({ name: "", direction: "A" });
  const xtraFields = additionalFields.map((fld) => {
    let type = "";
    if (fld.includes("time")) {
      type = "dt";
    }
    return { name: fld, title: fld, type };
  });
  const fields = [
    { name: "incident", title: "Incident", type: "hl" },
    { name: "severityname", title: "Severity", type: "sev" },
    { name: "escalated", title: "Esc", type: "yn" },
    { name: "customername", title: "Customer", type: "" },
    { name: "owner", title: "OWNER", type: "" },
  ]
    .concat(xtraFields)
    .concat([
      { name: "status", title: "status", type: "" },
      { name: "dayssincelastupdate", title: "Last Updated", type: "" },
      { name: "daysSinceCreated", title: "Age", type: "" },
      { name: "title", title: "Summary", type: "" },
    ]);
  const { owner, products, region } = filterValues;
  const { actionNeeded } = useContext(SelectionContext);
  useEffect(() => {
    if (backlog?.length > 0) {
      let mydata = backlog && owner ? backlog.filter((o) => o.owner === owner) : backlog;
      mydata = products.length ? mydata.filter((o) => products.includes(o.productline)) : mydata;
      mydata = region ? mydata.filter((o) => o.owner_region === region) : mydata;
      setAvgAge(getAvgAndData(mydata));
      setTableData(mydata);
    }
  }, [backlog, filterValues]);

  const getAvgAndData = (data) => {
    const sum = data.reduce((total, item) => total + item.daysSinceCreated, 0);
    const avg = (sum / (data.length || 0 + 1)).toFixed(0);
    return avg;
  };
  if (!backlog) {
    return <div></div>;
  }
  if (actionNeeded && backlog.length === 0) {
    return <div />;
  }

  if (!tableData.length) {
    return <div></div>;
  }

  const orderBy = (collection = [], field, dir = "A") => {
    return dir.toLowerCase() === "a"
      ? collection.sort((x, y) => (x[field] > y[field] ? 1 : -1))
      : collection.sort((x, y) => (x[field] > y[field] ? -1 : 1));
  };

  const handleColumnSort = (col) => (name, direction) => {
    console.log(name, direction);
    const sorted = orderBy(tableData, col, direction);

    setTableData(sorted);
    setSortState({ name, direction });
  };

  const ColumnHeader = ({ name, onSort }) => {
    function handleSortUp() {
      console.log("Clicked up for " + name);
      onSort(name, "A");
    }
    function handleSortDown() {
      console.log("Clicked up for " + name);
      onSort(name, "D");
    }
    return (
      <th className="uppercase px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
        <div className="flex items-center text-center  items-baseline">
          {name}
          <span className="hover:text-green hover: cursor-pointer" onClick={handleSortUp}>
            ▲
          </span>
          <span className="hover:text-green hover: cursor-pointer" onClick={handleSortDown}>
            ▼
          </span>
        </div>
      </th>
    );
  };

  const Cell = ({ value }) => (
    <td className="px-5 py-1 border-b border-gray-200  text-sm break-words w-full whitespace-normal">
      <p className="text-gray-900 whitespace-no-wrap">{value}</p>
    </td>
  );
  const DateCell = ({ value }) => (
    <td className="px-5 py-1 border-b border-gray-200  text-sm break-words w-full whitespace-normal">
      <p className="text-gray-900 whitespace-no-wrap">{format(value, "yyyy-MMM-dd")}</p>
    </td>
  );
  const HyperLinkCell = ({ value }) => (
    <td className="px-5 py-1 border-b border-gray-200  text-sm">
      <a
        className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
        href={`http://navigator.infor.com/n/incident.asp?IncidentID=${value}`}
        target="_blank"
      >
        {value}
      </a>
    </td>
  );

  const YesNoCell = ({ value }) => (
    <td className="px-5 py-1 border-b border-gray-200  text-sm">
      {value === 1 && (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-pink-100 text-pink-800">Yes</span>
      )}
    </td>
  );

  const severityColors = {
    "Production Outage / Critical Application halted": "text-white bg-red-700",
    "Major impact": "text-red-800 bg-red-300",
    "High impact": "text-gray-800 font-bold",

    Standard: "text-gray-600",
  };
  const SeverityCell = ({ value }) => {
    let sevClass = severityColors[value] || "";
    let classes = classNames({
      "w-28 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold leading-5 ": true,
      [sevClass]: true,
    });
    return (
      <td className="px-5 py-2 border-b border-gray-200  text-sm text">
        <span className={classes}>{value}</span>
      </td>
    );
  };

  return (
    <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
      <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
        <div className="flex items-center justify-between w-full p-2">
          <div variant="h6" className="text-xl text-gray-500 font-semibold">
            <span className=" text-teal-600">{title}</span>
            <span className="ml-2 p-1 text-md ">({tableData.length})</span>
            {sub && (
              <div className="flex items-center text-base font-normal">
                <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"></path>
                </svg>
                <span>{avgAge} days</span>
              </div>
            )}
          </div>
          <p className="w-2/5 text-base  text-gray-500 ">{description}</p>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="inline-block min-w-full  overflow-hidden">
          <table className=" w-full leading-normal   transition duration-500 ease-in-out ">
            <thead>
              <tr>
                {fields.map(({ title, name }) => (
                  <ColumnHeader name={title} onSort={handleColumnSort(name)} key={title}></ColumnHeader>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item.incident} className={`${index % 2 === 0 && "bg-blue-50"}`}>
                  {fields.map(({ name, type }) => {
                    switch (type) {
                      case "hl":
                        return <HyperLinkCell key={name} value={item[name]} />;
                      case "yn":
                        return <YesNoCell key={name} value={item[name]} />;

                      case "sev":
                        return <SeverityCell key={name} value={item[name]} />;
                      case "dt":
                        return <DateCell key={name} value={item[name]} />;

                      default:
                        return <Cell key={name} value={item[name]} />;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default BacklogTableNewStyle;
