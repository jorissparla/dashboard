import { makeStyles } from "@material-ui/core/styles";
import { usePersistentState } from "hooks";
import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { SelectionForm } from "../stats/NewSelectionForm";
import { QUERY_BACKLOG, KBQUERY } from "../stats/queries/BACKLOG_QUERY2";
import { request } from "graphql-request";
import useSWR from "swr";
import { format } from "../utils/format";
import { UserContext } from "./../globalState/UserProvider";
import NiceSpinner from "./../utils/NiceSpinner";
import { StatsMain, useParams } from "./StatsMain";
import { GenericTable } from "elements/GenericTable";

export const PRODUCT_LIST = ["LN", "PLM", "Protean", "InforOS", "Xpert", "Swan", "AutoConnect", "AutoRelease", "SupplyWeb", "TRANS4M"];
export const REGION_LIST = ["APJ", "EMEA", "NA", "LA"];
export const REGION_LIST_2 = [
  {
    value: "APJ",
    title: "APJ",
  },
  {
    value: "EMEA",
    title: "EMEA",
  },
  {
    value: "LA",
    title: "LA",
  },
  {
    value: "NA",
    title: "NA",
  },
  {
    value: "All",
    title: "ALL REGIONS",
  },
];

const Stats = (props) => {
  const { user } = React.useContext(UserContext);
  const [date] = useState(format(Date.now(), "yyyy-MM-dd"));
  let enableIt = false;
  const isValidSuperUser = ["Admin", "PO"].some((u) => (user ? u === user.role : false));
  if (user && user.permissions) {
    enableIt = user.permissions.some(({ permission }) => permission === "STATS");
  }
  console.log("Start:", new Date());
  const parms = useParams(!isValidSuperUser && !enableIt);
  const API = "https://nlbavwixs.infor.com:4001";
  const { data, error } = useSWR(
    KBQUERY,

    (query) => request(API, query),
    { refreshInterval: 200000 }
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <NiceSpinner />;
  console.log(data);

  const owner = user ? (user.fullname ? user.fullname : "") : "";
  console.log(owner, data);
  // return <div>KBPage</div>;
  return <KBMainPage data={data} classes={null} isValidSuperUser={isValidSuperUser || enableIt} owner={owner} />;
};

const KBMainPage = ({ data, classes, owner, isValidSuperUser }) => {
  const history = useHistory();
  const mostRecentUpdate = data ? data.mostRecentUpdate : new Date().toLocaleTimeString();
  const [selectedProducts] = usePersistentState("selectedproducts", ["LN"]);
  const [region] = usePersistentState("region", "EMEA");
  const [filterValues, setFilterValues] = useState({
    owner,
    products: selectedProducts,
    region,
  });
  function handleChange(values) {
    setFilterValues(values);
  }
  return (
    <div className="font-sans text-lg  bg-gray-200 min-h-screen flex items-center mb-10 px-2 flex-col w-full">
      <SelectionForm
        classes={classes}
        isValidSuperUser={isValidSuperUser}
        onChange={handleChange}
        onNavigateToParams={() => history.push("/myworkparams")}
        initialValue={{
          owner,
          lastUpdated: mostRecentUpdate,
          actionNeeded: true,
        }}
      />

      <KBMain data={data} owner={owner} filterValues={filterValues} />
    </div>
  );
};

function generateFields(record) {
  let fields = [];
  for (let [key, value] of Object.entries(record)) {
    fields = [...fields, { name: key, title: key, type: "" }];
  }
  return fields;
}

function filterKBData(data = [], filterValues = { owner: "", products: ["LN ERP"], region: "EMEA" }, fieldFilters) {
  const { owner, products, region } = filterValues;
  let correctedRegion = region === "All" ? "" : region;
  let mydata = [...data];
  if (data?.length > 0) {
    mydata = data && owner ? data.filter((o) => o.owner === owner) : data;
    console.log("in filterKB", products, mydata);
    // mydata = products.length ? mydata.filter((o) => products.includes(o.productline)) : mydata;
    mydata = correctedRegion ? mydata.filter((o) => o.region === correctedRegion) : mydata;
    for (let [key, value] of Object.entries(fieldFilters)) {
      if (value) {
        mydata = mydata.filter((item) => {
          if (typeof item[key] === "number") return item[key] >= value;
          return item[key]?.includes(value);
        });
      }
    }
  }
  return mydata;
}

export const KBTable = (props) => {
  if (props.data && props.data.length > 0) {
    let fields = getfieldNamesFromData(props.data[0]);
    return (
      <GenericTable
        fields={fields}
        ageColumn={"daysSinceCreated"}
        fnFilterData={filterKBData}
        filterValues={{ owner: "", products: ["LN"], region: "EMEA" }}
        {...props}
      />
    );
  } else return <div />;
};
// Sanitize field inputs

function fieldMapper(fields) {}

function getfieldNamesFromData(row) {
  return Object.keys(row).map((fld) => ({ name: fld, title: fld, type: "" }));
}

const KBMain = ({ data, owner, filterValues }) => {
  const allKB = data.allKB;
  if (allKB.length === 0) return <div></div>;
  let fields = generateFields(allKB[0]);

  const programError = allKB.filter((k) => k.type === "Program Error");
  const knowledge = allKB.filter((k) => k.type === "Knowledge");
  return (
    <div className=" w-full">
      {/* <pre className="text-xs">{JSON.stringify(fields, null, 2)}</pre> */}
      <KBTable
        filterValues={filterValues}
        additionalFields={["ownergroup"]}
        data={allKB}
        title="All KB Articles"
        description="KB Articles, unpublished, older than a year"
      />
      <KBTable
        filterValues={filterValues}
        additionalFields={["ownergroup"]}
        data={programError}
        title="Progam Error KB Articles"
        description="KB Articles, unpublished, older than a year"
      />
      <KBTable
        filterValues={filterValues}
        additionalFields={["ownergroup"]}
        data={knowledge}
        title="Knowledge KB Articles"
        description="KB Articles, unpublished, older than a year"
      />
      {/* <GenericTable data={allKB.slice(0, 100)} owner={owner} fields={fields} description="KB" title="KB" filterValues={filterValues} /> */}
    </div>
  );
};

export default Stats;
