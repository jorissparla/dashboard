import React, { useState } from "react";
import useSWR from "swr";
import { request, gql } from "graphql-request";
import { uri } from "../index";
import { format, addHours } from "date-fns";
import _ from "lodash";
import SearchBar from "common/SearchBar";
import getInitials from "tenants/details/getInitials";
import { useUserContext } from "globalState/UserProvider";
import { useHistory } from "react-router";
import { classNames } from "elements/TableComponent";

const query = gql`
  {
    accounts {
      id
      navid
      fullname
      lastlogin
      image
      email
      navid
      role
      team
      region
      permissions {
        permission
      }
      managerid
    }
  }
`;

const Loggedinusers = ({ admin = false }) => {
  console.log(query);
  const { data, error } = useSWR(query);
  console.log({ data });
  console.log({ admin });
  const { user: current } = useUserContext();
  const history = useHistory();
  let isAdmin = admin || current?.role === "Admin";
  const [searchText, setSearchText] = useState("");
  const addManager = (data = [], refField = "managerid", idField = "navid", asFieldName = "managerName") => {
    return data.map((item) => {
      let managerName = "Manager";
      const foundName = data.find((refItem) => refItem[idField] === item[refField])?.fullname;
      return { ...item, [asFieldName]: foundName || managerName };
    });
  };

  if (!data) return null;
  let showData = data?.accounts.filter((d) => d.lastlogin);
  showData = addManager(_.orderBy(showData, "lastlogin", "desc"));
  if (searchText) {
    showData = showData.filter(({ fullname }) => fullname.includes(searchText));
  }

  return (
    <div className="h-screen w-full bg-gray-200">
      <SearchBar onChange={(value) => setSearchText(value)} hintText="Enter name" />
      <div className="w-full px-6">
        <div className="grid lg:grid-cols-7 sm:grid-cols-6 gap-1 mx-auto w-full">
          {showData?.map((acc) => {
            const regionCls = {
              EMEA: "bg-teal-200 text-teal-800 ",
              NA: "bg-purple-200 text-purple-800 ",
              LA: "bg-pink-200 text-pink-800 ",
              APJ: "bg-gray-200 text-gray-800 ",
              GLB: "bg-blue-200 text-blue-800 ",
            };
            const baseClass = "h-12 w-12 shadow rounded-full  text-xl flex items-center justify-center font-semibold";
            const avaClass = classNames(regionCls[acc.region], baseClass);
            const tagClass = classNames(
              regionCls[acc.region],
              " inline-flex items-center px-3 py-0.5 rounded-full text-sm  font-semibold leading-5 "
            );

            return (
              <div key={acc.fullname} className=" rounded shadow-lg bg-white p-2 m-2 w-full overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="font-pop cursor-pointer font-semibold overflow-hidden">{acc.fullname}</h1>
                  <button onClick={() => (isAdmin ? history.push("/profilepage/" + acc.id) : null)}>
                    {acc.image ? (
                      <img className="min-w-12 h-12 w-12 shadow rounded-full" src={acc.image} alt="Profile " />
                    ) : (
                      // <div className="h-12 w-12 shadow rounded-full bg-teal-200 text-teal-800 text-xl flex items-center justify-center font-semibold">
                      <div className={avaClass}>{getInitials(acc.fullname)}</div>
                    )}
                  </button>
                </div>
                {/* <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-teal-200 text-teal-800"> */}
                <span className={tagClass}>{format(addHours(parseInt(acc.lastlogin), -2), "yyyy-MM-dd HH:mm")}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* <pre>{JSON.stringify(showData, null, 2)}</pre> */}
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};
export default Loggedinusers;
