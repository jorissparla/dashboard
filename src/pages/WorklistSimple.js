import { gql, useQuery } from "@apollo/client";
import AutoComplete from "elements/AutoComplete";
import TWButton from "elements/TWButton";
import { UserContext } from "./../globalState/UserProvider";
import React, { useEffect, useState } from "react";
import { Backlog } from "stats/BacklogType";
import Spinner from "utils/spinner";
import { useParams } from "./StatsMain";
import { usePersistentState } from "hooks";

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
  query MY_BACKLOG_QUERY($owner: String) {
    backlog(
      owner: $owner
      productFilters: ["LN", "PLM", "Protean", "InforOS", "Xpert", "Swan", "AutoConnect", "AutoRelease", "SupplyWeb", "TRANS4M"]
    ) {
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

const ACCOUNTS_QUERY = gql`
  query MY_ACCOUNTS_QUERY {
    accounts {
      id
      fullname
      navid
      managerid
    }
  }
`;

const WorklistSimpleWrapper = () => {
  const [support, setSupport] = useState([]);
  const [includeDevelopment, setIncludeDevelopment] = usePersistentState("includeDevelopment", false);
  const { user } = React.useContext(UserContext);
  const owner = user ? (user.fullname ? user.fullname : "") : "";
  const [name, setName] = useState(owner || "Eelco Mulder");
  const { data, loading } = useQuery(ACCOUNTS_QUERY);
  useEffect(() => {
    if (data) {
      const x = data.accounts ? data.accounts.map((s) => s.fullname).sort((a, b) => (a > b ? 1 : -1)) : [];
      setSupport(x);
    }
  }, [data]);
  let enableIt = false;
  let isValidSuperUser = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
  if (user && user.permissions) {
    enableIt = user.permissions.some(({ permission }) => permission === "STATS");
  }
  isValidSuperUser = isValidSuperUser || enableIt;
  // console.log("WorklistSimple", { support });
  if (loading) return <Spinner />;
  if (data.accounts.length === 0) return "loading";
  const x = data.accounts ? data.accounts.map((s) => s.fullname).sort((a, b) => (a > b ? 1 : -1)) : [];
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex items-center mb-4">
        <span className="mx-4 text-lg font-sans font-semibold">Essential Worklist for </span>{" "}
        <AutoComplete disabled={false} support={x} onChangeValue={(e) => setName(e)} value={name}></AutoComplete>
        <div className="ml-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeDevelopment}
              onChange={() => setIncludeDevelopment(!includeDevelopment)}
            />
            <span className="ml-2">Include Development issues</span>
            {/* {includeDevelopment ? "Ja" : "Nee"} */}
          </label>
        </div>
      </div>
      <WorklistSimple owner={name} includeDevelopment={includeDevelopment} />
    </div>
  );
};

const WorklistSimple = ({ owner = "", includeDevelopment }) => {
  const params = useParams();
  const { data, loading } = useQuery(MY_BACKLOG_QUERY, { variables: { owner } });
  if (loading) return <Spinner />;
  let blBase = new Backlog(data.backlog, data.accounts, includeDevelopment);
  // console.log(includeDevelopment, blBase.getData().length);

  // const multitenantcustomers = data.multitenantcustomers;

  const mtincidents = blBase.filterField("Tenant", "Multi-Tenant").notStatus(["Solution Proposed", "Solution Pending Maintenance"]).getData();

  // .filter(
  //   (inc) => multitenantcustomers.find((cust) => parseInt(cust.customerid) === inc.customerid)
  //   // inc.customerid === 60028554
  // )
  // .filter((x) => x.Tenant !== "Multi-Tenant");
  const major_impact = blBase
    .init()
    .severity("Major Impact")
    .notServicedRestored()
    .notStatus(["Solution Proposed"])
    .dayssincelastupdate(2)
    .sort("dayssincelastupdate", "D")
    .getData();
  const escalated = blBase
    .init()
    // .region("EMEA")
    .escalated()
    .addEscalatedDays()
    .notStatus(["Solution Proposed", "Solution Pending Maintenance"])
    .sort("dayssincelastupdate", "D")
    .addManager()
    .getData();
  const callback = blBase
    .init()
    // .region("EMEA")
    .addEscalatedDays()
    .hasStatus(["New", "Awaiting Infor"])
    .sort("dayssincelastupdate", "D")
    .addManager()
    .getData();

  const [avgAge, all] = blBase
    .init()
    // .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .notStatus(["Solution Proposed"])
    .sort("dayssincelastupdate", "D")
    .getAvgAndData();
  const researching = blBase.init().status("Researching").dayssincelastupdate(params["N_RESEARCHING"]).sort("dayssincelastupdate", "D").getData();
  // console.log("mutllt", { mtincidents });

  return (
    <div className="px-2 pt-2 grid grid-cols-2 gap-x-2 gap-y-2">
      <Widget data={major_impact} title="Major Impact incidents" mark={true} />
      <Widget data={escalated} title="Escalated" mark={true} />
      <Widget data={mtincidents} title="Multitenant Customer issues" mark={true} />
      <Widget data={researching} title="Researching Not updated" />
      <Widget data={all} title={`All incidents - average age: ${avgAge} days`} />
      <Widget data={callback} title={`Callbacks and new issues`} />
    </div>
  );
};

const Widget = ({ data = [], title, mark = false }) => {
  const len = data.length;
  const MAX_LEN = 5;
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
  return (
    <div className="p-2 rounded-lg shadow-lg bg-white">
      <h1 className={`flex justify-items-center py-1 font-semibold items-center ${mark ? "text-red-700" : "text-gray-700"}`}>
        {title} - ({len})
        <div className="flex-1 flex justify-between sm:justify-end">
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
      {data.length === 0 ? <h2>No {title} incidents </h2> : <Table data={data.slice((currPage - 1) * MAX_LEN, currPage * MAX_LEN - 1)} mark={mark} />}
    </div>
  );
};

const HeaderCell = ({ children }) => (
  <th className="z-20 sticky top-0 text-sm font-semibold text-gray-700 bg-gray-100 p-0">
    <div className="p-2 border-b border-gray-300">{children}</div>
  </th>
);

const HyperLinkCell = ({ value = "", linkPrefix = "http://navigator.infor.com/n/incident.asp?IncidentID=", linkText = "" }) => (
  <td className="p-2 font-sans text-sm font-semibold text-blue-700">
    <a className="inline-block align-baseline font-bold text-sm " href={`${linkPrefix}${value}`} target="_blank">
      {linkText || value}
    </a>
  </td>
);
const HyperLinkCellRed = ({ value = "", linkPrefix = "http://navigator.infor.com/n/incident.asp?IncidentID=", linkText = "" }) => (
  <td className="p-2 font-sans text-sm font-semibold text-red-700">
    <a
      className="inline-block align-baseline font-bold text-sm bg-red-200 rounded-lg no-underline px-2 text-red-700"
      href={`${linkPrefix}${value}`}
      target="_blank"
    >
      {linkText || value}
    </a>
  </td>
);
const DataCell = ({ children }) => <td className="p-2 font-sans text-sm font-semibold text-blue-700 ">{children}</td>;

const Table = ({ data, mark }) => {
  function isStatusToMark(status, mark) {
    return ["New", "Awaiting Infor", "Researching"].includes(status);
  }

  return (
    <div className="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
      <table className="w-full text-left table-collapse">
        <thead>
          <tr>
            <HeaderCell>Incident</HeaderCell>
            <HeaderCell>Customer</HeaderCell>
            <HeaderCell>Severity</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Summary</HeaderCell>
            <HeaderCell>Updated</HeaderCell>
          </tr>
        </thead>
        <tbody className="align-baseline">
          {data.length === 0 ? (
            <tr>
              <DataCell>No incidents..</DataCell>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.incident}>
                {isStatusToMark(item.status) ? (
                  <HyperLinkCellRed value={item.incident} linkText={item.incident} />
                ) : (
                  <HyperLinkCell value={item.incident} linkText={item.incident} />
                )}
                <DataCell>{item.customername}</DataCell>
                <DataCell>{item.severityname}</DataCell>
                <DataCell>{item.status}</DataCell>
                <DataCell>{item.title}</DataCell>
                <DataCell>{item.dayssincelastupdate}</DataCell>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default WorklistSimpleWrapper;
