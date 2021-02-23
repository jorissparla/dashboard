import { useMutation } from "@apollo/client";
import CloseIcon from "@material-ui/icons/Close";
import Button from "elements/TWButton";
import { TWSelectMenu } from "elements/TWSelectMenu";
import { useAlert } from "globalState/AlertContext";
import React, { useEffect, useState } from "react";
import { format } from "utils/format";
import { MUTATION_UPDATE_DETAIL } from "./../../TenantQueries";

function EditTenantDetails(props) {
  const { profile, className, onClose, onView, ...rest } = props;
  console.log(props);
  return (
    <div {...rest} className="bg-white  px-4 font-sans right-0 w-2/3 flex h-full fixed z-50 shadow-lg rounded  flex-col">
      <EditTenantDetailsWrapped {...props} />
    </div>
  );
}

export const EditTenantDetailsWrapped = (props) => {
  const { profile, onClose, isTenantEditor = true } = props;
  const [values, setValues] = useState({ ...profile });
  useEffect(() => {
    if (profile) {
      setValues({
        csm: profile?.csm || "",
        pm: profile?.pm || "",
        customerid: profile.customerid,
        golivedate: format(profile.golivedate, "yyyy-MM-dd"),
        golivecomments: profile.golivecomments,
        info: profile.info,
        temperature: profile.temperature,
        comments: profile.comments,
        useproxy: true,
      });
    }
  }, [profile]);
  const [updateTenantDetailsMutation] = useMutation(MUTATION_UPDATE_DETAIL);
  const handleChange = (event) => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };
  const [useproxy, setProxyUser] = useState(profile.useproxy);
  const handleToggleProxy = () => {
    const newproxyValue = !useproxy;
    setValues({
      ...values,
      useproxy: newproxyValue,
    });
    setProxyUser(() => newproxyValue);
  };

  const alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let useproxyVal = useproxy ? 1 : 0;
    let x = { ...values };
    // delete x.useproxy;

    await updateTenantDetailsMutation({ variables: { input: x } });
    onClose();
    alert.setMessage("Saving content...");
    // setOpenSnackbar(true);
  };

  const handleTemperatureChange = (value) => {
    setValues({ ...values, temperature: value });
  };

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  return (
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
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-3 row-start-1 space-y-1 sm:col-span-2">
            <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
              Project Manager
            </label>
            <input
              className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              name="pm"
              type="text"
              placeholder="Please specify name of Project Manager"
              label="Project Manager"
              onChange={handleChange}
              value={values.pm}
            />
          </div>

          <div className="col-span-3 row-start-2 space-y-1 sm:col-span-2">
            <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
              Customer Success Manager
            </label>
            <input
              className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              name="csm"
              type="text"
              placeholder="Please specify name of Customer Success Manager"
              label="Customer Success Manager"
              onChange={handleChange}
              value={values.csm}
            />
          </div>

          <div className="col-span-3 row-start-3 space-y-1 sm:col-span-2">
            <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
              Go Live Date
            </label>
            <input
              className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              type="date"
              defaultValue="2019-12-12"
              label="Go live date"
              name="golivedate"
              onChange={handleChange}
              value={values.golivedate}
              variant="outlined"
            />
          </div>
          <div className="col-span-3 row-start-4 space-y-1 sm:col-span-3">
            <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
              Go Live Comments
            </label>
            <input
              className="form-input flex-grow block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              name="golivecomments"
              placeholder="Go Live Comments"
              type="text"
              onChange={handleChange}
              value={values.golivecomments}
            />
          </div>
          <div className="col-span-3 row-start-5 space-y-1 sm:col-span-3">
            <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
              Customer Comments
            </label>
            <textarea
              className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none"
              name="comments"
              onChange={handleChange}
              // multiline
              rows="8"
              value={values.comments}
            />
          </div>
          <div className="col-span-3 row-start-6 space-y-1 sm:col-span-2 ">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-purp" checked={useproxy} onChange={() => handleToggleProxy()} />
              <span className="ml-2">Proxy User agreement signed</span>
            </label>
          </div>
          <div className="col-span-3 row-start-7 space-y-1 sm:col-span-2">
            <div className="px-4">
              <TWSelectMenu
                items={["NORMAL", "WATCH", "ALERT"]}
                value={values.temperature}
                label="Customer Temperature"
                onChange={handleTemperatureChange}
              />
            </div>
          </div>
          {/* <div className="col-span-3 row-start-7 space-y-1 sm:col-span-2">
            <div className="px-4">
              <TemperatureSlider initialValue={profile.temperature} onChange={handleTemperatureChange} />
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
};

export default EditTenantDetails;
