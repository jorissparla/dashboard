import { useQuery } from "@apollo/client";
import InputTags from "common/InputTags";
import SearchBar from "common/SearchBar";
import { CustomTable } from "elements/CustomTable";
import TWButton from "elements/TWButton";
import TWCheckbox from "elements/TWCheckbox";
import { useHasPermissions } from "globalState/UserProvider";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ALL_SUMOALERTS_QUERY } from "sumo/sumoqueries";
import { format } from "utils/format";
import Spinner from "utils/spinner";
import { SumoNav } from "./SumoNav";

const SumoAlert = () => {
  const [isShowingAdd, showAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const [isShowingArchived, setToggleShowArchive] = useState(false);
  const { data, loading } = useQuery(ALL_SUMOALERTS_QUERY);
  const [canEdit, user] = useHasPermissions(["SUMOEDIT"]);
  const [sumoAlertDisplayData, setSumoAlertDisplayData] = useState([]);
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

  useEffect(() => {
    if (data) {
      let newData = data.sumoalerts;
      if (searchText) {
        newData = newData.slice().filter((item) => filterOn(item, ["", "creator", "comments", "alert", "environments", "customername"], searchText));
      }

      if (!isShowingArchived) {
        newData = newData.filter((item) => item.archive === 0);
      } else {
        newData = newData.filter((item) => item.archive > 0);
      }
      setSumoAlertDisplayData(newData);
    }
  }, [searchText, data, isShowingArchived]);

  const formatDate = (val) => format(val, "yyyy-MM-dd");

  if (loading) return <Spinner />;
  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4  h-screen">
      <header className="flex items-center justify-between bg-white">
        <SumoNav current="Alerts" />
        <TWCheckbox label="Show Archived" value={isShowingArchived} onChange={() => setToggleShowArchive(!isShowingArchived)} />
        {/* <h2 className="text-lg leading-6 font-medium text-black">Sumo Logs</h2> */}
        {canEdit ||
          (true && (
            <TWButton color="blue" onClick={() => history.push("/addsumoalert")}>
              New
            </TWButton>
          ))}
      </header>

      <div className="relative">
        <SearchBar onChange={setSearchText} defaultValue={searchText} hintText="Search alert, comment, environments" />
      </div>
      <div className="bg-white rounded shadow-xl p-2 my-2">
        <CustomTable
          data={sumoAlertDisplayData}
          linkPrefix="/editsumoalerts/"
          fields={[
            // { title: "id", fld: "id",  },
            { title: "alert creator ", fld: "creator", hl: true, className: "w-48" },
            { title: "created", fld: "created", fn: formatDate },
            { title: "comments", fld: "comments" },
            { title: "alert", fld: "alert", className: "font-mono text-xs text-gray-600" },
            { title: "environments", fld: "environments" },
            { title: "customer", fld: "customer" },
          ]}
          indexField={{ title: "id", fld: "id" }}
        />
      </div>
      {/* <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 list-none">
        {sumoAlertDisplayData.map((item) => (
          <SumoAlertListItem item={item} />
        ))}
        Alerts come here
      </ul> */}
    </section>
  );
};

const SumoAlertListItem = ({ item }) => {
  console.log(item, item.farms?.split(";"));
  return (
    <li>
      <a
        href={`/editsumoalert/${item.id}`}
        className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200 no-underline overflow-hidden bg-light-blue-100 shadow-lg"
      >
        <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
          <div className="flex flex-wrap">
            <dt className="sr-only">Title</dt>
            <dd className="group-hover:text-white leading-6 font-medium text-black">{item.creator}</dd>
            <dd className="group-hover:text-white leading-6  text-gray-600 text-xs"> · {format(item.created, "yyyy-MM-dd")}</dd>
            <div>
              <dt className="sr-only">Week</dt>
              <dd className="group-hover:text-white leading-6 font-semibold text-gray-600 text-xs"> · {item.customer}</dd>
            </div>
          </div>
          <div>
            <dt className="sr-only">Week</dt>
            <InputTags values={item.environments?.split(";")} label="" className="bg-light-blue-100 border-none" />
          </div>
          <div className="divide-y border-blue-300">
            <dt className="sr-only">query</dt>
            <dd className="group-hover:text-light-blue-200 text-sm font-mono sm:mb-4 lg:mb-0 xl:mb-4">{item.alert}</dd>
          </div>
        </dl>
      </a>
    </li>
  );
};

export default SumoAlert;
