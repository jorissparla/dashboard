import React from "react";
import useSWR from "swr";
import { request } from "graphql-request";
import { uri } from "../index";
import { format } from "date-fns";
import _ from "lodash";

const query = `
  {
    accounts {
    fullname
    lastlogin
  }
}

`;

const Loggedinusers = () => {
  const { data, error } = useSWR(
    query,

    (query) => request(uri, query)
  );

  let showData = data?.accounts.filter((d) => d.lastlogin);
  showData = _.orderBy(showData, "lastlogin", "desc");
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="grid grid-cols-5 gap-1">
        {showData?.map((acc) => (
          <div className="border rounded shadow-lg bg-white p-2 m-2 w-full ">
            <h1 className="font-pop  font-semibold overflow-hidden">{acc.fullname}</h1>
            <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-200 text-teal-800">
              {format(parseInt(acc.lastlogin), "yyyy-MM-dd HH:mm")}
            </span>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(showData, null, 2)}</pre> */}
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};
export default Loggedinusers;
