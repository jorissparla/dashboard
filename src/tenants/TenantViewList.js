import { Avatar, Backdrop, Grid, Modal, Paper, Switch, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import classNames from "classnames";
import { usePersistentState } from "hooks";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Spinner from "utils/spinner";
import { DashBoardContext } from "../globalState/Provider";
import Loader from "../utils/Loader";
import EditTenantDetails from "./details/components/EditTenant";
import { TenantChecked } from "./TenantChecked";
import { QUERY_ALL_TENANT_DETAILS } from "./TenantQueries";
import { Main } from "./TenantStyledElements";
import { DataCell, HeaderCell, HyperLinkCell, HyperLinkCellRed } from "pages/WorklistSimple";
import Button from "elements/TWButton";
import { animated, useSpring } from "react-spring";
import SearchBar from "common/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    margin: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  live: {
    background: "rgb(46, 202, 19)",
    border: "5px solid rgba(46, 202, 19, 1)",
  },
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  watch: {
    background: "rgb(251, 221, 0) !important",
    border: "10px solid rgb(251, 221, 0) !important",
  },
  alert: {
    background: "rgb(229, 57, 53) !important",
    border: "10px solid rgb(229, 57, 53) !important",
  },

  tableheader: {
    fontFamily: "Poppins",
    fontSize: 18,
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: "white",
  },
  tablecell: {
    fontSize: "1rem",
  },
  tableheadernarrow: {
    fontFamily: "Poppins",
    fontSize: 18,
    width: 20,
  },

  main: {
    display: "flex",
  },
  spaceFooter: {
    justifyContent: "space-between",
  },
  csm: {
    maxWidth: 120,
  },
  oldVersion: {
    color: "red;",
    fontWeight: 600,
    fontFamily: "Poppins",
    fontSize: "1rem",
  },
  newerVersion: {
    fontFamily: "Poppins",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.12)",
      cursor: "pointer",
    },
  },
}));

const TableHeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: theme.palette.common.white,
    // fontSize: '1rem',
    // fontWeight: 800,
    textTransform: "uppercase",
  },
  body: {
    fontSize: "1rem",
  },
}))(TableCell);

const TenantViewList = (props) => {
  const dbctx = React.useContext(DashBoardContext);

  let role = dbctx && dbctx.role ? dbctx.role : "Guest";

  const [showNotReady, setShowNotReady] = usePersistentState("not ready", false);
  const [sortedByCSM, setSortedByCSM] = usePersistentState("sort by csm", false);
  const [showLive, setShowLive] = usePersistentState("customers live", false);
  const classes = useStyles();
  const [currentId, setCurrentId] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [showFilterDialog, toggleShowFilterDialog] = useState(false);
  const [isShowingDetails, toggleShowDetails] = useState(false);
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
      if (showLive) {
      }

      let x = [];
      allCustomers.map((o) => {
        const found = x.find((n) => n.customerid === o.customerid);
        if (!found) {
          x.push(o);
        }
        return 0;
      });
      x = x.map((currcustomer) => {
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
      });
      if (showLive) {
        x = x.filter((t) => t.live === "Yes");
      }
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
            <Grid item xs={4}>
              <FormControlLabel
                control={<Switch value={showNotReady} checked={showNotReady} onChange={doChange} />}
                label={`${showNotReady ? "Uncheck to show all customers" : "Check to show all customers that are not ready"}`}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={<Switch value={sortedByCSM} checked={sortedByCSM} onChange={doChangeSort} />}
                label={`${sortedByCSM ? "Uncheck to sort by customer name" : "Check to sort by CSM"}`}
              />
            </Grid>
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
            <div className="inset-0 flex z-50 bg-gray-700  bg-opacity-50 absolute w-2/3 ">
              <EditTenantDetails
                profile={customerDetails.find((d) => d.customerid === currentId)}
                onClose={() => toggleShowDetails((prev) => false)}
                isTenantEditor={true}
              />
            </div>
          </animated.div>
        )}
        {/* 
          <div className="flex font-sans">
            <Table style={{ fontSize: "1rem", background: "#fff" }}></Table>
          </div> */}
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
              <DataCell>No Defects..</DataCell>
            </tr>
          ) : (
            data?.map((items) => (
              <tr key={items.customerid}>
                {fields.map((field, index) => {
                  if (field.ac) {
                    return <ActionCell key={index} value={items.customerid} fn={onSelect} />;
                  } else if (field.live) {
                    return <LiveCell key={index} value={items[field.fld]} />;
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
