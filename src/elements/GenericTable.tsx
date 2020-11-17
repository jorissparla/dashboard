import React, { useState, useEffect } from "react";
import { useAlert } from "globalState/AlertContext";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Accordion from "@material-ui/core/Accordion";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames";
import { SelectionContext } from "../globalState/SelectionContext";
import CopyToClipBoard from "react-copy-to-clipboard";
import { format } from "./../utils/format";
import TWButton from "elements/TWButton";

interface GenericTableProps {
  data: any[] | null;
  title: string;
  subtitle: string;
  fields: any[];
  linkField?: string;
  linkPrefix?: string;
  linkText?: string;
  description: string;
  additionalFields?: string[];
  whereToInsertAdditionalFieldIndex?: number;
  ageColumn?: string;
  fnFilterData?: (data: any[], filterValues: any, fieldFilters: { key: string; value: string }[] | {}) => any[];
  fnCalculateAverageAgeFromData?: (data: any[], ageColumn?: string) => number;
  filterValues?: any;
  autoExpand?: boolean;
}

export const GenericTable = (props: GenericTableProps) => {
  const {
    data = [],
    title = "",
    subtitle = "",
    fields,
    linkField = "",
    linkText = "",
    linkPrefix = "http://navigator.infor.com/n/incident.asp?IncidentID=",
    description = title,
    additionalFields = [],
    whereToInsertAdditionalFieldIndex = 1,
    fnCalculateAverageAgeFromData,
    ageColumn = "",
    fnFilterData,
    filterValues = null,
    autoExpand = false,
  } = props;
  const [tableData, setTableData] = useState(data || []);
  const [isExpanded, setExpanded] = useState(autoExpand);
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
  const fieldList = [...fields]
    .slice(0, whereToInsertAdditionalFieldIndex)
    .concat(xtraFields)
    .concat([...fields].slice(whereToInsertAdditionalFieldIndex, fields.length));

  const alert: any = useAlert();
  useEffect(() => {
    let mydata = data;
    if (mydata && mydata!?.length > 0) {
      if (mydata && fnFilterData) {
        mydata = fnFilterData(mydata, filterValues, fieldFilters);
      }
      if (mydata.length && ageColumn && fnCalculateAverageAgeFromData) {
        setAvgAge(fnCalculateAverageAgeFromData(mydata, ageColumn));
      }
      setTableData(mydata);
      setExportedData(exportToFile(mydata));
    }
  }, [data, filterValues, fieldFilters]);

  const exportToFile = (data: any): string => {
    const tableHeaders = `<tr>` + fieldList.map((fld) => `<th style="border: 1px solid black">${fld.title}</th>`).join("") + `<tr>`;
    const tableContents = data
      .map((row: any) => {
        const tableRow = fieldList.map((fld) => `<td style="border: 1px solid black">${row[fld.name]}</td>`).join("");
        return `<tr style="border: 1px solid black">${tableRow}</tr>`;
      })
      .join("");
    return `<table style="border: 1px solid black; border-collapse: collapse;">${tableHeaders}${tableContents}</table>`;
  };

  if (!data) {
    return <div></div>;
  }
  if (data.length === 0 && Object.entries(fieldFilters).length === 0) {
    return <div />;
  }

  if (!tableData.length && Object.entries(fieldFilters).length === 0) {
    return <div></div>;
  }

  const orderBy = (collection = [] as any, field: string, dir = "A") => {
    return dir.toLowerCase() === "a"
      ? collection.sort((x: any, y: any) => (x[field] > y[field] ? 1 : -1))
      : collection.sort((x: any, y: any) => (x[field] > y[field] ? -1 : 1));
  };

  const handleColumnSort = (col: string, tableData: any[]) => (name: string, direction: string) => {
    if (tableData) {
      const sorted = orderBy(tableData, col, direction);

      setTableData(sorted);
      setSortState({ name, direction });
    }
  };

  const handleColumnFilter = (col: string, type: string) => (name: string, value: any) => {
    const newFilterItem = { [col]: type === "number" ? parseInt(value) : value };
    setFieldFilters((prev) => ({
      ...prev,
      ...newFilterItem,
    }));
  };

  interface ColumnHeaderProps {
    name: string;
    type: string;
    onSort: any;
    onFilter: any;
  }

  const ColumnHeader = ({ name, type, onSort, onFilter }: ColumnHeaderProps) => {
    const [filter, setFilter] = useState("");
    function handleSortUp() {
      console.log("Clicked up for " + name);
      onSort(name, "A");
    }
    function handleSortDown() {
      console.log("Clicked up for " + name);
      onSort(name, "D");
    }
    function handleKeyDown(e: any) {
      if (e.keyCode === 13) {
        onFilter(name, filter);
      }
    }
    const handleChangeFilterValue = (e: any) => setFilter(e.target.value);

    return (
      <th
        style={{ background: "#5C5C5C", color: "#FFF" }}
        className=" px-5 py-2 border border-gray-200 bg-gray-100 text-left text-sm font-sans font-semibold text-gray-600 uppercase tracking-wider"
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
            <svg className="h-5 text-white fill-current" focusable="false" tabIndex={-1} id="icon-filter-greater-equals" viewBox="0 0 14 14">
              <path d="M10 10.01c0 .547-.443.99-.99.99h-5.02c-.547 0-.99-.443-.99-.99v-.02c0-.547.443-.99.99-.99h5.02c.547 0 .99.443.99.99v.02M6 8c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.293-1.293-1.293-1.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2 2c.391.391.391 1.023 0 1.414l-2 2c-.195.195-.451.293-.707.293"></path>
            </svg>
          ) : (
            <svg className="h-5 text-white fill-current" focusable="false" tabIndex={-1} id="icon-filter-contains" viewBox="0 0 14 14">
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

  const Cell = ({ value }: any) => (
    <td className="px-5  border border-gray-200  text-sm break-words w-full whitespace-normal">
      <p className="text-gray-900 whitespace-no-wrap">{value}</p>
    </td>
  );
  const DateCell = ({ value }: any) => (
    <td className="px-5  border-b border-gray-200  text-sm break-words w-full whitespace-normal">
      <p className="text-gray-900 whitespace-no-wrap">{format(value, "yyyy-MMM-dd")}</p>
    </td>
  );
  const HyperLinkCell = ({ value = "", linkPrefix = "http://navigator.infor.com/n/incident.asp?IncidentID=", linkText = "" }) => (
    <td className="px-5  border border-gray-200  text-sm">
      <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href={`${linkPrefix}${value}`} target="_blank">
        {linkText || value}
      </a>
    </td>
  );

  const YesNoCell = ({ value }: any) => (
    <td className="px-5  border border-gray-200  text-sm">
      {value === 1 && (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-gray-100 text-gray-800">Yes</span>
      )}
    </td>
  );

  const FieldFilterSpans: React.FC<{}> = ({}) => {
    const filterAr = [];
    if (Object.keys(fieldFilters).length === 0) return <div />;
    for (let [key, value] of Object.entries(fieldFilters)) {
      filterAr.push({ [key]: value });
    }
    return (
      <div className="z-50">
        {filterAr.map((item, index) => {
          let handleDelete = null;
          let text = "";
          let key;
          for (let [key, value] of Object.entries(item)) {
            handleDelete = (e: any) => {
              key = key;
              const newFilterItems: any = { ...fieldFilters };
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
                onClick={handleDelete ? handleDelete : () => null}
                className="flex-shrink-0 ml-1.5 inline-flex text-gray-500 focus:outline-none focus:text-gray-700"
              >
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          );
        })}
      </div>
    );
  };
  return (
    // <ExpansionPanel TransitionProps={{ unmountOnExit: true }} defaultExpanded={autoExpand}>
    <div className="bg-white border-b border-gray-100">
      <AccordionSummary
        className="h-16"
        expandIcon={<ExpandMoreIcon />}
        onClick={() => {
          if (!autoExpand) setExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center justify-between w-full p-2 font-sansI">
          <div className=" text-gray-500 font-semibold flex items-center w-1/3">
            <span className=" text-gray-500 text-base  ">{title}</span>
            <span className="ml-2 p-1  ">({tableData.length})</span>

            <FieldFilterSpans />
            {subtitle && (
              <div className="flex items-center text-base font-normal">
                <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"></path>
                </svg>
                <span>{ageColumn && avgAge} days</span>
              </div>
            )}
          </div>
          <>
            <p className="w-2/5 text-sm  text-gray-500    " title="Click to copy to clipboard">
              {description}
            </p>
            <CopyToClipBoard
              text={exportedData}
              onCopy={(d) => {
                alert?.setMessage("table copied to clipboard");
                console.log(d);
              }}
              options={{ format: "text/html" }}
            >
              <svg
                // title="click to copy to Clipboard"
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
      </AccordionSummary>

      {isExpanded && tableData.length !== 0 && (
        <div>
          <div className="inline-block min-w-full  overflow-hidden">
            <div className="w-full mb-2"></div>
            <table className=" w-full leading-normal   transition duration-500 ease-in-out ">
              <thead>
                <tr key={title}>
                  {fieldList.map(({ title, name, type }) => (
                    <ColumnHeader
                      name={title}
                      type={type}
                      onSort={handleColumnSort(name, tableData)}
                      key={title}
                      onFilter={handleColumnFilter(name, type)}
                    ></ColumnHeader>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((item: any, index: number) => (
                  <tr key={index} className={`${index % 2 === 0 && "bg-gray-50"}`}>
                    {fieldList.map(({ name, type }) => {
                      if (name === linkField) {
                        return <HyperLinkCell key={name} value={item[name]} linkPrefix={linkPrefix} linkText={linkText} />;
                      } else {
                        switch (type) {
                          case "hl":
                            return <HyperLinkCell key={name} value={item[name]} linkPrefix={linkPrefix} linkText={linkText} />;
                          case "yn":
                            return <YesNoCell key={name} value={item[name]} />;

                          case "sev":
                            return <SeverityCell key={name} value={item[name]} />;
                          case "dt":
                            return <DateCell key={name} value={item[name]} />;

                          default:
                            return <Cell key={name} value={item[name]} />;
                        }
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export const severityColors: { [index: string]: any } = {
  "Production Outage / Critical Application halted": "text-white bg-red-700",
  "Major impact": "text-red-700 bg-red-100",
  "Medium impact": "text-gray-800 font-bold",
  "High impact": "text-gray-800 font-bold",
  Standard: "text-gray-600",
};
export const SeverityCell = ({ value = "" }) => {
  let sevClass: any = severityColors[value] || "";
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
export const SeverityCell2 = ({ value = "" }) => {
  let sevClass: any = severityColors[value] || "";
  let classes = classNames({
    "w-28 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold leading-5  ": true,
    [sevClass]: true,
  });
  const tv = value === "Production Outage / Critical Application halted" ? "Production down" : value;
  return (
    <span className={classes}>
      {/* {value} */}
      {tv}
    </span>
  );
};
