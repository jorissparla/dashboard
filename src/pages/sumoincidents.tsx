import React, { useEffect, useState } from "react";

import { ALL_SUMO_INCIDENTS_QUERY } from "sumo/sumoqueries";
import { CustomTable } from "elements/CustomTable";
import { ISumoIncidentData } from "sumo/sumotypes";
import SearchBar from "common/SearchBar";
import Spinner from "utils/spinner";
import { SumoNav } from "./SumoNav";
import TWButton from "elements/TWButton";
import TWCheckbox from "elements/TWCheckbox";
import { format } from "utils/format";
import { useHasPermissions } from "globalState/UserProvider";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";

function SumoIncidents() {
  const [isShowingAdd, showAdd] = useState(false);
  const [isShowingArchived, setToggleShowArchive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { data, loading } = useQuery<ISumoIncidentData>(ALL_SUMO_INCIDENTS_QUERY);
  const [canEdit, user] = useHasPermissions(["SUMOEDIT"]);
  const [sumoDisplayData, setSumoDisplayData] = useState<ISumoIncidentData | any[]>([]);
  // console.log([canEdit, user]);
  function toggleShow() {
    showAdd(false);
  }
  function boolToInt(value: boolean) {
    console.log(value);
    if (value) {
      return 1;
    } else {
      return 0;
    }
  }
  function filterOn(object: any, fields: string[], value: string) {
    // fields.map((f) => console.log(value, f, object[f]));
    const res = fields.some((field) => {
      if (object[field]) {
        const val: string = object[field];
        return val.toUpperCase().includes(value?.toUpperCase());
      }
    });

    return res;
    //|| nestedFields.some(_.includes(object)));
  }

  const formatDate = (val: any) => format(val, "yyyy-MM-dd");

  const trimVal = (val: string) => val.slice(0, 150);

  useEffect(() => {
    console.log("UseEffect", boolToInt(isShowingArchived));
    if (data) {
      let newData = data.sumoincidents;
      if (searchText) {
        newData = newData
          .filter(
            (item) => filterOn(item, ["creator", "summary", "action", "customername"], searchText)
            //_.includes(user.fullname.toUpperCase(), this.state.searchText.toUpperCase())
          )
          .slice(0, 200);
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
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <header className="flex items-center justify-between">
        <SumoNav current="Incidents" />
        <TWCheckbox label="Show Archived" value={isShowingArchived} onChange={() => setToggleShowArchive(!isShowingArchived)} />
        {/* <h2 className="text-lg leading-6 font-medium text-black">Sumo Logs</h2> */}
        {canEdit && (
          <TWButton color="blue" onClick={() => history.push("/addsumoincident")}>
            New
          </TWButton>
        )}
      </header>

      <div className="relative">
        <SearchBar onChange={setSearchText} defaultValue={searchText} hintText="Search customer,summary, action" />
      </div>
      <div className="bg-white rounded shadow-xl p-2 my-2">
        <CustomTable
          data={sumoDisplayData}
          linkPrefix="/editsumoincident/"
          fields={[
            // { title: "id", fld: "id",  },
            { title: "incident creator ", fld: "creator", hl: true, className: "w-48" },
            { title: "created", fld: "created", fn: formatDate, className: "bg-white" },
            { title: "customer", fld: "customername" },
            { title: "summary", fld: "summary", fn: trimVal, className: "font-mono text-xs text-gray-600" },
            { title: "incident", fld: "incident", nl: true },
            { title: "status", fld: "status" },
            { title: "action", fld: "action" },
          ]}
          indexField={{ title: "id", fld: "id" }}
        />
      </div>
    </section>
  );
}

export default SumoIncidents;
