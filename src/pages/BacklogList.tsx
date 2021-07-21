import { Backlog, IConfig } from "../stats/BacklogType";
import { DataCell, HeaderCell, HyperLinkCell, HyperLinkCellRed } from "./Cells";
import { REGION_LIST, REGION_LIST_2 } from "./Stats";
import React, { useEffect, useState } from "react";
import TWButton, { TWHyperLink } from "../elements/TWButton";
import { gql, request } from "graphql-request";

import CopyToClipBoard from "react-copy-to-clipboard";
import SearchBar from "common/SearchBar";
import Spinner from "../utils/spinner";
import TWCheckbox from "elements/TWCheckbox";
import { UserContext } from "../globalState/UserProvider";
import { useAlert } from "globalState/AlertContext";
import { useParams } from "react-router";
import { usePersistentState } from "../hooks";
import { useQuery } from "@apollo/client";
import useSWR from "swr";

// import { useParams } from "./useParam";

const MY_BACKLOG_QUERY = gql`
  fragment backlogfragment on DWH {
    incident
    incidentcreated
    owner
    owner_region
    customername
    customerid
    summary
    navid
    title
    status
    dayssincelastupdate
    ownergroup
    product
    daysSinceCreated
    contactname
    escalated
    Deployment
    severityname
    productline
    Tenant
    release
    region
    releasename
    service_restored_date
  }
  query MY_BACKLOG_QUERY {
    backlog(productFilters: ["LN", "PLM", "Protean", "InforOS", "Xpert", "Swan", "AutoConnect", "AutoRelease", "SupplyWeb", "TRANS4M"]) {
      ...backlogfragment
    }
    multitenantcustomers: tenantcustomerdetails {
      id
      customerid
      customer {
        name
      }
    }
    accounts {
      id
      fullname
      navid
      managerid
    }
  }
`;

const ToolsBacklogPage = (props: any) => {
  const { product }: { product: string } = useParams();
  console.log(`product`, product);
  const allRegions = REGION_LIST;
  const [includeDevelopment, setIncludeDevelopment] = usePersistentState("includeDevelopment1", false);

  const { user } = React.useContext(UserContext);

  let enableIt = false;
  let isValidSuperUser = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
  if (user && user.permissions) {
    enableIt = user.permissions.some(({ permission }) => permission === "STATS");
  }
  isValidSuperUser = isValidSuperUser || enableIt;

  let ownergroups = "";
  switch (product) {
    case "tools":
      ownergroups = "LN Tools Support";
      break;
    case "logistics":
      ownergroups = "LN Logistics Support";
      break;
    case "finance":
      ownergroups = "LN Finance Support";
      break;
    case "all":
      ownergroups = "";
      break;

    default:
      ownergroups = "LN Tools Support";
      break;
  }
  return (
    <div className="bg-gray-100 h-screen">
      <WorklistSimple includeDevelopment={includeDevelopment} ownergroup={ownergroups} active={product} />
    </div>
  );
};

// interface TWRegionListProps {
//   onChangeRegion: ;
// }
function TWRegionList({ onChangeRegion }: any) {
  const [regions, setRegions] = usePersistentState("regionlist_backlog", ["EMEA", "APJ"]);
  function handleRegionChange(region: string) {
    return function (v: boolean) {
      let newRegions: string[] = regions;
      if (v) {
        newRegions = [region, ...newRegions.filter((reg: string) => reg !== region)];
        // console.log(region, v, newRegions);
        onChangeRegion(newRegions);
      } else {
        newRegions = newRegions.filter((reg: string) => reg !== region);
        // console.log(region, v, newRegions);
        onChangeRegion(newRegions);
      }
      setRegions(newRegions);
    };
  }
  function getValue(region: string): boolean {
    if (regions.find((reg: string) => reg == region)) {
      return true;
    } else return false;
  }
  return (
    <div className="flex space-x-2 items-center">
      {REGION_LIST.map((region) => (
        <TWCheckbox key={region} value={getValue(region)} onChange={handleRegionChange(region)} label={region} />
      ))}
    </div>
  );
}

const WorklistSimple = ({ owner = "", ownerId = "", includeDevelopment = false, ownergroup = "LN Tools Support", active = "All" }) => {
  const params = useParams();
  const [searchText, setSearchText] = useState("");
  const [filterOver30, setFilterOver30] = useState(false);
  const [filterOver60, setFilterOver60] = useState(false);
  const [includeDev, setIncludeDev] = useState(includeDevelopment);
  // const [includePending, setIncludePending] = useState(false);
  const [includeAll, setIncludeAll] = useState(false);
  const [includePending, setIncludePending] = usePersistentState("includePending1", false);
  const [regions, setRegions] = usePersistentState("toolsregions", ["EMEA", "APJ"]);
  const [nrIncidentsShown, setNrIncidentsShown] = useState(0);
  const [config, setConfig] = useState<IConfig | null>(null);
  const { data, error } = useSWR(MY_BACKLOG_QUERY);
  // const { data, loading } = useQuery(MY_BACKLOG_QUERY);
  useEffect(() => {
    let cfg = {
      over30: filterOver30,
      over60: filterOver60,
    };
    setConfig(cfg);
  }, [filterOver30]);
  if (!data) return <Spinner />;
  let blBase = new Backlog(data.backlog, data.accounts, includeDev, includePending, config, includeAll);
  console.log(`regions`, regions);
  let statusAr = ["Solution Proposed", "Solution Pending Maintenance", "Awaiting Development"];

  if (includePending) {
    statusAr = statusAr.filter((s) => s === "Solution Pending Maintenance");
  }

  const [avgAge, all, over30, over60, over90] = blBase
    .init()
    // .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .notStatus(statusAr)
    .ownergroup(ownergroup)
    .regions(regions)
    .customername(searchText)
    .sort("daysSinceCreated", "D")
    .daysSinceCreated(filterOver30 ? 30 : filterOver60 ? 60 : 0)
    .getAvgOver30AndOver60AndData();

  if (filterOver30) {
  }

  function toggleIncludeAll() {
    setIncludeAll(!includeAll);
  }
  function togglePending() {
    setIncludePending(!includePending);
  }
  function toggleIncludeDevelopment() {
    setIncludeDev(!includeDev);
  }
  function toggleOver30() {
    setFilterOver30(!filterOver30);
  }
  function toggleOver60() {
    setFilterOver60(!filterOver60);
    // if (!filterOver60) {
    //   console.log("toggle");
    //   setFilterOver30(false);
    // }
  }
  const pctover30 = (100 * (over30 / all.length)).toFixed(0);
  const pctover60 = (100 * (over60 / all.length)).toFixed(0);
  const pctover90 = (100 * (over90 / all.length)).toFixed(0);
  const targetOver60 = Math.round(0.05 * all.length);
  const nrIncidents = all.length;
  function changeRegion(values: string[]): void {
    setRegions(values);
  }
  return (
    <div className="">
      {/* <Example /> */}
      <div className="flex flex-col">
        <div className="mx-2 p-2 rounded bg-white">
          <div className="flex items-center">
            <NavLinks linksAr={linksAr} active={active} />
            <SearchBar onChange={setSearchText} hintText="Enter part of customer name" />
          </div>
          <span className="text-xl font-bold">{`${ownergroup}`} incidents - Filter</span>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <TWCheckbox label="Over 30" onChange={toggleOver30} value={filterOver30} />
              <TWCheckbox label="Over 60" onChange={toggleOver60} value={filterOver60} />
              <span className=" font-sans font-semibold pb-3 px-3">{`(${all.length})`}</span>
              <TWRegionList onChangeRegion={changeRegion} />
            </div>
            <div className="flex items-center space-x-2 border-l border-gray-300">
              <div className="font-semibold pl-24 mx-2 ">Status</div>
              <TWCheckbox label="Sol.Pending Maintenance" onChange={togglePending} value={includePending} />
              <TWCheckbox label="Awaiting Development" onChange={toggleIncludeDevelopment} value={includeDev} />
              <TWCheckbox label="All Statuses" onChange={toggleIncludeAll} value={includeAll} />
            </div>
            <div></div>
          </div>
        </div>
        <div className="px-2 pt-2 grid grid-cols-1 gap-x-2 gap-y-2">
          <Widget
            data={all}
            fieldList={fieldList}
            title={
              <div>
                <div>{`average age: ${avgAge} days  (${nrIncidents})`}</div>
                <div className="flex space-x-2">
                  <StatsBlock text="over 30 days" over={over30} pct={pctover30} />
                  <StatsBlock text="over 60 days" over={over60} pct={pctover60} />
                  <StatsBlock text="Target over 60 days" over={targetOver60} pct={`5`} bgColor="red" />
                  <StatsBlock text="over 90 days" over={over90} pct={pctover90} />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

interface StatsBlockProps {
  text?: string;
  over?: number;
  pct?: string;
  bgColor?: string;
}
function StatsBlock(props: StatsBlockProps) {
  return (
    <div
      className={`px-4 py-2  shadow-lg my-2
  flex flex-col align-center justify-between mx-2 min-w-60 spacing-x-2 w-1 rounded font-semibold font-sans items-center bg-gradient-to-l ${
    props.bgColor ? "from-orange-500 to-orange-200 text-red-700" : "from-light-blue-200 to-light-blue-400 text-light-blue-700"
  } `}
    >
      <span className="text-2xl font-bold">{`${props.text}`}</span> {`${props.over} incidents`}
      <span className="text-2xl font-bold">{`${props.pct}% `}</span>
    </div>
  );
}

interface WidgetProperties {
  data: any;
  title: any;
  mark?: boolean;
  fieldList: TField[];
}
interface TLink {
  name: string;
  link: string;
}
interface TLinksAr {
  linksAr: TLink[];
}
const linksAr: TLink[] = [
  { name: "tools", link: "/products/tools" },
  { name: "logistics", link: "/products/logistics" },
  { name: "finance", link: "/products/finance" },
  { name: "all", link: "/products/all" },
];
interface NavLinksProps {
  linksAr: TLink[];
  active: string;
}
function NavLinks({ linksAr, active }: NavLinksProps) {
  return (
    <nav className="my-2 py-1">
      {linksAr.map((item) => (
        <TWHyperLink color={`${active === item.name ? "amber" : "teal"}`} link={item.link}>
          <span className="capitalize">{item.name}</span>
        </TWHyperLink>
      ))}
    </nav>
  );
}

export const Widget = ({ data = [], fieldList = [], title = "", mark = false }: WidgetProperties) => {
  const [currData, setCurrData] = useState([]);
  const len = data.length;
  const MAX_LEN = 50;
  const [currPage, setCurrPage] = useState(len > 0 ? 1 : 0);
  const nrPages = len > 0 ? Math.floor((len - 1) / MAX_LEN + 1) : 0;
  const handleNextPage = () => {
    if (currPage < nrPages) setCurrPage((old) => old + 1);
  };
  const handlePrevPage = () => {
    if (currPage > 1) setCurrPage((old) => old - 1);
  };
  useEffect(() => {
    console.log(`data`, data);
    setCurrData(data);
  }, [currPage, data]);
  const prevDisabled = currPage <= 0;
  const nextDisabled = currPage >= nrPages || nrPages === 0;
  const alert: any = useAlert();
  const exportedData = exportToFile(data);
  return (
    <div className="p-2 rounded-lg shadow-lg bg-white">
      <h1 className={`flex justify-items-center py-1 font-semibold items-center ${mark ? "text-red-700" : "text-gray-700"}`}>
        {title}
        <div className="flex-1 flex justify-between sm:justify-end">
          <CopyToClipBoard
            text={exportedData}
            onCopy={(d) => {
              alert?.setMessage("table copied to clipboard");
              // console.log(d);
            }}
            options={{ format: "text/html" }}
          >
            <TWButton>Export</TWButton>
          </CopyToClipBoard>
          <span>
            page {currPage} of {nrPages}
          </span>

          <TWButton onClick={handlePrevPage} color="pink" disabled={prevDisabled}>
            Prev
          </TWButton>

          <TWButton onClick={handleNextPage} color="pink" disabled={nextDisabled}>
            Next
          </TWButton>
        </div>
      </h1>
      <span></span>
      {currData.length === 0 ? (
        <h2>No {title} data </h2>
      ) : (
        <GenericDataTable data={currData.slice((currPage - 1) * MAX_LEN, currPage * MAX_LEN)} mark={mark} fieldList={fieldList} />
      )}
    </div>
  );
};
export interface TField {
  title: string;
  name: string;
  isKey?: boolean;
  linkPrefix?: string;
}
const fieldList: TField[] = [
  { title: "Incident", name: "incident", isKey: true, linkPrefix: "http://navigator.infor.com/n/incident.asp?IncidentID=" },
  { title: "Owner", name: "owner" },
  { title: "Customer", name: "customername" },
  { title: "Severity", name: "severityname" },
  { title: "Status", name: "status" },
  { title: "Created", name: "daysSinceCreated" },
  { title: "Updated", name: "dayssincelastupdate" },
  { title: "Summary", name: "title" },
  { title: "Escalated", name: "escalated" },
  { title: "Ownergroup", name: "ownergroup" },
  { title: "Product", name: "product" },
  { title: "Contact", name: "contactname" },
];
function fieldOrHyperLink(row: any, fld: TField) {
  if (fld.linkPrefix) {
    return `<a href=${fld.linkPrefix + row[fld.name]} target="_BLANK_">${row[fld.name]}</a>`;
  } else {
    return `${row[fld.name]}`;
  }
}
const exportToFile = (data: any): string => {
  const tableHeaders = `<tr>` + fieldList.map((fld) => `<th style="border: 1px solid #eded">${fld.title}</th>`).join("") + `</tr>`;
  const tableContents = data
    .map((row: any) => {
      const tableRow = fieldList.map((fld) => `<td style="border: 1px solid #eded">${fieldOrHyperLink(row, fld)}</td>`).join("");
      return `<tr style="border: 1px solid #eded">${tableRow}</tr>`;
    })
    .join("");
  return `<table style="border: 1px ; border-collapse: collapse;">${tableHeaders}${tableContents}</table>`;
};

export const GenericDataTable = ({ data, fieldList }: any) => {
  function isStatusToMark(status: string) {
    return ["New", "Awaiting Infor", "Researching"].includes(status);
  }
  console.log(`data`, data);
  const keyField = fieldList.find((fld: TField) => fld.isKey === true);
  if (!keyField) {
    return <div>No keyfield found</div>;
  }
  return (
    <div className="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
      <table className="w-full text-left table-collapse">
        <thead>
          <tr>
            {fieldList.map(({ title, name }: any) => (
              <HeaderCell key={name}>{title}</HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody className="align-baseline">
          {data.length === 0 ? (
            <tr>
              <DataCell>No data..</DataCell>
            </tr>
          ) : (
            data.map((item: any) => (
              <tr key={item[keyField.name]}>
                <HyperLinkCell value={item.incident} linkText={item[keyField.name]} />
                {fieldList.map((field: any, index: number) => (index !== 0 ? <DataCell key={index}>{item[field.name]}</DataCell> : null))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ToolsBacklogPage;