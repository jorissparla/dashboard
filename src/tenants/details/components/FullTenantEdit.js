import { useQuery } from "@apollo/client";
import React from "react";
import Spinner from "utils/spinner";
import { QUERY_TENANT_DETAIL } from "../../TenantQueries";
import CustomerEvents from "./CustomerEvents";
import { EditTenantDetailsWrapped } from "./EditTenant";
function FullTenantEdit({
  match: {
    params: { customerid },
  },
}) {
  console.log(customerid);
  // const [] = useMutation(MUTATION_UPDATE_DETAIL);
  const { data, loading } = useQuery(QUERY_TENANT_DETAIL, { variables: { input: { customerid } } });
  // const {cus}
  if (loading) return <Spinner />;

  console.log(data);
  const profile = data.tenantcustomerdetail;
  return (
    <div className="flex -mt-10 bg-gray-200">
      <div className="w-1/2 rounded shadow-md m-2 bg-white">
        <EditTenantDetailsWrapped profile={profile} isTenantEditor={true} onClose={() => null} />
      </div>

      <div className="w-1/2 rounded shadow-md m-2 bg-white">
        <CustomerEvents customerid={customerid} />
      </div>
    </div>
  );
}

export default FullTenantEdit;
