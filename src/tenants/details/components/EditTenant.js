import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import Button from "elements/TWButton";
import CloseIcon from "@material-ui/icons/Close";
import HTMLEditor from "common/HTMLEditor";
import { MUTATION_UPDATE_DETAIL } from "tenants/TenantMutations";
import { TWSelectMenu } from "elements/TWSelectMenu";
import { format } from "utils/format";
import { toSizeString } from "pages/TenantStorage";
import { useAlert } from "globalState/AlertContext";

const QUERY_STORAGE_USAGE = gql`
  query storageByCustomer($name: String) {
    storageByCustomer(name: $name) {
      id
      date
      customer
      size
    }
    currentTenantStorageByCustomer(name: $name) {
      id
      date
      customer
      tenant
      size
    }
  }
`;

function EditTenantDetails({ isTenantEditor, ...props }) {
  const { profile, className, onClose, onView, ...rest } = props;
  const name = profile.baseTenantId || "";
  const { data, loading } = useQuery(QUERY_STORAGE_USAGE, { variables: { name } });
  if (loading) {
    return <div>Loading</div>;
  }
  const storage = data.storageByCustomer; //.sort((s1, s2) => (s2.date > s1.date ? 1 : -1));
  const tenantStorage = data.currentTenantStorageByCustomer; //.sort((s1, s2) => (s2.date > s1.date ? 1 : -1));
  console.log(`data deytails`, tenantStorage);

  return (
    <div {...rest} className="bg-white  px-4 font-sans right-0 w-2/3 flex h-full fixed z-50 shadow-lg rounded  flex-col">
      <EditTenantDetailsWrapped isTenantEditor={isTenantEditor} storage={storage} tenantStorage={tenantStorage} {...props} />
    </div>
  );
}

export const EditTenantDetailsWrapped = (props) => {
  const { profile, onClose, storage, tenantStorage, isTenantEditor = true } = props;

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
  let firstStorageItem = null;
  if (storage && storage.length) {
    const sortedStorage = storage.slice().sort((s1, s2) => (s1.date > s2.date ? -1 : 1));
    firstStorageItem = sortedStorage[0];
    console.log(`firstStorageItem`, firstStorageItem);
  }
  let size = firstStorageItem ? firstStorageItem.size : 0;
  const sizeString = toSizeString(size);
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
  function handleSetHTMLComments(comments) {
    setValues({ ...values, comments });
  }

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
      <div className="text-lg font-semibold font-sans p-2">{`Details for ${profile.customer.name}`}</div>
      <span className="font-semibold text-sm">Storage</span>
      <hr />
      <div className="flex space-x-1 space-y-1 flex-wrap mb-6">
        {tenantStorage.map(({ size, tenant }) => (
          <div
            className={`flex items-center justify-center min-w-32 ${
              tenant.includes("PRD") ? "bg-red-200 text-red-600" : "bg-amber-200 text-amber-600"
            } font-semibold text-sm px-2 py-1 rounded-full `}
          >{`${tenant}: ${toSizeString(size)}`}</div>
        ))}
      </div>
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
              defaultValue={values.golivedate}
              label="Go live date"
              name="golivedate"
              onChange={handleChange}
              // value=
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
            <HTMLEditor onChange={handleSetHTMLComments} value={values.comments} label="Customer Comments" enabled={isTenantEditor} />
            {/* <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
              Customer Comments
            </label>
            <textarea
              className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none"
              name="comments"
              onChange={handleChange}
              // multiline
              rows="8"
              value={values.comments}
            /> */}
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
