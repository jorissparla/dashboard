import { useMutation } from "@apollo/client";
import { colors } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import Button from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { format } from "utils/format";
import { MUTATION_UPDATE_DETAIL } from "./../../TenantQueries";
import TemperatureSlider from "./TemperatureSlider";

const EditTenantDetails = (props) => {
  const { profile, className, onClose, onView, isTenantEditor = false, ...rest } = props;

  const [values, setValues] = useState({
    csm: profile.csm || "",
    pm: profile.pm || "",
    customerid: profile.customerid,
    golivedate: format(profile.golivedate, "yyyy-MM-dd"),
    golivecomments: profile.golivecomments,
    info: profile.info,
    temperature: profile.temperature,
    comments: profile.comments,
    proxyUser: true,
  });
  console.log({ profile });
  const [updateTenantDetailsMutation] = useMutation(MUTATION_UPDATE_DETAIL);
  const handleChange = (event) => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };

  const [proxyUser, setProxyUser] = useState(true);

  const alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = values;
    delete x.proxyUser;
    const result = await updateTenantDetailsMutation({ variables: { input: x } });
    console.log(result);
    onClose();
    alert.setMessage("Saving content...");
    // setOpenSnackbar(true);
  };

  const handleTemperatureChange = (value) => {
    setValues({ ...values, temperature: value });
  };

  const handleTChange = (e) => {
    handleTemperatureChange(e.target.value);
  };
  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const TempIsChecked = (v) => v === values.temperature;
  return (
    <div {...rest} className="bg-white  px-4 font-sans right-0 w-2/3 flex h-full fixed z-50 shadow-lg rounded  flex-col">
      <form className="mt-12 ml-4" onSubmit={handleSubmit}>
        {/* <CardHeader title={`Details for ${profile.customer.name}"`} /> */}
        <div className="mt-5 py-4">
          {isTenantEditor && (
            <Button type="submit" color="teal" variant="contained">
              Save Changes
            </Button>
          )}
          <Button onClick={onClose} size="small">
            <CloseIcon />
            Close
          </Button>
        </div>
        <div className="text-lg font-semibold font-sans p-2">{`Details for ${profile.customer.name}"`}</div>
        <hr className="bg-grey-100 mb-2" />
        <div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 space-y-1 sm:col-span-2">
              <label for="pm" className="block text-sm font-medium leading-5 text-gray-700">
                Project Manager
              </label>
              <input
                className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                name="pm"
                placeholder="Please specify name of Project Manager"
                label="Project Manager"
                onChange={handleChange}
                value={values.pm}
              />
            </div>

            <div className="col-span-3 space-y-1 sm:col-span-2">
              <label for="pm" className="block text-sm font-medium leading-5 text-gray-700">
                Customer Success Manager
              </label>
              <input
                className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                name="csm"
                placeholder="Please specify name of Customer Success Manager"
                label="Customer Success Manager"
                onChange={handleChange}
                value={values.csm}
              />
            </div>

            <div className="col-span-3 space-y-1 sm:col-span-2">
              <input
                className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                fullWidth
                type="date"
                defaultValue="2019-12-12"
                label="Go live date"
                name="golivedate"
                onChange={handleChange}
                value={values.golivedate}
                variant="outlined"
              />
            </div>
            <div className="col-span-3 space-y-1 sm:col-span-2">
              <label for="pm" className="block text-sm font-medium leading-5 text-gray-700">
                Go Live Comments
              </label>
              <input
                className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                name="golivecomments"
                placeholder="Go Live Comments"
                onChange={handleChange}
                value={values.golivecomments}
              />
            </div>
            <div className="col-span-3 col-start-1 space-y-1 sm:col-span-2">
              <label for="pm" className="block text-sm font-medium leading-5 text-gray-700">
                Customer Comments
              </label>
              <textarea
                className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                name="comments"
                onChange={handleChange}
                // multiline
                rows="8"
                value={values.comments}
              />
            </div>
            <div className="col-span-3 col-start-1 space-y-1 sm:col-span-2 ">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-purp" checked={proxyUser} onChange={() => setProxyUser((prev) => !prev)} />
                <span className="ml-2">Proxy User agreement signed</span>
              </label>
            </div>
            <div className="col-span-3 col-start-1 space-y-1 sm:col-span-2">
              <div className="px-4">
                <TemperatureSlider initialValue={profile.temperature} onChange={handleTemperatureChange} />
              </div>
            </div>
          </div>
        </div>
        {/* <Divider /> */}
        {/* <hr className="bg-grey-100 mt-2" /> */}
      </form>
      {/* <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} /> */}
    </div>
  );
};

EditTenantDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
};

export default EditTenantDetails;
