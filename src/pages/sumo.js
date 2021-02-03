import { useQuery, gql } from "@apollo/client";
import InputTags from "common/InputTags";
import InputTagsDropDown from "common/InputTagsDD";
import SearchBar from "common/SearchBar";
import Modal from "elements/ModalComponent";
import TWButton, { TWHyperLink } from "elements/TWButton";
import { useHasPermissions } from "globalState/UserProvider";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format } from "utils/format";
import Spinner from "utils/spinner";
import _ from "lodash";
import { SumoNav } from "./SumoNav";

const ALL_SUMOLOGS_QUERY = gql`
  query ALL_SUMOLOGS_QUERY {
    sumologs {
      id
      creator
      created
      customername
      week
      comments
      created
      query
      farms
      incident
      sessioncode
      errormessage
      module
    }
  }
`;

const Sumo = () => {
  const [isShowingAdd, showAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { data, loading } = useQuery(ALL_SUMOLOGS_QUERY);
  const [canEdit, user] = useHasPermissions(["SUMOEDIT"]);
  const [sumoDisplayData, setSumoDisplayData] = useState([]);
  // console.log([canEdit, user]);
  function toggleShow() {
    showAdd(false);
  }

  function search(item) {
    const query = this;
    // console.log(query);
    // Object.keys(query).map((key) => console.log({ key, query: query[key], item: item[key] }));
    return Object.keys(query).some((key) => (item[key] || "").toLowerCase().includes(query[key].toLowerCase()));
  }

  function doFilter(items, searchText, fields = []) {
    if (searchText === "") return items;
    let query = fields.reduce((q, field) => ({ ...q, [field]: searchText }), {});
    const result = items.filter(search, query);
    return result;
  }

  useEffect(() => {
    if (data) {
      if (searchText) {
        setSumoDisplayData(doFilter(data.sumologs, searchText, ["sessioncode", "creator", "query", "errormessage, farms, module", "customername"]));
        // setSumoDisplayData(doFilter(data.sumologs, searchText, ["farms"]));
      } else {
        setSumoDisplayData(data.sumologs);
      }
    }
  }, [searchText, data]);

  if (loading) return <Spinner />;
  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <header className="flex items-center justify-between">
        <SumoNav current="Sumo Logs" />

        {canEdit && (
          <TWButton color="blue" onClick={() => history.push("/addsumo")}>
            New
          </TWButton>
        )}
      </header>

      <div className="relative">
        <SearchBar
          onChange={setSearchText}
          defaultValue={searchText}
          hintText="Search farm, module,session, query, error, customer"
          className="-mx-10 xl:w-full"
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 list-none">
        {sumoDisplayData.map((item) => (
          <SumoListItem item={item} />
        ))}
      </ul>
    </section>
  );
};
const SumoListItem = ({ item }) => {
  const history = useHistory();
  console.log(item, item.farms?.split(";"));
  return (
    <li>
      <button
        onClick={() => history.push(`/editsumo/${item.id}`)}
        className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200 no-underline overflow-hidden bg-light-blue-100 shadow-lg"
      >
        <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
          <div className="flex flex-wrap ">
            <dt className="sr-only">Title</dt>
            <dd className="group-hover:text-white leading-6 font-medium text-black">{item.creator}</dd>
            <dd className="group-hover:text-white leading-6  text-gray-600 text-xs"> · {format(item.created, "yyyy-MM-dd")}</dd>
            <dd className="group-hover:text-white leading-6  text-gray-600 text-xs"> · {item.customername}</dd>
            <div>
              <dt className="sr-only">Session code</dt>
              <dd className="group-hover:text-white leading-6 font-semibold text-gray-600 text-xs"> · {item.sessioncode}</dd>
            </div>
            <div>
              <dt className="sr-only">Module</dt>
              <dd className="group-hover:text-white leading-6 font-bold text-blue-600 text-xs"> · {item.module}</dd>
            </div>
          </div>
          <div className="divide-y divide-blue-200">
            <dt className="sr-only">Week</dt>
            <InputTags values={item.farms?.split(";")} label="" className="bg-light-blue-100 border-none" />
          </div>
          <div className="divide-y divide-blue-200">
            <dt className="sr-only">query</dt>
            <dd className="group-hover:text-light-blue-200 text-sm font-mono sm:mb-4 lg:mb-0 xl:mb-4">{item.query}</dd>
          </div>
          <div className="divide-y divide-blue-200">
            <dt className="sr-only">query</dt>
            <dd className="group-hover:text-light-blue-200 text-sm font-mono sm:mb-4 lg:mb-0 xl:mb-4 max-h overflow-hidden">
              {item.errormessage || "No error"}
            </dd>
          </div>
        </dl>
      </button>
    </li>
  );
};

export default Sumo;
