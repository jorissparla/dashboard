import { format } from "date-fns";
import { GenericTable } from "elements/GenericTable";
import { request } from "graphql-request";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Spinner from "utils/spinner";

const ALL_MAILER_LOGS_TEXT = `
  query ALL_MAILER_LOGS_TEXT {
      mailerlogs {
        id
        date
        dest
        subject
        message
      }
    }
`;

export function getfieldNamesFromData(row) {
  return Object.keys(row).map((fld) => ({ name: fld, title: fld, type: "" }));
}

function filterLogs(data = [], filterValues = { dest: "" }, fieldFilters) {
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

const API = "https://nlbavwixs.infor.com:4001";

function Mailerlog() {
  // const { data, loading } = useQuery(ALL_MAILER_LOGS);
  const { data } = useSWR(
    ALL_MAILER_LOGS_TEXT,

    (query) => request(API, query),
    { refreshInterval: 200000 }
  );
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (mailerlogs) {
      const temp = mailerlogs.map((l) => ({ ...l, fmtDate: format(parseInt(l.date), "dd MMM yyyy, hh:mm"), link: `/mailerlogs/${l.id}` }));
      // console.log(fmtData);
      const fmtData = _.sortBy(temp, [{ date: "desc" }]);
      setFormattedData(fmtData);
    }
  }, [data, mailerlogs]);

  if (!data) {
    return <Spinner></Spinner>;
  }
  const { mailerlogs } = data;
  let fields = getfieldNamesFromData({ subject: "", dest: "", fmtDate: "", type: "", link: "" });
  if (formattedData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <div className="min-h-full w-full bg-gray-100 flex  justify-center">
      <div className="mx-2 rounded shadow-lg w-full">
        <GenericTable
          fields={fields}
          title="Mailer Logs"
          data={formattedData}
          autoExpand={true}
          fnFilterData={filterLogs}
          linkField="link"
          linkPrefix="https://nlbavwixs.infor.com:8762"
          linkText="Open"
        />
      </div>
    </div>
  );
}

export default Mailerlog;
