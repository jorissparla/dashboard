import Button from "elements/TWButton";
import { CloseIcon } from "elements/Icons";
import { Drawer } from "@material-ui/core";
import React from "react";
import TWCheckbox from "elements/TWCheckbox";
import TWListBox from "elements/TWListBox";
import TextInput from "elements/TextInput";
import { usePersistentState } from "../../../hooks";

const Filter = (props) => {
  const { open, onClose, onFilter, className, clearFilter, onhandleSetFilterActive = () => console.log, ...rest } = props;

  const initialValues = {
    customerName: "",
    tenantName: "",
    tenantVersion: "",
    farmName: "",
    isLive: false,
    csm: "",
    pm: "",
    temperature: "",
    lastupdated: "999",
    useproxy: false,
    showupcominggolives: false,
    golive_nrdays: -1,
  };

  const [values, setValues] = usePersistentState("filters", { ...initialValues });

  const handleClear = () => {
    setValues({ ...initialValues });
    onFilter && onFilter(initialValues);
    clearFilter();
    // onhandleSetFilterActive(false);
    // console.log()
  };

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues((values) => ({
      ...values,
      [field]: value,
    }));
  };

  function handleSetFarm(farm) {
    setValues((values) => ({ ...values, farmName: farm }));
  }
  function handleChangeLive(value) {
    setValues({ ...values, isLive: 1 - values.isLive });
  }
  function handleShowUpcomingLives() {
    setValues({ ...values, showupcominggolives: !values.showupcominggolives });
  }
  function handleChangeUseProxy(value) {
    setValues({ ...values, useproxy: 1 - values.useproxy });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ values });
    onhandleSetFilterActive(true);
    onFilter && onFilter(values);
  };

  const customerStatusOptions = ["", "NORMAL", "WATCH", "ALERT"];
  return (
    <Drawer anchor="right" className="w-full" onClose={onClose} open={open} variant="temporary">
      <div {...rest} className={` ml-6 flex flex-col ${className}`}>
        <div className="flex items-center justify-between py-3">
          <Button color="primary" onClick={handleSubmit}>
            Apply filters
          </Button>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={onClose} className="w-48" color="transp">
            <CloseIcon />
            Close
          </Button>
        </div>
        <div className="mt-4 border-t border-gray-100">
          <div className="">
            <div className="flex items-center">
              <div className="font-semibold text-2xl">Filter</div>
            </div>
            <div className="p-2">
              <div className="p-2">
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Customer name"
                    name="customerName"
                    onChange={(event) => handleFieldChange(event, "customerName", event.target.value)}
                    value={values.customerName}
                  />
                </div>

                <div className="m-2 px-2 py-1">
                  <div className=" py-1 ">
                    {/* <div className="text-sm">Shows only customers that are live</div> */}
                    <TWCheckbox value={values.useproxy} label="Show  customers with Proxy agreement" onChange={handleChangeUseProxy} />
                  </div>
                  <div className="font-semibold text-2xl text-gray-600 mb-2">Live</div>
                  {/* <div className="text-sm">Shows only customers that are live</div> */}
                  <TWCheckbox value={values.isLive} label="Show live customers" onChange={handleChangeLive} />
                </div>
                <div className="m-2 px-2 py-1">
                  <TWCheckbox value={values.showupcominggolives} label="Show Upcoming Go Lives (next 30 days)" onChange={handleShowUpcomingLives} />
                </div>
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Tenant Version"
                    name="tenantVersion"
                    onChange={(event) => handleFieldChange(event, "tenantVersion", event.target.value)}
                    value={values.tenantVersion}
                  />
                </div>
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Last Updated"
                    name="lastupdated"
                    onChange={(event) => handleFieldChange(event, "lastupdated", event.target.value)}
                    value={values.lastupdated}
                  />
                </div>
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Tenant name"
                    name="tenantName"
                    onChange={(event) => handleFieldChange(event, "tenantName", event.target.value)}
                    value={values.tenantName}
                  />
                </div>
                {/* <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Farm Name"
                    name="farmName"
                    onChange={(event) => handleFieldChange(event, "farmName", event.target.value)}
                    value={values.farmName}
                  />
                </div> */}
                <div className="m-2 px-2 py-1 mb-10">
                  <div className="font-semibold text-sm text-gray-600 ">Farm Name</div>
                  <TWListBox
                    items={["Frankfurt", "US-East-1", "Sydney", "US-Gov-West-1", "Tokyo"]}
                    onChange={handleSetFarm}
                    defaultValue={values.farmName}
                  />
                </div>
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Project Manager"
                    name="pm"
                    onChange={(event) => handleFieldChange(event, "pm", event.target.value)}
                    value={values.pm}
                  />
                </div>
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Customer Success Manager"
                    name="csm"
                    onChange={(event) => handleFieldChange(event, "csm", event.target.value)}
                    value={values.csm}
                  />
                </div>
                <div className="m-2 px-2 py-1">
                  <TextInput
                    className=""
                    label="Customer Temperature"
                    name="temperature"
                    placeholder="Normal, Alert, Critical..."
                    onChange={(event) => handleFieldChange(event, "temperature", event.target.value)}
                    value={values.temperature}
                  ></TextInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Filter;
