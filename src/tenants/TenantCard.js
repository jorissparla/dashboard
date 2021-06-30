import { CardHeader, Divider, Switch } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { format, formatDistanceToNow } from "../utils/format";

import Button from "elements/TWButton";
import EditTenantDetails from "./details/components/EditTenant";
import ListIcon from "@material-ui/icons/List";
import { MUTATION_MARK_LIVE } from "./TenantMutations";
import { Mutation } from "@apollo/client/react/components";
import TWSwitch from "elements/TWSwitch";
import { UserContext } from "globalState/UserProvider";
import _ from "lodash";
import { addHours } from "date-fns";
import classNames from "classnames";
import { useMutation } from "@apollo/client";

export const TenantCard = ({
  classes,
  customer,
  customerid,
  tenants,
  tenantdetails,
  live,
  role = "Guest",
  onStatusChange = () => console.log("change"),
  infoClicked,
}) => {
  console.log(`classes`, classes);
  const [toggleMarkLive] = useMutation(MUTATION_MARK_LIVE);
  const [isLive, setLive] = useState(live);
  const [isOpen, setisOpened] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const userContext = useContext(UserContext);
  const { user, hasPermissions } = userContext;
  const { x } = useSpring({
    x: isOpen ? 0 : 100,
  });
  const props = useSpring({ opacity: isOpen ? 1 : 0 });
  const isTenantEditor = hasPermissions(user, ["TENANTEDIT", "ADMIN"]);
  // const isAdmin = hasPermissions(user, ['ADMIN']);

  let tenantcustomerdetail;
  if (customer !== "Infor" && tenantdetails) {
    tenantcustomerdetail = tenantdetails;
  } else {
    tenantcustomerdetail = {
      id: "",
      customer: {
        name: "",
      },
      customerid: "",
      golivedate: "",
      golivecomments: "",
      csm: "",
      pm: "",
      info: "",
      temperature: "NORMAL",
      useproxy: false,
    };
  }
  let golivedate = tenantcustomerdetail.golivedate;
  if (golivedate && golivedate !== "1568419200000" && golivedate !== "0") {
    golivedate = format(tenantcustomerdetail.golivedate, "MMM, dd, yyyy");
  } else golivedate = "Date is not known";
  const temp = tenantcustomerdetail.temperature;
  const max = _.maxBy(tenants, (t) => format(t.lastupdated, "yyyMMdd")).lastupdated;
  const max2 = formatDistanceToNow(max);
  if (customer === "Azteka Consulting GmbH") console.log(customer, { isLive }, live);
  const avaclass1 = classNames({
    [classes.alert]: temp === "ALERT" ? true : false,
    [classes.watch]: temp === "WATCH" ? true : false,
    [classes.live]: live,
    [classes.notlive]: !live,
  });
  const cl = `rounded-full h-16 w-16  p-3  flex items-center justify-center text-lg font-semibold shadow-lg`;
  const avaclass = classNames({
    [cl]: true,
    "bg-red-400 text-red-800": temp === "ALERT" ? true : false,
    "bg-yellow-200 text-yellow-800": temp === "WATCH" ? true : false,
    "bg-green-200 text-green-800": temp === "NORMAL" ? true : false,
  });

  const indexObj = {
    PRD: 1,
    TRN: 2,
    TST: 3,
    DEV: 4,
    DEM: 5,
  };
  let tags = tenants
    .map((t) => {
      const postfix = t.name.split("_")[1];
      const index = indexObj[postfix] || 999;
      const { tenant_status, operational_status, process_status } = t;
      let tag = "";
      let tooltip = "";
      let title = t.farm;
      if (tenant_status) {
        if (!(tenant_status === "active" && operational_status === "online" && process_status === "idle")) {
          tag = `${tenant_status[0].toUpperCase()}-${operational_status[0].toUpperCase()}-${process_status.slice(0, 2).toUpperCase()}`;
        }
        tooltip = `${tenant_status}-${operational_status}-${process_status}`;
      }
      return { index, ...t, tag, title, tooltip };
    })
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  if (customer === "Infor") {
    tags = tags.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  let farms = [];

  if (tenants.length) {
    tenants.forEach((tenant) => {
      const { farm } = tenant;
      if (!farms.includes(farm)) {
        farms = [...farms, farm];
      }
    });
  }
  // console.log(customer, tags);
  const baseTenantId = tenants && tenants.length && tenants.length > 0 ? tenants[0].name.split("_")[0] : "";
  // console.log(customer, tenants[0]);
  return (
    <>
      <div className={customer === "Infor" ? classes.card3 : classes.card}>
        <div className="pb-2 ">
          {/* <Header>
          <H2>{customer}</H2>

          <FavoriteBadge isVisible={live}>Live</FavoriteBadge>
        </Header> */}
          <CardHeader
            className={classes.header}
            avatar={
              // <Avatar className={live ? classes.live : classes.notlive} alt="Author">
              <div className={avaclass} alt="Author" title={temp}>
                {live ? "Live" : ""}
              </div>
            }
            // title={customer}
            title={
              <div title={customer} className=" text-xl font-semibold font-sans text-gray-600 overflow-hidden truncate ellipsis mr-2">
                {customer}
              </div>
            }
            disableTypography
            subheader={
              // <Typography variant="body2">Updated {max2} ago</Typography>
              <div className="flex items-center">
                <svg className="fill-current w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
                </svg>
                <span className="text-gray-600 text-sm font-sans">Updated {max2} ago</span>
              </div>
            }
          />
          <div className="mt-2 pt-1 flex w-full justify-between items-center text-gray-700 font-sans" color="textSecondary">
            {farms.map((farm) => (
              <span className=" py-0.5 px-2 text-gray-600 rounded  font-semibold mr-1">{farm}</span>
            ))}
            <span className="tracking-widest font-semibold text-blue-800 text-sm font-sans">{baseTenantId}</span>
          </div>
          <div className="font-sans mb-2">
            <div color="textSecondary" variant="subtitle2" className="text-sm font-sans text-gray-600">
              {tenantcustomerdetail.golivecomments.trim() ? (
                tenantcustomerdetail.golivecomments
              ) : (
                <span className={classes.descriptionblank}>Customer Information will be shown here</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-1 gap-y-1 mb-1">
            {tags.map(({ id, name, version, tooltip, tag, title }) => {
              let shortname = "";
              if (customer === "Infor") {
                shortname = name;
              } else shortname = name.split("_")[1];
              const color = shortname.endsWith("PRD")
                ? "bg-green-400 text-green-800 font-semibold"
                : shortname.endsWith("TRN")
                ? "bg-blue-500"
                : "bg-gray-600";
              return (
                <span
                  title={title}
                  style={{ fontSize: "10.5px" }}
                  key={id}
                  className={` px-1.5 py-1  ${color} tracking-wider text-center font-pop  shadow text-white   rounded`}
                >{`${shortname.toUpperCase()}:${version}`}</span>
              );
              {
                /* <Label key={id} color={color}>{`${shortname}:${version}`}</Label> */
              }
              {
                /* {tag && <Chip className={classes.tagtooltip} label={tooltip} />} */
              }
            })}
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div item className="max-w-md">
              <div className="font-sans font-semibold text-gray-600">PM</div>
              <div className="text-sm font-sans" variant="body2">
                {tenantcustomerdetail.pm ? tenantcustomerdetail.pm : "PM not entered"}
              </div>
            </div>
            <div item className="max-w-md">
              <div className="font-sans font-semibold text-gray-600">CSM</div>
              <div className="text-sm font-sans"> {tenantcustomerdetail.csm ? tenantcustomerdetail.csm : "CSM not entered"}</div>
            </div>
            <div item>
              <div className="font-sans font-semibold text-gray-600">Go Live Date</div>
              <div className="text-sm font-sans">{golivedate}</div>
            </div>
          </div>
        </div>
        <div className="p-2 flex justify-between items-center">
          <Button
            color="transp"
            onClick={() => window.open("http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=" + tenants[0].customerid)}
          >
            <ListIcon className={classes.filterButton} />
            Incidents
          </Button>
          <div className="relative inline-block text-left">
            <div>
              <span className="rounded-md shadow-sm">
                <Button color="transp" onClick={() => setShowStatus((prev) => !prev)}>
                  Status
                  <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </span>
            </div>
            {showStatus && (
              <div className="top-0 left-0 bottom-0 right-0 bg-gray-200 relative" type="button">
                <div style={{ left: "-100%" }} className=" absolute  mt-2 w-max-lg rounded-md shadow-lg">
                  {/* <div className="origin-bottom-left absolute right-0 mt-2 w-max-lg rounded-md shadow-lg"> */}
                  <div className="rounded-md bg-white shadow-xs w-full py-3">
                    <div className="py-1 px-10 text-gray-700">
                      <table>
                        <thead>
                          <tr className="font-semibold border-b border-gray-400">
                            <td className="px-2">Name</td>
                            <td className="px-2">Status</td>
                            <td className="px-2">Operational</td>
                            <td className="px-2">Process</td>
                            <td className="px-10">updated</td>
                          </tr>
                        </thead>
                        <tbody>
                          {tenants.map((t) => (
                            <tr key={t.name}>
                              <td className="text-center">
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-semibold leading-5 bg-teal-200 text-teal-800 text-sm">
                                  {t.name}
                                </span>
                              </td>
                              <td className="text-sm text-center">{t.tenant_status}</td>
                              <td className="text-sm text-center">{t.operational_status}</td>
                              <td className="text-sm text-center">{t.process_status}</td>
                              <td className="text-sm text-center">{format(addHours(parseInt(t.updatedAt), -2), "yyyy-MM-dd HH:mm")}</td>
                              <td className="text-sm text-center">
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end my-2 px-4">
                      <button
                        className="bg-gray-700 hover:bg-gray-500 leading-tight px-4 py-2 rounded shadow-md text-white"
                        onClick={() => setShowStatus(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* {isTenantEditor && ( */}
          <Button variant="outlined" color="primary" onClick={() => setisOpened(true)}>
            {isTenantEditor ? "Edit" : "View"}
          </Button>
          {/* )} */}
          {isTenantEditor && (
            <div className="mr-2">
              <TWSwitch
                value={live}
                onChange={() => {
                  // console.log("change" + tenants[0].customerid);
                  setLive((prev) => {
                    const input = {
                      live: 1 - prev,
                      number: tenants[0].customerid,
                    };
                    console.log(input);
                    toggleMarkLive({ variables: { input } });
                    onStatusChange();
                    return prev === 1 ? false : true;
                  });
                }}
              />
            </div>
            // <Mutation mutation={MUTATION_MARK_LIVE}>
            //   {(mutate) => (
            //     <Switch
            //       checked={live}
            //       onChange={() => {
            //         // console.log("change" + tenants[0].customerid);
            //         setLive((prev) => {
            //           const input = {
            //             live: 1 - prev,
            //             number: tenants[0].customerid,
            //           };
            //           // console.log(input);
            //           mutate({ variables: { input } });
            //           onStatusChange();
            //           return prev === 1 ? false : true;
            //         });
            //       }}
            //       value="checkedB"
            //       color="secondary"
            //       inputProps={{ "aria-label": "primary checkbox" }}
            //     />
            //   )}
            // </Mutation>
          )}
        </div>
      </div>
      {/* <Modal
        onClose={() => setisOpened(false)}
        open={isOpen}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      > */}
      {isOpen && (
        <animated.div style={props}>
          <div className="inset-0 flex z-50 bg-gray-700  bg-opacity-50 absolute w-2/3 ">
            <EditTenantDetails profile={tenantcustomerdetail} onClose={() => setisOpened(false)} isTenantEditor={isTenantEditor} />
          </div>
        </animated.div>
      )}
      {/* </Grid> */}
      {/* </Modal> */}
    </>
  );
};
