import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";
import { GenericTable } from "elements/GenericTable";
import { format } from "date-fns";

const QUERY_TENANT_LOGS = gql`
  query QUERY_TENANT_LOGS1 {
    tenantlogs {
      id
      date
      log
    }
  }
`;

export function getfieldNamesFromData(row) {
  return Object.keys(row).map((fld) => ({ name: fld, title: fld, type: "" }));
}

function filterLogs(data = [], filterValues = { owner: "", products: ["LN"], region: "EMEA" }, fieldFilters) {
  let mydata = [...data];

  for (let [key, value] of Object.entries(fieldFilters)) {
    if (value) {
      mydata = mydata.filter((item) => {
        if (typeof item[key] === "number") return item[key] >= value;
        return item[key]?.includes(value);
      });
    }
  }

  return mydata;
}

const TenantLogList = () => {
  const { data, loading } = useQuery(QUERY_TENANT_LOGS);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (tenantlogs) {
      const fmtData = tenantlogs.map((l) => ({ ...l, fmtDate: format(parseInt(l.date), "dd MMM yyyy, hh:mm") })).slice(0, 1000);
      // console.log(fmtData);
      setFormattedData(fmtData);
    }
  }, [data, tenantlogs]);
  if (loading) return <Spinner />;
  const { tenantlogs } = data;

  let fields = getfieldNamesFromData({ log: "", fmtDate: "" });
  return (
    <div className=" w-full bg-gray-100 flex  justify-center">
      <div className="m-4 rounded shadow-lg ">
        <GenericTable fields={fields} data={formattedData} autoExpand={true} fnFilterData={filterLogs} />
      </div>
    </div>
  );
};

export default TenantLogList;
