import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";
import { GenericTable } from "elements/GenericTable";
import { format } from "utils/format";
import { CustomTable } from "elements/CustomTable";
import SearchBar from "common/SearchBar";
import TWButton from "elements/TWButton";
import { useHistory } from "react-router";

interface ITenantLogEntry {
  id: string;
  date?: string;
  log: string;
}
interface ITenantLogArray {}
interface ITenantLog {
  tenantlogs: ITenantLogEntry[];
}

const QUERY_TENANT_LOGS_NEW = gql`
  query QUERY_TENANT_LOGS_NEW {
    tenantlogs {
      id
      date
      log
    }
  }
`;

const formatDate = (val: any) => format(val, "dd MMM yyyy, hh:mm");

const TenantLogList = () => {
  const history = useHistory();
  const { data, loading } = useQuery<ITenantLog>(QUERY_TENANT_LOGS_NEW);
  const [formattedData, setFormattedData] = useState<ITenantLogEntry[] | any[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (data) {
      const selected = data.tenantlogs.filter((tl) => tl?.log.toLowerCase().includes(searchText.toLowerCase()));
      const tenantlogs = selected.slice(0, 200);

      setFormattedData(tenantlogs);
    }
  }, [data, searchText]);
  if (loading) return <Spinner />;
  return (
    <div className=" w-full bg-gray-100 flex  flex-col justify-center">
      <header className="flex items-center justify-between">
        <TWButton onClick={() => history.push("/tenant")}>Back to tenants</TWButton>
      </header>
      <SearchBar hintText="Search log" onChange={(v: string) => setSearchText(v)} />
      <div className="m-4 rounded shadow-lg bg-white w-full">
        <CustomTable
          data={formattedData}
          fields={[
            { title: "date", fld: "date", fn: formatDate, className: "bg-white" },
            { title: "Log", fld: "log" },
          ]}
          indexField={{ title: "id", fld: "id" }}
        />
      </div>
    </div>
  );
};

export default TenantLogList;
