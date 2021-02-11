import { gql, useQuery } from "@apollo/client";
import InputTags from "common/InputTags";
import SearchBar from "common/SearchBar";
import TWButton from "elements/TWButton";
import TWCheckbox from "elements/TWCheckbox";
import { useHasPermissions } from "globalState/UserProvider";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format } from "utils/format";
import Spinner from "utils/spinner";
import { SumoNav } from "./SumoNav";
import { ALL_SUMOLOGS_QUERY } from "sumo/sumoqueries";

const Sumo = () => {
  const [isShowingAdd, showAdd] = useState(false);
  const [isShowingArchived, setToggleShowArchive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { data, loading } = useQuery(ALL_SUMOLOGS_QUERY);
  const [canEdit, user] = useHasPermissions(["SUMOEDIT"]);
  const [sumoDisplayData, setSumoDisplayData] = useState([]);
  // console.log([canEdit, user]);
  function toggleShow() {
    showAdd(false);
  }

  function filterOn(object, fields = [], value) {
    // fields.map((f) => console.log(value, f, object[f]));
    const res = fields.some((field) => {
      console.log(field, object[field]?.toUpperCase(), value?.toUpperCase());
      return object[field]?.toUpperCase().includes(value?.toUpperCase());
    });

    return res;
    //|| nestedFields.some(_.includes(object)));
  }

  function boolToInt(value) {
    console.log(value);
    if (value) {
      return 1;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    console.log("UseEffect", boolToInt(isShowingArchived));
    if (data) {
      let newData = data.sumologs;
      if (searchText) {
        newData = newData
          .filter(
            (item) => filterOn(item, ["sessioncode", "creator", "summary", "errormessage", "farms", "module", "customername"], searchText)
            //_.includes(user.fullname.toUpperCase(), this.state.searchText.toUpperCase())
          )
          .slice(0, 20);
        console.log(newData);
      }

      if (!isShowingArchived) {
        newData = newData.filter((item) => item.archive === 0);
      } else {
        newData = newData.filter((item) => item.archive > 0);
      }
      setSumoDisplayData(newData);
    }
  }, [searchText, data, isShowingArchived]);

  if (loading) return <Spinner />;
  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-2 sm:pb-2 lg:pb-4 xl:pb-2 space-y-4">
      <header className="flex items-center justify-between">
        <SumoNav current="Sumo Logs" />
        <TWCheckbox label="Show Archived" value={isShowingArchived} onChange={() => setToggleShowArchive(!isShowingArchived)} />
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
          hintText="Search farm, module,session, summary, error, customer"
          className="-mx-10 xl:w-full"
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 list-none">
        {sumoDisplayData.map((item) => (
          <SumoListItem item={item} />
        ))}
      </ul>
    </section>
  );
};
const SumoListItem = ({ item }) => {
  const history = useHistory();
  return (
    <li className="" key={item.id}>
      <button
        onClick={() => history.push(`/editsumo/${item.id}`)}
        className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200 no-underline overflow-hidden bg-light-blue-100 shadow-lg"
      >
        <dl className="flex flex-col items-center">
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
            <dd className="group-hover:text-light-blue-200 text-sm font-semibold text-light-blue-600 font-sans sm:mb-4 lg:mb-0 xl:mb-4 max-h overflow-hidden">
              {item.summary || "No error"}
            </dd>
          </div>
        </dl>
      </button>
    </li>
  );
};

export default Sumo;
