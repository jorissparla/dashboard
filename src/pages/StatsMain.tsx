import React, { useState } from "react";
import BacklogTableNewStyle from "stats/BacklogTableNewStyle";
import { Backlog } from "stats/BacklogType";
import { useLocalStorage } from "../utils/useLocalStorage";
import LoadingDots from "./../utils/LoadingDots";

export function useParam(name = "", initialValue = 0) {
  return useLocalStorage(name, initialValue, false);
}
export function useParams(clean = false) {
  const [C_AWAITINGCUSTOMER] = useLocalStorage("C_AWAITINGCUSTOMER", 6, clean);
  const [C_AWAITINGINFOR] = useLocalStorage("C_AWAITINGINFOR", 1, clean);
  const [C_RESEARCHING] = useLocalStorage("C_RESEARCHING", 3, clean);
  const [C_NEW] = useLocalStorage("C_NEW", 1, clean);
  const [C_MT] = useLocalStorage("C_MT", 5, clean);
  const [N_AWAITINGCUSTOMER] = useLocalStorage("N_AWAITINGCUSTOMER", 6, clean);
  const [N_RESEARCHING] = useLocalStorage("N_RESEARCHING", 10, clean);
  const [N_AWAITINGINFOR] = useLocalStorage("N_AWAITINGINFOR", 2, clean);
  const [N_NEW] = useLocalStorage("N_NEW", 1, clean);
  const [N_SOLUTIONPROPOSED] = useLocalStorage("N_SOLUTIONPROPOSED", 30, clean);
  const [N_AGING] = useLocalStorage("N_AGING", 90, clean);
  const [C_AGING] = useLocalStorage("C_AGING", 30, clean);
  const [N_MAJORIMPACT] = useLocalStorage("N_MAJORIMPACT", 2, clean);
  return {
    C_AWAITINGCUSTOMER,
    N_AWAITINGCUSTOMER,
    C_RESEARCHING,
    N_RESEARCHING,
    C_AWAITINGINFOR,
    N_AWAITINGINFOR,
    C_NEW,
    C_MT,
    N_NEW,
    N_SOLUTIONPROPOSED,
    N_AGING,
    C_AGING,
    N_MAJORIMPACT,
  };
}

interface Props {
  classes?: any;
  data: any;
  isCloud: boolean;
  owner?: string;
  products?: string[];
  actionNeeded?: boolean;
  filterValues?: any;
}

const RELEASE_FILTER = ["Baan 4", "Baan 5", "LN FP5", "LN FP6", "LN FP7", "LN FP3", "10.2", "10.3"];

export const StatsMain: React.FC<Props> = ({ data, owner = "", products = ["LN"], filterValues }) => {
  const params = useParams();
  // const allKB = data.allKB;
  // console.log(allKB);

  const blBase = new Backlog(data.everything, data.accounts);
  const sev12notrestored = blBase
    .notServicedRestored()
    .hasSeverity(["Major Impact", "Production Outage / Critical Application halted"])
    .notStatus(["Solution Proposed"])
    .getData();
  const critical = blBase
    .init()
    .severity("Production Outage / Critical Application halted")
    .notServicedRestored()
    .notStatus(["Solution Proposed"])
    .getData();

  const [loading, setLoading] = useState(true);
  const [avgAgeSupport, all] = blBase
    .init()
    .notStatus(["Awaiting Development", "Solution Proposed", "Solution Pending Maintenance"])
    .sort("dayssincelastupdate", "D")
    .getAvgAndData();
  const [avgAge, allOver30] = blBase
    .init()
    .notStatus(["Solution Proposed", "Solution Pending Maintenance"])
    .daysSinceCreated(30)
    .sort("daysSinceCreated", "D")
    .getAvgAndData();
  const all_dev = blBase.init().status("Awaiting Development").sort("dayssincelastupdate", "D").getData();
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // const sev1notrestored = data.critical.filter((item: any) => !item.service_restored_date);

  // customers that have a MT deployment type
  const multitenantcustomers = data.multitenantcustomers;

  // List of customers that have extended maintenance
  const extendedmaintenance = data.extendedMaintenance;

  const extIncidents = [...all, ...all_dev]
    .filter((item: any) => RELEASE_FILTER.includes(item.releasename))
    .map((item: any) => ({
      ...item,
      extended: extendedmaintenance.find((customer: any) => customer.customerid === item.customerid) ? "Yes" : "No",
    }))
    .sort((a: any, b: any) => a.daysSinceCreated - b.daysSinceCreated);

  const extIncidentsWithDev = extIncidents.filter((item: any) => item.status === "Awaiting Development");
  // console.log('🤷‍♂️🤷‍♂️', extIncidents);
  // console.log('mt customers', multitenantcustomers);
  const mtincidents = all
    .filter(
      (inc: any) => multitenantcustomers.find((cust: any) => parseInt(cust.customerid) === inc.customerid)
      // inc.customerid === 60028554
    )
    .filter((x: any) => x.Tenant !== "Multi-Tenant");

  const multitenant = new Backlog(data.multitenant).isMT().dayssincelastupdate(params.C_MT).sort("dayssincelastupdate", "D").getData();

  const awaiting_customer = blBase
    .init()
    .status("Awaiting Customer")
    .dayssincelastupdate(params["N_AWAITINGCUSTOMER"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const awaiting_infor = blBase
    .init()
    .status("Awaiting Infor")
    .dayssincelastupdate(params["N_AWAITINGINFOR"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const researching = blBase.init().status("Researching").dayssincelastupdate(params["N_RESEARCHING"]).sort("dayssincelastupdate", "D").getData();
  const infor = blBase
    .init()
    // .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .customername("Infor ")
    .notStatus(["Solution Proposed", "Solution Pending Maintenance", "Awaiting Development"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const wait = blBase
    .init()
    // .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .notStatus(["Solution Proposed", "Solution Pending Maintenance", "Awaiting Development"])
    .sort("dayssincelastupdate", "D")
    .fieldNotNull("awaitcount")
    .sort("awaitcount", "D")
    .getData();
  const on_hold = blBase.init().status("On Hold by customer").invalid_onhold_date().sort("dayssincelastupdate", "D").getData();
  console.log({ on_hold });
  const aging = blBase
    .init()
    .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .daysSinceCreated(params["N_AGING"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const agingCloud = blBase
    .init()
    .hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"])
    .Deployment("Cloud")
    .daysSinceCreated(params["C_AGING"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const aging_dev = blBase.init().hasStatus(["Awaiting Development"]).daysSinceCreated(90).sort("dayssincelastupdate", "D").getData();
  const major_impact = blBase
    .init()
    .severity("Major Impact")
    .notServicedRestored()
    .notStatus(["Solution Proposed"])
    .dayssincelastupdate(params["N_MAJORIMPACT"])
    .sort("dayssincelastupdate", "D")
    .getData();

  const escalated = blBase
    .init()
    // .region("EMEA")
    .escalated()
    .addEscalatedDays()
    .notStatus(["Solution Proposed", "Solution Pending Maintenance"])
    .sort("dayssincelastupdate", "D")
    .addManager()
    .getData();
  const pendingmaintenance = blBase
    .init()
    // .region("EMEA")
    .hasStatus(["Solution Pending Maintenance"])
    .invalid_activity_date()
    .sort("dayssincelastupdate", "D")
    .addManager()
    .getData();

  const cloudops = blBase
    .init()
    // .region("EMEA")
    .statusContains("task")
    .sort("dayssincelastupdate", "D")
    .getData();
  const new_inc = blBase
    .init()
    // .region("EMEA")
    // .escalated()
    .status("New")
    .dayssincelastupdate(params["N_NEW"])
    .sort("dayssincelastupdate", "D")
    .getData();
  const callbacks = blBase.init().status("Awaiting Infor").sort("dayssincelastupdate", "D").getData();

  const incorrectOwnergroups = blBase.init().incorrectOwnerGroup().getData();

  return (
    <>
      {loading && <LoadingDots />}
      <div className="w-full mx-4">
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={multitenant}
          title="Multitenant"
          description={`All Incidents open for our MT customers not updated > ${params.C_MT} days`}
          actionHeader={true}
        />

        <BacklogTableNewStyle
          filterValues={filterValues}
          additionalFields={["ownergroup"]}
          data={incorrectOwnergroups}
          title="Incorrect Owner Group"
          description="Incorrect Owner Group"
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          additionalFields={["managername", "daysEscalated"]}
          data={escalated}
          title="Escalated"
          description="All Incidents escalated"
        />

        <BacklogTableNewStyle
          filterValues={filterValues}
          data={sev12notrestored}
          title="Critical/Major Not restored"
          description="All Incidents with a severity of 'Production Outage / Major Impact' without a restored date"
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={wait}
          additionalFields={["awaitcount"]}
          title="Awaiting counts"
          description={`All Incidents with more than 5 Awaiting Customer Events`}
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={pendingmaintenance}
          title="Pending Maintenance"
          description="All Incidents Solution Pending Maintenance without a valid activity date "
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={extIncidentsWithDev}
          additionalFields={["releasename", "extended"]}
          title="Extended Maintenance Check- Awaiting Development"
          description="All Awaiting Development Incidents open for customers logging on a version that has extended maintenance"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={mtincidents}
          additionalFields={["Deployment", "Tenant", "release"]}
          title="Multitenant customer incidents"
          description="All Incidents open for our MT not logged as multi tenant"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={extIncidents}
          additionalFields={["releasename", "extended"]}
          title="Extended Maintenance Check"
          description="All Incidents open for customers logging on a version that has extended maintenance"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={data.sev1notrestored}
          title="Critical"
          description="All Incidents with a severity of 'Production Outage / Critical Application halted'"
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={on_hold}
          // data={data.on_hold}
          title="On Hold"
          description="All Incidents with a status of On Hold By Customer with no or an Expired Activity date"
          actionHeader={true}
        />

        <BacklogTableNewStyle
          filterValues={filterValues}
          // data={data.awaiting_customer}
          data={awaiting_customer}
          additionalFields={["ownergroup"]}
          title="Awaiting customer"
          description={`All Incidents with a status of Awaiting Customer not updated for more than ${params["N_AWAITINGCUSTOMER"]} days `}
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          // data={data.researching}
          data={researching}
          title="Researching"
          description={`Incidents with status 'Researching' Last updated  ${params["N_RESEARCHING"]} days or more`}
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          // data={data.awaiting_infor}
          data={awaiting_infor}
          title="Awaiting Infor"
          description={`Incidents with status 'Awaiting Infor' Last updated  ${params["N_AWAITINGINFOR"]} days or more`}
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          // data={data.callbacks}
          data={callbacks}
          title="Callbacks/Awaiting Infor"
          description="All callbacks and Incidents with status 'Awaiting Infor'"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          // data={data.major_impact}
          data={major_impact}
          title="Major Impact"
          description={`Incidents with severity 'Major Impact' Last updated ${params["N_MAJORIMPACT"]} days or more`}
          actionHeader={true}
          includeservicerestored={true}
        />

        <BacklogTableNewStyle
          filterValues={filterValues}
          data={aging}
          // data={data.aging}
          title="Aging- Support"
          description={`Incidents older than ${params["N_AGING"]}  days`}
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={agingCloud}
          // data={data.aging}
          title="Aging- Support - Cloud"
          description={`Cloud Incidents older than ${params["C_AGING"]}  days`}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={aging_dev}
          // data={data.aging_dev}
          title="Aging- Development"
          description="Incidents older than 90 days - Development Backlog"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={new_inc}
          // data={data.new}
          title="New Incidents"
          description={`Incidents with status 'New' not updated for more than  ${params["N_NEW"]} days`}
          actionHeader={true}
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          // data={data.cloudops}
          data={cloudops}
          title="All CloudOps"
          description="All Incidents with a CloudOps Specific status (Task....)"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={infor}
          // data={infor}
          additionalFields={["contactname"]}
          title="Infor"
          description="All Support Backlog logged on Infor Account"
        />
        <BacklogTableNewStyle filterValues={filterValues} data={data.active} title="Active" description="All Active Support Backlog" />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={all}
          subtitle={` age ${avgAgeSupport} days`}
          title={`All  `}
          description="All Support Backlog"
        />
        <BacklogTableNewStyle
          filterValues={filterValues}
          data={allOver30}
          subtitle={` age ${avgAge} days`}
          title={`All `}
          description="Aged over 30"
        />
      </div>{" "}
    </>
  );
};
