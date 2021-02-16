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
import { CustomTable } from "elements/CustomTable";

const ALL_SUMOALERTS_QUERY = gql`
  query ALL_SUMOALERTS_QUERY {
    sumoalerts {
      id
      creator
      created
      alert
      comments
      environments
      archive
      customerid
      customername
    }
  }
`;

const SumoAlert = () => {
  const [isShowingAdd, showAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { data, loading } = useQuery(ALL_SUMOALERTS_QUERY);
  const [canEdit, user] = useHasPermissions(["SUMOEDIT"]);
  const [sumoDisplayData, setSumoDisplayData] = useState([]);
  // console.log([canEdit, user]);
  function toggleShow() {
    showAdd(false);
  }

  function search(item) {
    const query = this;
    return Object.keys(query).some((key) => _.includes(item[key] || "".toLowerCase(), query[key].toLowerCase()));
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
        setSumoDisplayData(doFilter(data.sumoalerts, searchText, ["sessioncode", "creator", "query", "errormessage"]));
      } else {
        setSumoDisplayData(data.sumoalerts);
      }
    }
  }, [searchText, data]);

  const formatDate = (val) => format(val, "yyyy-MM-dd");

  if (loading) return <Spinner />;
  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <header className="flex items-center justify-between">
        <SumoNav current="Alerts" />
        {/* <h2 className="text-lg leading-6 font-medium text-black">Sumo Logs</h2> */}
        {canEdit ||
          (true && (
            <TWButton color="blue" onClick={() => history.push("/addalert")}>
              New
            </TWButton>
          ))}
      </header>

      <div className="relative">
        <SearchBar onChange={setSearchText} defaultValue={searchText} hintText="Search alert, comment, environments" />
      </div>
      <CustomTable
        data={sumoDisplayData}
        linkPrefix="/editsumoalerts/"
        fields={[
          { title: "id", fld: "id", hl: true },
          { title: "creator", fld: "creator" },
          { title: "created", fld: "created", fn: formatDate },
          { title: "comments", fld: "comments" },
          { title: "alert", fld: "alert", className: "font-mono text-xs bg-teal-300" },
          { title: "environments", fld: "environments" },
          { title: "customer", fld: "customer" },
        ]}
        indexField={{ title: "id", fld: "id" }}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 list-none">
        {sumoDisplayData.map((item) => (
          <SumoAlertListItem item={item} />
        ))}
        Alerts come here
      </ul>
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
