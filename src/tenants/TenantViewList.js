import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Modal, Backdrop, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { useQuery } from "react-apollo";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import classNames from "classnames";
import Spinner from "utils/spinner";
import { FilterFieldContext } from "../globalState/FilterContext";
import { DashBoardContext } from "../globalState/Provider";
import Loader from "../utils/Loader";
import EditTenantDetails from "./details/components/EditTenant";
import { ALL_TENANTS, QUERY_ALL_TENANT_DETAILS } from "./TenantQueries";
import { Main } from "./TenantStyledElements";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90vw",
    margin: "10px",
    backgroundColor: theme.palette.background.paper
  },
  live: {
    background: "rgb(46, 202, 19)",
    border: "5px solid rgba(46, 202, 19, 1)"
  },
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },
  watch: {
    background: "rgb(251, 221, 0) !important",
    border: "10px solid rgb(251, 221, 0) !important"
  },
  alert: {
    background: "rgb(229, 57, 53) !important",
    border: "10px solid rgb(229, 57, 53) !important"
  },

  tableheader: {
    fontFamily: "Poppins",
    fontSize: 18,
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: "white"
  },
  tablecell: {
    fontSize: "1rem"
  },
  tableheadernarrow: {
    fontFamily: "Poppins",
    fontSize: 18,
    width: 20
  },

  main: {
    display: "flex"
  },
  spaceFooter: {
    justifyContent: "space-between"
  },
  csm: {
    maxWidth: 120
  },
  oldVersion: {
    color: "red;",
    fontWeight: 600,
    fontFamily: "Poppins",
    fontSize: "1rem"
  },
  newerVersion: {
    fontFamily: "Poppins",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.12)",
      cursor: "pointer"
    }
  }
}));

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
export const FilterForm = ({ setSearchText, flip }) => {
  const { setFields, fields, clearFields } = useContext(FilterFieldContext);

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

  // console.log(fields);
  return (
    <form
      onSubmit={e => {
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
        onChange={e => setCustomer(e.target.value)}
        value={customer}
      />
      <TextField
        id="farm"
        name="farm"
        type="text"
        label="farm"
        placeholder="Farm"
        onChange={e => setFarm(e.target.value)}
        value={farm}
      />
      <TextField
        id="version"
        name="version"
        type="text"
        label="version"
        placeholder="version"
        onChange={e => setVersion(e.target.value)}
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

const tenantsByCustomer = (tenants, searchText) =>
  _.chain(tenants)
    .filter(o => o.customer.name !== "Infor")
    .filter(
      t =>
        t.customer.name.toUpperCase().includes(searchText.toUpperCase()) ||
        t.name.toUpperCase().includes(searchText.toUpperCase()) ||
        t.version.toUpperCase().includes(searchText.toUpperCase())
    )
    .sortBy(o => o.customer.name)

    .value();
const filterTenantsByCustomerFarmVersion = (tenants, fields, details) => {
  // console.log("filterTenantsByCustomerFarmVersion", fields);
  // const { customer = '', farm = '', version = '' } = fields;
  const {
    customerName = "",
    farmName = "",
    tenantVersion = "",
    tenantName = "",
    isLive = false,
    temperature = "",
    csm = "",
    pm = ""
  } = fields;
  console.log({ csm }, details, temperature);
  let filteredCustomerNames = null;
  if (details) {
    filteredCustomerNames = details
      .filter(detail => detail.temperature.toUpperCase().includes(temperature.toUpperCase()))
      .filter(detail => detail.csm.toUpperCase().includes(csm.toUpperCase()))
      .filter(detail => detail.pm.toUpperCase().includes(pm.toUpperCase()));
  }
  console.log({ filteredCustomerNames });

  const retValue = _.chain(tenants)
    .filter(o => o.customer.name !== "Infor")

    .filter(t => t.customer.name.toUpperCase().includes(customerName.toUpperCase()))
    .filter(t => t.farm.toUpperCase().includes(farmName.toUpperCase()))
    .filter(t => t.version.toUpperCase().includes(tenantVersion.toUpperCase()))
    .filter(t => t.name.toUpperCase().includes(tenantName.toUpperCase()))
    .filter(t => (isLive ? t.live === 1 : true))
    .sortBy(o => o.customer.name)
    .value();

  if (details) {
    return retValue.filter(t => filteredCustomerNames.find(cn => cn.customer.name === t.customer.name));
  } else return retValue;
};

const inforTenant = tenants => tenants.filter(o => o.customer.name === "Infor");

const TableHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: "rgb(0,0,0, 0.5)",
    color: theme.palette.common.white,
    // fontSize: '1rem',
    // fontWeight: 800,
    textTransform: "uppercase"
  },
  body: {
    fontSize: "1rem"
  }
}))(TableCell);

const TenantViewList = props => {
  const dbctx = React.useContext(DashBoardContext);
  let role = dbctx && dbctx.role ? dbctx.role : "Guest";
  const { setFields, fields, clearFields } = useContext(FilterFieldContext);
  const classes = useStyles();
  const [currentId, setCurrentId] = useState("");
  // const [showFilterDialog, toggleShowFilterDialog] = useState(false);
  const [isShowingDetails, toggleShowDetails] = useState(false);
  const [counter, setCounter] = useState(0);

  const applyFilter = values => {
    setFields(values);
  };

  const { data, loading } = useQuery(ALL_TENANTS);
  const { data: details, loading: detailsloading } = useQuery(QUERY_ALL_TENANT_DETAILS);

  if (loading || detailsloading) {
    return <Spinner />;
  }

  // if (loading || detailsloading) {
  //   return <Loader loading={loading} />;
  // }
  const { tenants, updatestatus, tenantlogs } = data;
  const { tenantcustomerdetails } = details;
  const { updatedAt } = updatestatus;
  const filteredTenants = filterTenantsByCustomerFarmVersion(tenants, fields, details.tenantcustomerdetails);
  // console.log("filterTenants", filteredTenants);
  const uniqueCustomers = filteredTenants
    .map(({ farm, customer: { name } }) => name)
    .filter((ten, i, all) => all.indexOf(ten) === i);
  return (
    <Paper style={{ margin: 5 }}>
      <Main
        onKeyDown={e => {
          // console.log(e, e.keyCode);
        }}
      >
        <Loader loading={loading} />
        <div>
          <div className={classes.flex}>
            <Table style={{ fontSize: "1rem" }}>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>

                  <TableHeaderCell className={classes.tableheader}>Customer</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader} style={{ width: 100 }}>
                    Farm
                  </TableHeaderCell>

                  <TableHeaderCell className={classes.tableheader} style={{ width: 100 }}>
                    PRD
                  </TableHeaderCell>
                  <TableHeaderCell>TRN</TableHeaderCell>
                  <TableHeaderCell>TST</TableHeaderCell>
                  <TableHeaderCell>DEV</TableHeaderCell>
                  <TableHeaderCell>DEM</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader}>PM</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader}>CSM</TableHeaderCell>
                  <TableHeaderCell className={classes.tableheader}>Comments</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueCustomers.map((customer, index) => {
                  const sub = filteredTenants.filter(o => o.customer.name === customer);
                  const ar = { PRD: "", TRN: "", TST: "", DEV: "", DEM: "" };
                  sub.map(tenantInstance => {
                    const type = tenantInstance.name.split("_")[1];
                    ar[type] = tenantInstance.version;
                  });
                  const live = sub[0].live === 1 ? true : false;
                  const customerid = sub[0].customerid;
                  const farm = sub[0].farm;
                  const tenantdetails = tenantcustomerdetails.filter(d => d.customerid === customerid)[0];
                  const temp = tenantdetails.temperature;
                  const avaclass = classNames({
                    [classes.alert]: temp === "ALERT" ? true : false,
                    [classes.watch]: temp === "WATCH" ? true : false,
                    [classes.live]: live,
                    [classes.notlive]: !live
                  });
                  if (tenantdetails.length) {
                  } else {
                  }
                  let isTen6 = ar["PRD"].indexOf("10.6") >= 0;
                  const posOfCEVersion = ar["PRD"].indexOf("2019.");
                  if (posOfCEVersion >= 0) {
                    isTen6 = isTen6 || ar["PRD"].slice(posOfCEVersion) < "2019.10";
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell
                        onClick={() =>
                          window.open(
                            "http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=" + customerid
                          )
                        }
                        className={classes.newerVersion}
                      >
                        {customerid}
                      </TableCell>
                      <TableCell>
                        <Avatar className={avaclass} alt="Author" title={temp}>
                          {live ? "Live" : ""}
                        </Avatar>
                      </TableCell>
                      <TableCell className={classes.tablecell}>{customer}</TableCell>
                      <TableCell className={classes.tablecell}>{farm}</TableCell>
                      {isTen6 ? (
                        <TableCell className={classes.oldVersion}>{ar["PRD"]}</TableCell>
                      ) : (
                        <TableCell className={classes.newerVersion}>{ar["PRD"]}</TableCell>
                      )}
                      <TableCell>{ar["TRN"]}</TableCell>
                      <TableCell>{ar["TST"]}</TableCell>
                      <TableCell>{ar["DEV"]}</TableCell>
                      <TableCell>{ar["DEM"]}</TableCell>
                      <TableCell className={classes.tablecell}>{tenantdetails.pm}</TableCell>
                      <TableCell className={classes.tablecell}>{tenantdetails.csm}</TableCell>
                      <TableCell className={classes.tablecell}>{tenantdetails.comments}</TableCell>
                      <TableCell>
                        {" "}
                        <MoreVertIcon
                          onClick={() => {
                            setCurrentId(customerid);
                            toggleShowDetails(true);
                          }}
                        ></MoreVertIcon>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            boxShadow:
              "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
          }}
        >
          {/* <SearchBar onChange={e => setSearchText(e)} /> */}
        </div>

        <Modal
          onClose={() => toggleShowDetails(false)}
          open={isShowingDetails}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <EditTenantDetails
            profile={tenantcustomerdetails.find(d => d.customerid === currentId)}
            onClose={() => toggleShowDetails(false)}
          />
        </Modal>
      </Main>
    </Paper>
  );
};

export default TenantViewList;
