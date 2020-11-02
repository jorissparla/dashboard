import { gql, useQuery } from "@apollo/client";
import AutoComplete from "elements/AutoComplete";
import TWButton from "elements/TWButton";
import { UserContext } from "./../globalState/UserProvider";
import React, { useEffect, useState } from "react";
import { Backlog } from "stats/BacklogType";
import Spinner from "utils/spinner";
import { useParams } from "./StatsMain";

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
  const { user } = React.useContext(UserContext);
  const owner = user ? (user.fullname ? user.fullname : "") : "";
  const [name, setName] = useState(owner || "Joris Sparla");
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
  console.log({ data });
  const x = data.accounts ? data.accounts.map((s) => s.fullname).sort((a, b) => (a > b ? 1 : -1)) : [];
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex items-center mb-4">
        <span className="mx-4 text-lg font-sans font-semibold">Essential Worklist for </span>{" "}
        <AutoComplete disabled={false} support={x} onChangeValue={(e) => setName(e)} value={name}></AutoComplete>
      </div>
      <WorklistSimple owner={name} />
    </div>
  );
};

const WorklistSimple = ({ owner = "" }) => {
  const params = useParams();
  const { data, loading } = useQuery(MY_BACKLOG_QUERY, { variables: { owner } });
  if (loading) return <Spinner />;
  const blBase = new Backlog(data.backlog, data.accounts);
  const multitenantcustomers = data.multitenantcustomers;
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
      <Widget data={major_impact} title="Major Impact incidents" />
      <Widget data={escalated} title="Escalated" />
      <Widget data={mtincidents} title="Multitenant Customer issues" />
      <Widget data={researching} title="Researching Not updated" />
      <Widget data={all} title={`All incidents - average age: ${avgAge} days`} />
      <Widget data={callback} title={`Callbacks and new issues`} />
    </div>
  );
};

const Widget = ({ data = [], title }) => {
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
  return (
    <div className="p-2 rounded-lg shadow-lg bg-white">
      <h1 className="flex justify-items-center py-1 font-semibold items-center">
        {title} - ({len})
        <div className="flex-1 flex justify-between sm:justify-end">
          <span>
            page {currPage} of {nrPages}
          </span>
          {currPage > 1 && (
            <TWButton onClick={handlePrevPage} color="grey">
              Prev
            </TWButton>
          )}

          {currPage !== nrPages && nrPages !== 0 && (
            <>
              <TWButton onClick={handleNextPage} color="grey">
                Next
              </TWButton>
            </>
          )}
        </div>
      </h1>
      {data.length === 0 ? <h2>No {title} incidents </h2> : <Table data={data.slice((currPage - 1) * MAX_LEN, currPage * MAX_LEN - 1)} />}
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
    <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href={`${linkPrefix}${value}`} target="_blank">
      {linkText || value}
    </a>
  </td>
);
const DataCell = ({ children }) => <td className="p-2 font-sans text-sm font-semibold text-blue-700 ">{children}</td>;

const Table = ({ data }) => (
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
              <HyperLinkCell value={item.incident} linkText={item.incident}></HyperLinkCell>
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
export default WorklistSimpleWrapper;
