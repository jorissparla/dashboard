import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { SelectionContext } from "../globalState/SelectionContext";
import CopyToClipBoard from "react-copy-to-clipboard";
import { format } from "./../utils/format";
import { useAlert } from "globalState/AlertContext";
import TWButton from "elements/TWButton";

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
  const [exportedData, setExportedData] = useState("");
  const [fieldFilters, setFieldFilters] = useState({});
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
    { name: "owner", title: "Owner", type: "" },
  ]
    .concat(xtraFields)
    .concat([
      { name: "status", title: "status", type: "" },
      { name: "dayssincelastupdate", title: "Updated", type: "number" },
      { name: "daysSinceCreated", title: "Created", type: "number" },
      { name: "title", title: "Summary", type: "" },
    ]);
  const { owner, products, region } = filterValues;
  let correctedRegion = region === "All" ? "" : region;
  const { actionNeeded } = useContext(SelectionContext);
  const alert = useAlert();
  useEffect(() => {
    if (backlog?.length > 0) {
      let mydata = backlog && owner ? backlog.filter((o) => o.owner === owner) : backlog;
      mydata = products.length ? mydata.filter((o) => products.includes(o.productline)) : mydata;
      mydata = correctedRegion ? mydata.filter((o) => o.owner_region === correctedRegion) : mydata;
      for (let [key, value] of Object.entries(fieldFilters)) {
        if (value) {
          mydata = mydata.filter((item) => {
            if (typeof item[key] === "number") return item[key] >= value;
            return item[key]?.includes(value);
          });
        }
      }

      setAvgAge(getAvgAndData(mydata));
      setTableData(mydata);
      setExportedData(exportToFile(mydata));
    }
  }, [backlog, filterValues, fieldFilters]);

  const exportToFile = (data) => {
    const tableHeaders = `<tr>` + fields.map((fld) => `<th style="border: 1px solid black">${fld.title}</th>`).join("") + `<tr>`;
    const tableContents = data
      .map((row) => {
        const tableRow = fields.map((fld) => `<td style="border: 1px solid black">${row[fld.name]}</td>`).join("");
        return `<tr style="border: 1px solid black">${tableRow}</tr>`;
      })
      .join("");
    return `<table style="border: 1px solid black; border-collapse: collapse;">${tableHeaders}${tableContents}</table>`;
  };

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

  const handleColumnFilter = (col, type) => (name, value) => {
    const newFilterItem = { [col]: type === "number" ? parseInt(value) : value };
    setFieldFilters((prev) => ({
      ...prev,
      ...newFilterItem,
    }));
  };

  const ColumnHeader = ({ name, type, onSort, onFilter = (name, v) => console.log(name + " filter on " + v) }) => {
    const [filter, setFilter] = useState("");
    function handleSortUp() {
      console.log("Clicked up for " + name);
      onSort(name, "A");
    }
    function handleSortDown() {
      console.log("Clicked up for " + name);
      onSort(name, "D");
    }
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        onFilter(name, filter);
      }
    };
    const handleChangeFilterValue = (e) => setFilter(e.target.value);
    return (
      <th
        style={{ background: "#5C5C5C", color: "#FFF" }}
        className="capitalize px-5 py-2 border border-gray-200 bg-gray-100 text-left text-sm font-sans font-semibold text-gray-600 uppercase tracking-wider"
      >
        <div className="flex items-center text-center  items-baseline">
          {name}
          <span className="hover:text-green hover: cursor-pointer" onClick={handleSortUp}>
            ▲
          </span>
          <span className="hover:text-green hover: cursor-pointer" onClick={handleSortDown}>
            ▼
          </span>
        </div>
        <div className="flex mb-1 items-center">
          {type === "number" ? (
            <svg className="h-5 text-white fill-current" focusable="false" tabIndex="-1" id="icon-filter-greater-equals" viewBox="0 0 14 14">
              <path d="M10 10.01c0 .547-.443.99-.99.99h-5.02c-.547 0-.99-.443-.99-.99v-.02c0-.547.443-.99.99-.99h5.02c.547 0 .99.443.99.99v.02M6 8c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.293-1.293-1.293-1.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2 2c.391.391.391 1.023 0 1.414l-2 2c-.195.195-.451.293-.707.293"></path>
            </svg>
          ) : (
            <svg className="h-5 text-white fill-current" focusable="false" tabIndex="-1" id="icon-filter-contains" viewBox="0 0 14 14">
              <path d="M5 5v4.5c0 .276.224.5.5.5s.5-.224.5-.5v-4.5h-1M8 5v4.5c0 .276.224.5.5.5s.5-.224.5-.5v-4.5h-1"></path>
              <path d="M5 7h4v1h-4v-1zM9 5h-4c0-.552.448-1 1-1h2c.552 0 1 .448 1 1M4 3h-1c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h1v-1h-1v-6h1v-1M10 3h1c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1h-1v-1h1v-6h-1v-1"></path>
            </svg>
          )}
          <input
            className="form-input rounded ml-1 mt-1 h-6 w-5/6 text-gray-600"
            type="text"
            value={filter}
            onChange={handleChangeFilterValue}
            onKeyDown={handleKeyDown}
          />
        </div>
      </th>
    );
  };

  const Cell = ({ value }) => (
    <td className="px-5  border border-gray-200  text-sm break-words w-full whitespace-normal">
      <p className="text-gray-900 whitespace-no-wrap">{value}</p>
    </td>
  );
  const DateCell = ({ value }) => (
    <td className="px-5  border-b border-gray-200  text-sm break-words w-full whitespace-normal">
      <p className="text-gray-900 whitespace-no-wrap">{format(value, "yyyy-MMM-dd")}</p>
    </td>
  );
  const HyperLinkCell = ({ value }) => (
    <td className="px-5  border border-gray-200  text-sm">
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
    <td className="px-5  border border-gray-200  text-sm">
      {value === 1 && (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-gray-100 text-gray-800">Yes</span>
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
      "w-28 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold leading-5  ": true,
      [sevClass]: true,
    });
    const tv = value === "Production Outage / Critical Application halted" ? "Production down" : value;
    return (
      <td className="px-5 py-2 border-b border-gray-200  text-sm text">
        <span className={classes}>
          {/* {value} */}
          {tv}
        </span>
      </td>
    );
  };

  const FieldFilterSpans = () => {
    const filterAr = [];
    if (Object.keys(fieldFilters).length === 0) return null;
    for (let [key, value] of Object.entries(fieldFilters)) {
      filterAr.push({ [key]: value });
    }
    return filterAr.map((item, index) => {
      let handleDelete = null;
      let text = "";
      let key;
      for (let [key, value] of Object.entries(item)) {
        handleDelete = (e) => {
          key = key;
          const newFilterItems = { ...fieldFilters };
          delete newFilterItems[key];
          setFieldFilters((prev) => newFilterItems);
        };
        if (typeof value === "number") {
          text = key + " >= " + value;
        } else text = key + " - " + value;
        console.log("typeof ", typeof value);
      }

      return (
        <span
          key={index + text}
          className="inline-flex items-center mx-2 px-3 py-1.5 rounded-lg text-xs font-medium leading-4 bg-gray-200 text-gray-800"
        >
          {text}
          <button
            type="button"
            onClick={handleDelete}
            className="flex-shrink-0 ml-1.5 inline-flex text-gray-500 focus:outline-none focus:text-gray-700"
          >
            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
      );
    });
  };

  return (
    <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
      <ExpansionPanelSummary className="h-16" expandIcon={<ExpandMoreIcon />}>
        <div className="flex items-center justify-between w-full p-2 font-sansI">
          <div variant="h6" className=" text-gray-500 font-semibold flex items-center">
            <span className=" text-gray-500 text-lg">{title}</span>
            <span className="ml-2 p-1 text-md ">({tableData.length})</span>

            <FieldFilterSpans />
            {sub && (
              <div className="flex items-center text-base font-normal">
                <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"></path>
                </svg>
                <span>{avgAge} days</span>
              </div>
            )}
          </div>
          <>
            <p className="w-2/5 text-base  text-gray-500    " title="Click to copy to clipboard">
              {description}
            </p>
            <CopyToClipBoard
              text={exportedData}
              onCopy={(d) => {
                alert.setMessage("table copied to clipboard");
                console.log(d);
              }}
              options={{ format: "text/html" }}
            >
              <svg
                title="click to copy to Clipboard"
                className=" w-4 h-4 text-gray-500 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </CopyToClipBoard>
          </>
        </div>
      </ExpansionPanelSummary>
      <div>
        <div className="inline-block min-w-full  overflow-hidden">
          <div className="w-full mb-2"></div>
          <table className=" w-full leading-normal   transition duration-500 ease-in-out ">
            <thead>
              <tr>
                {fields.map(({ title, name, type }) => (
                  <ColumnHeader
                    name={title}
                    type={type}
                    onSort={handleColumnSort(name)}
                    key={title}
                    onFilter={handleColumnFilter(name, type)}
                  ></ColumnHeader>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item.incident} className={`${index % 2 === 0 && "bg-gray-50"}`}>
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
      </div>
    </ExpansionPanel>
  );
};

export default BacklogTableNewStyle;
