import { useQuery } from "@apollo/client";
import SearchBar from "common/SearchBar";
import Button from "elements/TWButton";
import { usePersistentState } from "hooks";
import _ from "lodash";
import { DataCell, HeaderCell } from "pages/WorklistSimple";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import Spinner from "utils/spinner";
import { DashBoardContext } from "../globalState/Provider";
import Loader from "../utils/Loader";
import CustomerHistory from "./CustomerHistory";
import EditTenantDetails from "./details/components/EditTenant";
import { QUERY_ALL_TENANT_DETAILS } from "./TenantQueries";

const TenantViewList = (props) => {
  const dbctx = React.useContext(DashBoardContext);

  let role = dbctx && dbctx.role ? dbctx.role : "Guest";

  const [showNotReady, setShowNotReady] = usePersistentState("not ready", false);
  const [sortedByCSM, setSortedByCSM] = usePersistentState("sort by csm", false);
  const [showLive, setShowLive] = usePersistentState("customers live", false);
  const [currentId, setCurrentId] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [showFilterDialog, toggleShowFilterDialog] = useState(false);
  const [isShowingDetails, toggleShowDetails] = useState(false);
  const [isShowingEvents, toggleShowEvents] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  const { data: details, loading: detailsloading } = useQuery(QUERY_ALL_TENANT_DETAILS);
  const tenantProps = useSpring({ opacity: isShowingDetails ? 1 : 0 });

  useEffect(() => {
    if (details) {
      const { tenantcustomerdetails } = details;

      setCustomerDetails(tenantcustomerdetails);
      let allCustomers;
      if (!sortedByCSM) {
        allCustomers = _.chain(tenantcustomerdetails)
          .filter(
            (o) =>
              o.customer.name !== "Infor" &&
              (o.customer.name.toLowerCase().includes(searchText.toLowerCase()) || o.csm.toLowerCase().includes(searchText.toLowerCase()))
          )
          .sortBy((o) => o.customer.name)
          .value();
      } else {
        allCustomers = _.chain(tenantcustomerdetails)
          .filter((o) => o.customer.name !== "Infor" && o.customer.name.toLowerCase().includes(searchText.toLowerCase()))
          .sortBy((o) => o.csm)
          .value();
      }

      let x = [];
      allCustomers.map((o) => {
        const found = x.find((n) => n.customerid === o.customerid);
        if (!found) {
          x.push(o);
        }
        return 0;
      });
      // if (showLive) {
      //   x = x.filter((t) => t.live === "Yes");
      // }
      x = x
        .map((currcustomer) => {
          const sub = currcustomer.tenants || [];
          const ar = { PRD: "", TRN: "", TST: "", DEV: "", DEM: "" };
          sub.map((tenantInstance) => {
            const type = tenantInstance.name.split("_")[1];
            ar[type] = tenantInstance.version;
          });
          const live = sub && sub.length > 0 ? (sub[0].live === 1 ? "Yes" : "No") : "No";
          const customerid = currcustomer.customerid;
          const farm = sub && sub.length > 0 ? sub[0].farm : "";
          const customer = currcustomer.customer.name;
          const temp = currcustomer.temperature;
          return { ...currcustomer, ...ar, customerid, live, temp, customer, farm };
        })
        .filter((c) => (showLive ? c.live === "Yes" : true));
      setFilteredCustomers(x);
    }
  }, [details, sortedByCSM, showNotReady, searchText, showLive]);

  if (detailsloading) {
    return <Spinner />;
  }

  const doChange = async () => {
    setShowNotReady(!showNotReady);
  };
  const doChangeSort = async () => {
    setSortedByCSM(!sortedByCSM);
  };
  // console.log(uniqueCustomers);

  const handleSelect = (id) => {
    console.log(id);
    toggleShowDetails((prev) => !prev);
    setCurrentId(id);
  };
  return (
    <div style={{ margin: 5, background: "#EEE" }}>
      <Loader loading={detailsloading} />
      <div>
        <div className="rounded shadow-lg bg-white p-2 m-2" style={{ marginBottom: 10, padding: 20 }}>
          <div className="flex items-center ">
            <div className="ml-12 flex items-center ">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" checked={showNotReady} onChange={doChange} />
                <span className="ml-2">{`${showNotReady ? "Uncheck to show all customers" : "Check to show all customers that are not ready"}`}</span>
              </label>
            </div>
            <div className="ml-12 flex items-center ">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-pink-500" checked={sortedByCSM} onChange={doChangeSort} />
                <span className="ml-2">{`${sortedByCSM ? "Uncheck to sort by customer name" : "Check to sort by CSM"}`}</span>
              </label>
            </div>
            <div className="ml-12 flex items-center ">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-green-500" checked={showLive} onChange={() => setShowLive((prev) => !prev)} />
                <span className="ml-2">Show Live Customers</span>
              </label>
            </div>
          </div>
          <SearchBar hintText="type part of customer name or csm" onChange={(v) => setSearchText(v)} className="bg-teal-200" />
        </div>
        <div className="p-2 rounded-lg shadow-lg bg-white mx-2">
          <TenantTable data={filteredCustomers} onSelect={handleSelect} />
        </div>
        {isShowingDetails && (
          <animated.div style={tenantProps}>
            <div className="inset-0 flex z-50 bg-gray-700  bg-opacity-50 absolute w-5/6 ">
              <EditTenantDetails
                profile={customerDetails.find((d) => d.customerid === currentId)}
                onClose={() => toggleShowDetails((prev) => false)}
                isTenantEditor={true}
              />
            </div>
          </animated.div>
        )}
        {isShowingEvents && (
          <animated.div style={tenantProps}>
            <div className="inset-0 flex z-50 bg-gray-700  bg-opacity-50 absolute w-5/6 ">
              <CustomerHistory />
            </div>
          </animated.div>
        )}
      </div>

      {/* <Modal
        onClose={() => toggleShowDetails(false)}
        open={isShowingDetails}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <EditTenantDetails
          profile={filteredCustomers.find((d) => d.customerid === currentId)}
          onClose={() => toggleShowDetails(false)}
          isTenantEditor={true}
        />
      </Modal> */}
    </div>
  );
};

export const ActionCell = ({ value, fn }) => (
  <td className="p-2 font-sans text-sm font-semibold text-blue-700 ">
    <Button
      className="w-24"
      color="teal"
      onClick={() => {
        console.log(value);
        fn(value);
      }}
    >
      {value}
    </Button>
  </td>
);

export const LiveCell = ({ value }) => {
  if (value === "Yes") {
    return (
      <div className="bg-green-200 text-green-800 flex font-semibold items-center justify-center rounded-full text-sm h-10 w-10 p-3 shadow-lg">
        Live
      </div>
    );
  } else {
    return <div></div>;
  }
};

const TenantTable = ({ data, replaceField = null, mark = false, onSelect }) => {
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
    { title: "ID", fld: "customerid", ac: true },
    { title: "Live", fld: "live", live: true },
    // { title: "Live", fld: "live" },
    { title: "Customer", fld: "customer" },
    { title: "Farm", fld: "farm" },
    { title: "PRD", fld: "PRD" },
    { title: "TRN", fld: "TRN" },
    { title: "TST", fld: "TST" },
    { title: "DEV", fld: "DEV" },
    { title: "DEM", fld: "DEM" },
    { title: "PM", fld: "pm" },
    { title: "CSM", fld: "csm" },
    { title: "comments", fld: "comments" },
  ];
  if (replaceField && replaceField.name && replaceField.toField) {
    fields = replaceList(fields, replaceField);
  }

  const handleAction = (value) => {
    console.log(value);
    onSelect(value);
  };
  return (
    <div className="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
      <table className="w-full text-left table-collapse">
        <thead>
          <tr className="">
            {fields.map((field) => (
              <HeaderCell key={field.fld}>{field.title}</HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody className="align-baseline">
          {!data || data.length === 0 ? (
            <tr>
              <DataCell>No Data..</DataCell>
            </tr>
          ) : (
            data?.map((items) => (
              <tr key={items.customerid}>
                {fields.map((field, index) => {
                  if (field.ac) {
                    return <ActionCell key={index} value={items.customerid} fn={onSelect} />;
                  } else if (field.live) {
                    return <LiveCell key={index} value={items[field.fld]} />;
                  } else if (field.display) {
                    return (
                      <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
                      </svg>
                    );
                  } else return <DataCell key={`${items.customerid}${index}}`}>{items[field.fld]}</DataCell>;
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TenantViewList;
