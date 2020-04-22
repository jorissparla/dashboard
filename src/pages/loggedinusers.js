import React, { useState } from "react";
import useSWR from "swr";
import { request } from "graphql-request";
import { uri } from "../index";
import { format, addHours } from "date-fns";
import _ from "lodash";
import SearchBar from "common/SearchBar";

const query = `
  {
    accounts {
    fullname
    lastlogin
    image
  }
}

`;

const Loggedinusers = () => {
  const { data, error } = useSWR(
    query,

    (query) => request(uri, query)
  );

  const [searchText, setSearchText] = useState("");
  let showData = data?.accounts.filter((d) => d.lastlogin);
  if (searchText) {
    showData = showData.filter(({ fullname }) => fullname.includes(searchText));
  }
  showData = _.orderBy(showData, "lastlogin", "desc");

  return (
    <div className="h-screen w-full bg-gray-200">
      <SearchBar onChange={(value) => setSearchText(value)} hintText="Enter name" />
      <div className="grid lg:grid-cols-7 sm:grid-cols-6 gap-1 mx-auto w-full">
        {showData?.map((acc) => (
          <div key={acc.fullname} className=" rounded shadow-lg bg-white p-2 m-2 w-full overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-pop  font-semibold overflow-hidden">{acc.fullname}</h1>
              <img className="h-12 w-12 shadow rounded-full" src={acc.image} alt="" />
            </div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-200 text-teal-800">
              {format(addHours(parseInt(acc.lastlogin), -2), "yyyy-MM-dd HH:mm")}
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
