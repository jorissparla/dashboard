import { useMutation, useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { differenceInCalendarDays } from "date-fns";
import TWButton from "elements/TWButton";
import _ from "lodash";
import Modal from "ModalWrapper";
import TenantLogs from "pages/TenantLogList";
import React, { useContext, useEffect, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import Spinner from "utils/spinner";
import FavoriteBadge from "../elements/Badge";
import { FilterFieldContext, useFilterField } from "../globalState/FilterContext";
import { DashBoardContext } from "../globalState/Provider";
//import format from 'date-fns/format';
import { format, formatDistanceToNow } from "../utils/format";
import FancyFilter from "./new/FancyFilter";
import { CREATE_AUDIT_MUTATION } from "./Query";
import { TenantCard } from "./TenantCard";
import TenantCustomerDetailsForm from "./TenantCustomerDetailsForm";
import { ALL_TENANTS, QUERY_ALL_TENANT_DETAILS, TENANT_NOTE } from "./TenantQueries";
import "./tenants.css";

const styles = (theme) => ({
  root: {
    width: "90vw",
    margin: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  itemtitle: {
    fontFamily: "Raleway",
    fontSize: 20,
    fontWeight: 800,
  },

  pos: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    minWidth: 390,
    width: 380,
    // height: 350,
    display: "flex",
    flexDirection: "column",

    justifyContent: "space-between",
    // backgroundImage: 'linear-gradient(to right bottom, rgb(128, 216, 255), white)',
    padding: "0 0.25rem",
    margin: "0.5rem",
    overflow: "visible",
    backgroundImage: "linear-gradient(to right bottom,rgba(29, 161, 242, 0.4), white)",
    borderRadius: "0.25rem",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)",
  },
  card2: {
    minWidth: 275,
    margin: 10,
  },
  card3: {
    minWidth: "28%",
    margin: 10,
    background: "transparent",
    backgroundImage: "linear-gradient(to right bottom,rgba(29, 161, 242, 0.4), white)",
  },
  chip: {
    margin: theme.spacing(1),
    marginBottom: 2,
    // background: 'white',
    // border: '1px solid black',
    borderRadius: 5,
    // color: 'black',
    width: 137,
    border: "1px solid rgb(117, 117, 117)",
    color: "rgb(117, 117, 117)",
    background: "transparent",
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

  description: {
    paddingBottom: 2,
    maxHeight: 50,
    overflow: "hidden",
  },
  descriptionblank: {
    paddingBottom: 2,
    maxHeight: 50,
    overflow: "hidden",
    color: "transparent",
  },
  header: {
    fontWeight: 500,
    fontSize: "18px",
    letterSpacing: "-0.06px",
    lineHeight: "24px",
    minHeight: 60,
    padding: 0,
    overflow: "hidden",
  },
  filterButton: {
    marginLeft: "auto",
  },
  notlive: {
    background: "transparent",
    border: "5px solid rgba(46, 202, 19, 1)",
  },
  tags: {
    paddingTop: 2,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    marginBottom: 2,
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  tagsContent: {
    display: "flex",
    flexDirection: "column",
  },
  tagtooltip: {
    background: "black",
    color: "white",
  },
  avatar: {
    margin: 10,
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
    background: "#eee",
  },
  flex2: {
    display: "flex",
    flexWrap: "wrap",
  },
  flexBot: {
    display: "flex",
    justifySelf: "flex-end",
  },
  bigAvatar: {
    width: 100,
    height: 50,
    borderRadius: "50%",
    justifyContent: "center",
    paddingTop: "15px",
    fontWeight: 800,
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500],
  },
  blueAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#81D4FA",
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
});

const CloseButton = styled.button`
  position: relarive;
  top: 0;
  right: 0;
  background: transparent;
  font-size: 48px;
  font-weight: 100;
  border: none;
  align-self: flex-end;
  align-self: center;
`;

function TenantNote() {
  const { data, loading } = useQuery(TENANT_NOTE);
  if (loading) return <div />;
  const { updatestatus } = data;
  if (updatestatus.note && updatestatus.note.length > 1) {
    return <span className="marquee">{updatestatus.note}</span>;
  }
  return <div />;
}

export const FilterForm = ({ flip }) => {
  const { setFields, clearFields } = useContext(FilterFieldContext);

  const [customer, setCustomer] = useState("");
  const [farm, setFarm] = useState("");
  const [version, setVersion] = useState("");

  function setAllFields() {
    setFields({ customer, farm, version });
    // flip();
  }

  function clearAllFields() {
    setCustomer("");
    setFarm("");
    setVersion("");
    clearFields();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setAllFields();
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Filter</h1> <CloseButton onClick={() => flip()}>&times;</CloseButton>
      </div>
      <TextField
        id="customer.name"
        name="customer.name"
        type="text"
        label="Customer Name"
        placeholder="Customer Name"
        onChange={(e) => setCustomer(e.target.value)}
        value={customer}
      />
      <TextField id="farm" name="farm" type="text" label="farm" placeholder="Farm" onChange={(e) => setFarm(e.target.value)} value={farm} />
      <TextField
        id="version"
        name="version"
        type="text"
        label="version"
        placeholder="version"
        onChange={(e) => setVersion(e.target.value)}
        value={version}
      />
      <Button
        style={{ marginTop: 10 }}
        variant="contained"
        color="primary"
        onClick={() => setAllFields()}
        // type="submit"
      >
        Filter
      </Button>
      <Button style={{ marginTop: 10 }} variant="contained" color="secondary" onClick={() => clearAllFields()}>
        Clear
      </Button>
    </form>
  );
};

const applySimpleFilter = (days) => (v) => {
  const biggerThanX = differenceInCalendarDays(Date.parse(new Date().toString()), parseInt(v.lastupdated)) <= days;
  return biggerThanX;
  // return tenants.filter(biggerThanX);
};

const filterTenantsByCustomerFarmVersion = (tenants, fields, details) => {
  const {
    customerName = "",
    farmName = "",
    tenantVersion = "",
    tenantName = "",
    isLive = false,
    temperature = "",
    csm = "",
    pm = "",
    lastupdated = "999",
  } = fields;

  let filteredCustomerNames = null;
  if (details) {
    filteredCustomerNames = details
      .filter((detail) => detail.temperature.toUpperCase().includes(temperature.toUpperCase()))
      .filter((detail) => detail.csm.toUpperCase().includes(csm.toUpperCase()))
      .filter((detail) => detail.pm.toUpperCase().includes(pm.toUpperCase()));
  }

  const f = applySimpleFilter(parseInt(lastupdated));
  const retValue = _.chain(tenants)
    .filter((o) => o.customer.name !== "Infor")

    .filter((t) => t.customer.name.toUpperCase().includes(customerName.toUpperCase()))
    .filter((t) => t.farm.toUpperCase().includes(farmName.toUpperCase()))
    .filter((t) => t.version.toUpperCase().includes(tenantVersion.toUpperCase()))
    .filter((t) => t.name.toUpperCase().includes(tenantName.toUpperCase()))
    .filter((t) => (isLive ? t.live === 1 : true))
    .filter(f)
    .sortBy((o) => o.customer.name)
    .value();

  if (details) {
    return retValue.filter((t) => filteredCustomerNames.find((cn) => cn.customer.name === t.customer.name));
  } else return retValue;
};

// const inforTenant = tenants => tenants.filter(o => o.customer.name === 'Infor');
const inforTenantByFarm = (tenants, farm) => tenants.filter((o) => o.customer.name === "Infor" && o.farm === farm);

const TenantList = (props) => {
  const dbctx = React.useContext(DashBoardContext);
  let role = dbctx && dbctx.role ? dbctx.role : "Guest";
  const [createAudit] = useMutation(CREATE_AUDIT_MUTATION);
  const { setFields, fields } = useFilterField(); // useContext(FilterFieldContext);
  const { classes } = props;
  const [setSearchText] = useState("");
  const [showFilterDialog, toggleShowFilterDialog] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [isShowingDetails, toggleShowDetails] = useState(false);
  const [counter, setCounter] = useState(0);
  const keysPressed = useMultiKeyPress();
  const happyPress = areKeysPressed(["Shift", "C"], keysPressed); //false; //useKeyPress('C');

  function areKeysPressed(keys = [], keysPressed = []) {
    const required = new Set(keys);
    for (var elem of keysPressed) {
      required.delete(elem);
    }
    return required.size === 0;
  }
  const { x } = useSpring({
    x: showFilterDialog ? 15 : 0,
    config: config.wobbly,
  });
  const flip = () => toggleShowFilterDialog(!showFilterDialog);

  const applyFilter = (values) => {
    setFields(values);
  };
  if (happyPress) {
    // clearFields();
  }

  useEffect(() => {
    const input = {
      username: dbctx.fullname,
      page: "/tenantlist",
      linkid: null,
      type: "TenantList",
    };
    createAudit({ variables: { input } }).then(console.log);
  }, [createAudit, dbctx.fullname]);

  const { data, loading } = useQuery(ALL_TENANTS);
  const { data: details, loading: detailsloading } = useQuery(QUERY_ALL_TENANT_DETAILS);

  if (loading || detailsloading) {
    return <Spinner />;
  }

  const { tenants, updatestatus, tenantlogs } = data;
  const { tenantcustomerdetails } = details;
  const { updatedAt } = updatestatus;
  const filteredTenants = filterTenantsByCustomerFarmVersion(tenants, fields, details.tenantcustomerdetails);
  // console.log(applySimpleFilter(filteredTenants));
  const uniqueCustomers = filteredTenants.map(({ customer: { name } }) => name).filter((ten, i, all) => all.indexOf(ten) === i);
  return (
    <div className="bg-gray-100 h-screen">
      <animated.div
        style={{
          width: x.interpolate((x) => `${100 - x}vw`),
        }}
      >
        <TenantListHeader
          updatedAt={updatedAt}
          applyFilter={applyFilter}
          toggleShowLogs={() => setShowLogs(!showLogs)}
          toggleFilter={() => toggleShowFilterDialog(!showFilterDialog)}
          tenants={tenants}
        />
        {/* <div className="mt-8 mx-4 px-4 rounded-lg ">Filter</div> */}
        <div className="flex flex-wrap" onKeyDown={() => {}}>
          {uniqueCustomers.map((customer, index) => {
            const sub = filteredTenants.filter((o) => o.customer.name === customer);
            const liveCust = sub[0].live === 1 ? true : false;
            const customerid = sub[0].customerid;
            const tenantdetails = tenantcustomerdetails.filter((d) => d.customerid === customerid);
            if (tenantdetails.length) {
            } else {
            }
            if (customer === "Azteka Consulting GmbH") console.log("👍", customer, liveCust, sub);
            return (
              <TenantCard
                key={index}
                classes={classes}
                customer={customer}
                customerid={customerid}
                tenants={sub}
                tenantdetails={tenantdetails.length > 0 ? tenantdetails[0] : null}
                role={role}
                live={liveCust}
                onStatusChange={() => setCounter(counter + 1)}
                infoClicked={() => toggleShowDetails(true)}
              />
            );
          })}
          {/* <TenantCard classes={classes} customer="Infor" tenants={inforTenant(tenants)} /> */}
        </div>
        <div style={{ display: "flex" }}>
          <TenantCard classes={classes} customer="Infor" tenants={inforTenantByFarm(tenants, "Frankfurt")} />
          <TenantCard classes={classes} customer="Infor" tenants={inforTenantByFarm(tenants, "Us-East-1")} />
          <TenantCard classes={classes} customer="Infor" tenants={inforTenantByFarm(tenants, "Sydney")} />
        </div>
      </animated.div>
      <animated.div
        style={{
          width: x.interpolate((x) => `${x}vw`),
          display: "flex",
          padding: x.interpolate((x) => `${x}px`),
          flexDirection: "column",
          boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        }}
      >
        {/* <SearchBar onChange={e => setSearchText(e)} /> */}
        <FilterForm setSearchText={setSearchText} flip={flip} />
      </animated.div>
      <Modal on={showLogs} toggle={() => setShowLogs(!showLogs)} height={80}>
        <TenantLogs tenantlogs={tenantlogs} />
      </Modal>
      <Modal on={isShowingDetails} toggle={() => toggleShowDetails(!isShowingDetails)} height={80}>
        <TenantCustomerDetailsForm closeForm={() => toggleShowDetails(false)} />
      </Modal>
    </div>
  );
};

export const TenantListHeader = ({ updatedAt, tenants, toggleShowLogs, applyFilter }) => {
  const max = _.maxBy(tenants, (t) => format(t.lastupdated, "yyyyMMdd")).lastupdated;
  // const [, setShowLast7DaysUpdated] = useState(false);
  let tenantcustomersWithFarm = _.countBy(
    tenants.map(({ farm, tenant }) => ({ farm, tenant })),
    "farm"
  );

  const listOfCustomerAndFarm = tenants.filter((item) => item.customerid !== null).map(({ customerid, farm }) => ({ customerid, farm }));
  const custFarms = _.countBy(_.uniqWith(listOfCustomerAndFarm, _.isEqual), "farm");
  const liveCustomers = _.uniqWith(
    tenants.map((t) => ({ customer: t.customer.name, live: t.live })),
    _.isEqual
  ).filter((t) => t.live === 1);
  const totalCustomers = Object.entries(custFarms).reduce((count, item) => count + item[1], 0);

  // const nrOfLiveCustomers = uniqueCustomers.filter(t => t.live).length;
  const totalTenants = Object.entries(tenantcustomersWithFarm).reduce((count, item) => count + item[1], 0);
  return (
    <div className="flex flex-col justify-between shadow-lg bg-white p-2 m-2">
      <div></div>
      <div className="flex justify-between tracking-widest  ">
        <div className="flex font-sans tracking-normal mb-2">
          <div className="text-sm px-2 items-center flex font-semibold py-0.5 rounded-lg bg-gray-300 mr-4 text-gray-600">
            {updatedAt ? `Last check:  ${formatDistanceToNow(updatedAt)} ago,  Last change made ${format(max, "dd MMM yyyy")} ` : "not Saved yet"}
          </div>
          <TWButton variant="outlined" color="transp" onClick={toggleShowLogs}>
            Logs
          </TWButton>
          <span className="tracking-wide  mx-4 font-sans font-semibold text-2xl text-gray-600">{` Multitenant customers `}</span>
          <div className=" flex items-start">
            <div className="absolute flex items-center h-5"></div>
          </div>
          <TenantNote />
        </div>
        <FancyFilter onFilter={applyFilter} />
        {/* <Button variant="contained" onClick={toggleFilter}>
          Filter
        </Button> */}
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 2,
          marginTop: 10,
          letterSpacing: "0.2rem",
        }}
      >
        <div className="flex flex-col items-center  text-gray-600 mr-4">
          <span className="font-semibold font-pop">Tenants</span>
          <span className="text-4xl font-bold text-gray-600">{totalTenants}</span>
        </div>
        {Object.entries(tenantcustomersWithFarm).map((item) => {
          const [farmName, number] = item;
          const text = `${item[0]} : ${item[1]}`;
          return (
            <FavoriteBadge title={farmName} key={text} isVisible={true} color="bg-blue-400">
              {number}
            </FavoriteBadge>
          );
        })}
        <div className="flex flex-col items-center  text-gray-600 mx-4">
          <span className="font-semibold font-pop">Customers</span>
          <span className="text-4xl font-bold text-gray-600">{totalCustomers}</span>
        </div>
        {Object.entries(custFarms).map((item) => {
          const [farmName, number] = item;
          const text = `${item[0]} : ${item[1]}`;
          return (
            <FavoriteBadge title={farmName} key={text} isVisible={true} color="bg-green-400">
              {number}
            </FavoriteBadge>
          );
        })}
        <div className="flex flex-col items-center  text-gray-600 mx-4">
          <span className="font-semibold font-pop">Live</span>
          <span className="text-4xl font-bold text-green-600">{liveCustomers.length}</span>
        </div>
      </div>
    </div>
  );
};

function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  useEffect(() => {
    function downHandler({ key }) {
      setKeyPressed(keysPressed.add(key));
    }

    const upHandler = ({ key }) => {
      keysPressed.delete(key);
      setKeyPressed(keysPressed);
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keysPressed]); // Empty array ensures that effect is only run on mount and unmount

  return keysPressed;
}

// function useKeyPress(targetKey) {
//   // State for keeping track of whether key is pressed
//   const [keyPressed, setKeyPressed] = useState(false);

//   // If pressed key is our target key then set to true
//   function downHandler({ key }) {
//     if (key === targetKey) {
//       setKeyPressed(true);
//     }
//   }

//   // If released key is our target key then set to false
//   const upHandler = ({ key }) => {
//     if (key === targetKey) {
//       setKeyPressed(false);
//     }
//   };

//   // Add event listeners
//   useEffect(() => {
//     window.addEventListener('keydown', downHandler);
//     window.addEventListener('keyup', upHandler);
//     // Remove event listeners on cleanup
//     return () => {
//       window.removeEventListener('keydown', downHandler);
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, []); // Empty array ensures that effect is only run on mount and unmount

//   return keyPressed;
// }

export default withStyles(styles)(TenantList);
