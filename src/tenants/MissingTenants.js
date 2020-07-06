import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";
import { ALL_TENANTS_SIMPLE, MUTATION_UPDATE_TENANT_CUSTOMERID } from "./TenantQueries";
import Spinner from "utils/spinner";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";

const MissingTenants = () => {
  const [updateTenantCustomerId] = useMutation(MUTATION_UPDATE_TENANT_CUSTOMERID);
  const [missingTenants, setMissingTenants] = useState([]);
  const { data, loading } = useQuery(ALL_TENANTS_SIMPLE);
  const [error, setError] = useState("");
  const alert = useAlert();
  useEffect(() => {
    if (data)
      setMissingTenants(tenants.filter((t) => !t.customerid && !notValidPrefix(t.name)).sort((x, y) => (x.lastupdated < y.lastupdated ? 1 : -1)));
  }, [data]);
  if (loading) return <Spinner />;
  const { tenants } = data;

  function notValidPrefix(name) {
    return (
      name.startsWith("INFOR") ||
      name.startsWith("EDUGDE") ||
      name.startsWith("CLOUD") ||
      name.startsWith("CLDOPS") ||
      name.startsWith("SUPTGD") ||
      name.startsWith("SUPEU") ||
      name.startsWith("SLSGDE") ||
      name.startsWith("ICS")
    );
  }

  async function updatecustomerid(customerid, id, name) {
    setError("");
    const res = await updateTenantCustomerId({
      variables: { customerid, id },
      refetchQueries: [{ query: ALL_TENANTS_SIMPLE }],
    });
    const updatedMissingTenantsId = res?.data?.updatetenantcustomerid?.id;
    console.log(updatedMissingTenantsId);
    if (updatedMissingTenantsId) {
      setMissingTenants((prev) => prev.filter((t) => t.id !== updatedMissingTenantsId));

      alert.setMessage("Tenant was updated");
    } else setError("not updated");
    console.log(res);
  }

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full bg-gray-100 flex-col">
        <div className=" bg-white mx-5 w-1/2">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm leading-5 font-medium text-red-800">There were errors with your submission</h3>
                  <div className="mt-2 text-sm leading-5 text-red-700">
                    <ul className="list-disc pl-5">
                      <li className="mt-1">{error}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ul className="list-none flex flex-wrap items-start justify-start">
          {missingTenants.map((t) => (
            <CustomerDataCard key={t.id} tenant={t} update={updatecustomerid} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const CustomerDataCard = ({ tenant, update }) => {
  function handleUpdate() {
    update(customerid, tenant.id, tenant.name);
  }
  const [customerid, setCustomerId] = useState("");
  const t = tenant;
  return (
    <li className="rounded-lg shadow-xl p-2 bg-white m-2 h-48 w-72 text-gray-700">
      <div className="">
        <div className="font-semibold text-gray-700">{t.name}</div>
        <div className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-green-100 text-green-800 ">
          {t.version}
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
            Customer ID ({t.farm})
          </label>
          <input
            className="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="text"
            value={customerid}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <TWButton className="font-sans" onClick={handleUpdate}>
            {" "}
            Save
          </TWButton>
        </div>
      </div>
    </li>
  );
};

export default MissingTenants;
