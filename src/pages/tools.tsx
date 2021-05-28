import { DataCell, HeaderCell, HyperLinkCell, HyperLinkCellRed } from "./Cells";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { Backlog } from "../stats/BacklogType";
import CopyToClipBoard from "react-copy-to-clipboard";
import Spinner from "../utils/spinner";
import TWButton from "../elements/TWButton";
import { UserContext } from "./../globalState/UserProvider";
import { useAlert } from "globalState/AlertContext";
import { useParams } from "./useParam";
import { usePersistentState } from "../hooks";

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

const ToolsBacklogPage = () => {
  const [includeDevelopment, setIncludeDevelopment] = usePersistentState("includeDevelopment1", false);
  const [includePending, setIncludePending] = usePersistentState("includePending1", false);
  const { user } = React.useContext(UserContext);

  let enableIt = false;
  let isValidSuperUser = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
  if (user && user.permissions) {
    enableIt = user.permissions.some(({ permission }) => permission === "STATS");
  }
  isValidSuperUser = isValidSuperUser || enableIt;

  return (
    <div className="bg-gray-100 h-screen">
      <WorklistSimple includeDevelopment={includeDevelopment} includePending={includePending} />
    </div>
  );
};

const WorklistSimple = ({ owner = "", ownerId = "", includeDevelopment = false, includePending = false }) => {
  const params = useParams();
  const { data, loading } = useQuery(MY_BACKLOG_QUERY);
  if (loading) return <Spinner />;
  let blBase = new Backlog(data.backlog, data.accounts, includeDevelopment, includePending);
  // console.log(includeDevelopment, blBase.getData().length);

  // const multitenantcustomers = data.multitenantcustomers;

  const [avgAge, all, over30, over60] = blBase
    .init()
    // .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .notStatus(["Solution Proposed", "Solution Pending Maintenance", "Awaiting Development"])
    .ownergroup("LN Tools Support")
    .regions(["EMEA", "APJ"])
    .sort("daysSinceCreated", "D")
    .getAvgOver30AndOver60AndData();
  const researching = blBase.init().status("Researching").dayssincelastupdate(params["N_RESEARCHING"]).sort("dayssincelastupdate", "D").getData();
  // console.log("mutllt", { mtincidents });

  return (
    <div className="px-2 pt-2 grid grid-cols-1 gap-x-2 gap-y-2">
      <Widget data={all} title={`Tools incidents - average age: ${avgAge} days - over 30 days: ${over30} - over 60 days: ${over60}`} />
    </div>
  );
};

export const Widget = ({ data = [], title = "", mark = false }) => {
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
  useEffect(() => {}, [currPage]);
  const prevDisabled = currPage <= 0;
  const nextDisabled = currPage >= nrPages || nrPages === 0;
  const alert: any = useAlert();
  const exportedData = exportToFile(data);
  return (
    <div className="p-2 rounded-lg shadow-lg bg-white">
      <h1 className={`flex justify-items-center py-1 font-semibold items-center ${mark ? "text-red-700" : "text-gray-700"}`}>
        {title} - ({len})
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
      {data.length === 0 ? <h2>No {title} incidents </h2> : <Table data={data.slice((currPage - 1) * MAX_LEN, currPage * MAX_LEN)} mark={mark} />}
    </div>
  );
};

const fieldList = [
  { title: "Incident", name: "incident" },
  { title: "Owner", name: "owner" },
  { title: "Customer", name: "customername" },
  { title: "Severity", name: "severityname" },
  { title: "Status", name: "status" },
  { title: "Created", name: "daysSinceCreated" },
  { title: "Updated", name: "dayssincelastupdate" },
  { title: "Summary", name: "title" },
];
const exportToFile = (data: any): string => {
  const tableHeaders = `<tr>` + fieldList.map((fld) => `<th style="border: 1px solid #eded">${fld.title}</th>`).join("") + `</tr>`;
  const tableContents = data
    .map((row: any) => {
      const tableRow = fieldList.map((fld) => `<td style="border: 1px solid #eded">${row[fld.name]}</td>`).join("");
      return `<tr style="border: 1px solid #eded">${tableRow}</tr>`;
    })
    .join("");
  return `<table style="border: 1px ; border-collapse: collapse;">${tableHeaders}${tableContents}</table>`;
};

const Table = ({ data }: any) => {
  function isStatusToMark(status: string) {
    return ["New", "Awaiting Infor", "Researching"].includes(status);
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
              <DataCell>No incidents..</DataCell>
            </tr>
          ) : (
            data.map((item: any) => (
              <tr key={item.incident}>
                {isStatusToMark(item.status) ? (
                  <HyperLinkCellRed value={item.incident} linkText={item.incident} />
                ) : (
                  <HyperLinkCell value={item.incident} linkText={item.incident} />
                )}
                {fieldList.map((field: any, index: number) => (index !== 0 ? <DataCell key={index}>{item[field.name]}</DataCell> : null))}
                {/* <DataCell>{item.owner}</DataCell>
                <DataCell>{item.customername}</DataCell>
                <DataCell>{item.severityname}</DataCell>
                <DataCell>{item.status}</DataCell>
                <DataCell>{item.daysSinceCreated}</DataCell>
                <DataCell>{item.dayssincelastupdate}</DataCell>
                <DataCell>{item.title}</DataCell> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ToolsBacklogPage;
