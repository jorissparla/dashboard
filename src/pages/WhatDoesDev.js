import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import AutoComplete from "../elements/AutoComplete";
import TWButton from "../elements/TWButton";
import { usePersistentState } from "../hooks";
import { Defect } from "../stats/DefectType";
import Spinner from "../utils/spinner";
import { UserContext } from "./../globalState/UserProvider";
import { NoData } from "./NoData";
import { DataCell, HeaderCell, HyperLinkCell, HyperLinkCellRed } from "./WorklistSimple";
import GenericFilter from "../elements/GenericFilter";
import _ from "lodash";
import { useSpring, animated } from "react-spring";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const ALL_DEFECTS = gql`
  query ALL_DEFECTS {
    openDefects {
      defect_id
      summary
      company_name
      Status
      Developer
      groupOwner
      ageDays
      ageCompleted
      severity_name
      severity_id
      hascloud
    }
    allDefectQueues {
      groupname
      groupset
    }
  }
`;
const ALL_QUEUES = gql`
  query ALL_QUEUES {
    allDefectQueues {
      groupname
      groupset
    }
  }
`;

const WhatDoesDevWrapper = () => {
  // animation

  const { user } = React.useContext(UserContext);
  const [name, setName] = usePersistentState("DefectGroupOwner", owner || "");
  const [groupsSelected, setGroupsSelected] = usePersistentState("OG_filter", []);
  const [showFilter, setShowFilter] = useState(false);
  const owner = user ? (user.fullname ? user.fullname : "") : "";
  const [severities, setSeverities] = usePersistentState("defectseverities", [2, 3]);
  const [cloudOnly, setCloudOnly] = usePersistentState("defectCloudOnly", false);
  const { data, loading } = useQuery(ALL_QUEUES);
  const animationFilterProps = useSpring({ opacity: showFilter ? 1 : 0 });
  if (loading) return <Spinner />;
  let defectQueues = data.allDefectQueues.map((item) => item.groupname);

  function changeSevChecked(sev) {
    const x = severities.findIndex((s) => s === sev);
    let results = [];
    if (x > -1) {
      // found, let's remove
      results = severities.filter((s) => s !== sev);
    } else {
      results = [...severities, sev];
    }
    setSeverities(results);
  }

  const severityList = [
    { id: 4, name: "Critical Production Service Unusable", unassigned: 1, resolved: 5 },
    { id: 3, name: "Major Impact", unassigned: 1, resolved: 15 },
    { id: 2, name: "Medium Impact", unassigned: 7, resolved: 45 },
    { id: 1, name: "Standard", unassigned: 14, resolved: 90 },
  ];

  function isSevChecked(id) {
    return severities.findIndex((s) => s === id) > -1;
  }

  function changeGroupsSelected(values) {
    setGroupsSelected(values);
  }
  function clearGroupsSelected() {
    setGroupsSelected([]);
  }
  function handleDeleteGroupSelected(item) {
    let newValue = groupsSelected.filter((sel) => sel !== item);
    setGroupsSelected(newValue);
  }
  return (
    <div className="bg-gray-100 h-screen">
      {showFilter && (
        <motion.nav animate={showFilter ? "open" : "closed"} variants={variants}>
          <GenericFilter open={true} onClose={() => setShowFilter((prev) => !prev)} onClear={clearGroupsSelected}>
            Filter here
            <DefectQueuesFilterList defectQueues={data.allDefectQueues} onChange={changeGroupsSelected} values={groupsSelected} />
          </GenericFilter>
        </motion.nav>
      )}

      <div className="flex items-center mb-4">
        <TWButton color="pink" onClick={() => setShowFilter((prev) => !prev)}>
          Filter
        </TWButton>
        <span className="mx-4 text-lg font-sans font-semibold">Essential Defect List </span>{" "}
        {/* <AutoComplete
          disabled={false}
          support={defectQueues}
          onChangeValue={(e) => setName(e)}
          value={name}
          searchTextFromStart={false}
        ></AutoComplete> */}
        <div className="ml-8 flex items-center">
          <div className="flex items-center flex-no-wrap">
            <span className="text-gray-700 font-semibold mr-2">severity</span>
            <div className="mt-2 ml-4 flex items-center">
              {severityList.map((sev) => (
                <div key={sev.id} className="mr-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={isSevChecked(sev.id)} onChange={() => changeSevChecked(sev.id)} />
                    <span className="ml-2">{sev.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-12 flex items-center ">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" checked={cloudOnly} onChange={() => setCloudOnly((prev) => !prev)} />
              <span className="ml-2">Cloud Only</span>
            </label>
          </div>
        </div>
      </div>
      {groupsSelected.length > 0 ? (
        <div>
          {groupsSelected.map((g, index) => (
            <SelectedBadge key={index} handleDelete={() => handleDeleteGroupSelected(g)}>
              {g}
            </SelectedBadge>
          ))}
        </div>
      ) : (
        <div>No groups selected, please press Filter to select groups</div>
      )}
      <WhatDoesDev name={name} severities={severities} cloudOnly={cloudOnly} severityList={severityList} groups={groupsSelected} />
    </div>
  );
};

const SelectedBadge = ({ children, index, handleDelete = () => null }) => (
  <span
    key={index}
    className="inline-flex items-center my-0.5 mx-2 px-3 py-1.5 rounded-lg text-xs font-sans font-medium leading-4 bg-blue-200 text-blue-800"
  >
    {children}
    <button
      type="button"
      onClick={handleDelete ? handleDelete : () => null}
      className="flex-shrink-0 ml-1.5 inline-flex text-gray-500 focus:outline-none focus:text-gray-700"
    >
      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </span>
);

const WhatDoesDev = ({ name, severities, cloudOnly, severityList, groups }) => {
  const { data, loading } = useQuery(ALL_DEFECTS);
  useEffect(() => {}, [data, name]);
  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return (
      <NoData>
        <p>No data - contact your system admin.</p>
      </NoData>
    );
  }

  let defectsx = data.openDefects;
  let defBase = Defect(defectsx);
  //.filterOwnerGroup(name).filterSeverities(severityList).filterCloudOnly(cloudOnly);
  let [avgUnassigned, unassigned] = defBase
    .init()
    // .filterOwnerGroup(name)
    .filterGroups(groups)
    .filterDev("Unassigned, ")
    .sort("ageDays", "D")
    .addTargetMet(severityList, "unassigned")
    .filterCloudOnly(cloudOnly)
    .filterSeverities(severities)
    .getAvgAndData();
  let [avgResolved, resolved] = defBase
    .init()
    // .filterOwnerGroup(name)
    .filterGroups(groups)
    .filterSeverities(severities)
    .filterCloudOnly(cloudOnly)
    .addTargetMet(severityList, "resolved")
    .getAvgAndData();

  const replaceFieldUnassigned = { name: "Developer", title: "OwnerGroup", toField: "groupOwner" };
  console.log({ unassigned });
  return (
    <div className="px-2 pt-2 grid grid-cols-2 gap-x-2 gap-y-2">
      <Widget
        data={unassigned}
        title={`Response Target - Unassigned defects - avg. age ${avgUnassigned} days `}
        replaceField={replaceFieldUnassigned}
        mark={true}
      />
      <Widget data={resolved} title={`Resolution Time Target– Open Defects - avg. age ${avgResolved} days`} mark={true} />
      {/* <DefectTable data={defects} /> */}
    </div>
  );
};

export const Widget = ({ data = [], title, mark = false, replaceField }) => {
  const len = data.length;
  const MAX_LEN = 10;
  const [currPage, setCurrPage] = useState(len > 0 ? 1 : 0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const nrPages = len > 0 ? Math.floor((len - 1) / MAX_LEN + 1) : 0;
  const handleNextPage = () => {
    if (currPage < nrPages) setCurrPage((old) => old + 1);
  };
  const handlePrevPage = () => {
    if (currPage > 1) setCurrPage((old) => old - 1);
  };
  useEffect(() => {
    if (data?.length > 0) {
      setCurrPage(1);
    }
  }, [data]);
  useEffect(() => {
    setPrevDisabled(currPage <= 1);
    setNextDisabled(currPage >= nrPages || nrPages === 0);
  }, [currPage]);
  return (
    <div className="p-2 rounded-lg shadow-lg bg-white">
      <h1 className={`flex justify-items-center py-1 font-semibold items-center ${mark ? "text-red-700" : "text-gray-700"}`}>
        {title} - ({len} )
        <div className="flex-1 flex justify-between sm:justify-end">
          <span>
            page {currPage} of {nrPages}
          </span>

          <TWButton onClick={handlePrevPage} color="pink" disabled={prevDisabled}>
            Prev
          </TWButton>

          <TWButton onClick={handleNextPage} color="pink" disabled={nextDisabled}>
            Next
          </TWButton>
        </div>
      </h1>
      {data.length === 0 ? (
        <h2>No {title} incidents </h2>
      ) : (
        <DefectTable data={data.slice((currPage - 1) * MAX_LEN, currPage * MAX_LEN - 1)} mark={mark} replaceField={replaceField} mark={mark} />
      )}
    </div>
  );
};

const DefectTable = ({ data, replaceField = null, mark = false }) => {
  function replaceList(fields, replaceField) {
    let replacing = [];
    fields.forEach((item) => {
      if (item.title === replaceField.name) {
        replacing = [...replacing, { title: replaceField.title, fld: replaceField.toField }];
      } else {
        replacing = [...replacing, item];
      }
    });
    return replacing;
  }
  let fields = [
    { title: "Defect", fld: "defect_id", hl: true },
    { title: "Developer", fld: "Developer" },
    { title: "Severity", fld: "severity_name" },
    { title: "Status", fld: "Status" },
    { title: "Company", fld: "company_name" },
    { title: "Summary", fld: "summary" },
    { title: "Age", fld: "ageDays" },
  ];
  if (replaceField && replaceField.name && replaceField.toField) {
    fields = replaceList(fields, replaceField);
  }
  return (
    <div className="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
      <table className="w-full text-left table-collapse">
        <thead>
          <tr>
            {fields.map((field) => (
              <HeaderCell key={field.fld}>{field.title}</HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody className="align-baseline">
          {!data || data.length === 0 ? (
            <tr>
              <DataCell>No Defects..</DataCell>
            </tr>
          ) : (
            data?.map((defect) => (
              <tr key={defect.defect_id}>
                {/* {isStatusToMark(defect.status) ? (
                  <HyperLinkCellRed value={defect.incident} linkText={defect.defect_id} />
                ) : (
                  <HyperLinkCell value={defect.defect_id} linkText={defect.defect_id} />
                )} */}
                {fields.map((field, index) => {
                  if (field.hl) {
                    if (defect.targetMet) {
                      return (
                        <HyperLinkCell
                          key={`defectid${defect.defect_id}${index}}`}
                          value={defect.defect_id}
                          linkText={defect.defect_id}
                          linkPrefix="https://support.infor.com/espublic/EN/AnswerLinkDotNet/SoHo/defects/SoHoPrintDefect_Custom.aspx?DefectID="
                        />
                      );
                    } else {
                      return (
                        <HyperLinkCellRed
                          key={`defectid${defect.defect_id}${index}}`}
                          value={defect.defect_id}
                          linkText={defect.defect_id}
                          linkPrefix="https://support.infor.com/espublic/EN/AnswerLinkDotNet/SoHo/defects/SoHoPrintDefect_Custom.aspx?DefectID="
                        />
                      );
                    }
                  } else return <DataCell key={`${defect.defect_id}${index}}`}>{defect[field.fld]}</DataCell>;
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const DefectQueuesFilterList = ({ defectQueues = [], onChange = () => console.log("change"), values = [] }) => {
  const [selectedGroupNames, setSelectedGroupNames] = useState(values);
  const [selectedDomains, setSelectedDomains] = useState(["Technology"]);
  // let currentGroupSet = "";
  const groupedQueues = _.chain(defectQueues)
    .sortBy((o) => o.groupset)
    .groupBy(function (g) {
      return g.groupset;
    })
    .map((o) => o)
    .value()
    .sort((x, y) => (x.length > y.length ? -1 : 1));

  function onHandleCheckItem(item) {
    let newItems = selectedGroupNames;
    if (selectedGroupNames.findIndex((s) => s === item) > -1) {
      // Remove
      newItems = selectedGroupNames.filter((name) => name === item);
    } else {
      newItems = [...selectedGroupNames, item];
    }
    setSelectedGroupNames(newItems);
    onChange(newItems);
  }

  function onHandleDomainCheck(item) {
    console.log({ item });
    let newDomains = selectedDomains;
    let newItems = selectedGroupNames;
    let queuesToHandle = defectQueues.filter((g) => g.groupset === item).map((item) => item.groupname);
    console.log({ queuesToHandle });
    if (selectedDomains.findIndex((d) => d === item) > -1) {
      // clear everything
      newDomains = selectedDomains.filter((name) => name !== item);
      newItems = selectedGroupNames.filter((name) => !queuesToHandle.includes(name));
    } else {
      newDomains = [...selectedDomains, item];
      // add everything
      newItems = [...selectedGroupNames, ...queuesToHandle];
    }
    setSelectedGroupNames(newItems);
    setSelectedDomains(newDomains);
    onChange(newItems);
  }

  function isDomainChecked(domain) {
    return selectedDomains.findIndex((s) => s === domain) > -1;
  }
  function isValueChecked(item) {
    return selectedGroupNames.findIndex((s) => s === item) > -1;
  }
  console.log({ selectedDomains });
  return (
    <div className="h-full">
      <span className="text-gray-700">Queues</span>
      <div className="mt-2 grid col-gap-2 grid-cols-3 grid-rows-smaller " style={{ height: "80%" }}>
        {groupedQueues.map((queue, index) => {
          return (
            <div key={queue[0].groupset} className="border rounded-lg border-blue-100 min-h-96">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  onChange={() => onHandleDomainCheck(queue[0].groupset)}
                  className="form-checkbox text-green-600"
                  checked={isDomainChecked(queue[0].groupset)}
                />
                <span className="font-bold py-3">{queue[0].groupset}</span>
              </label>
              {queue.map((item) => (
                <div key={item.groupname}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => onHandleCheckItem(item.groupname)}
                      checked={isValueChecked(item.groupname)}
                    />
                    <span className="ml-2">{item.groupname}</span>
                  </label>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatDoesDevWrapper;
