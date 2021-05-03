import { useQuery, gql } from "@apollo/client";
import React from "react";
import SumoAlertForm from "./SumoAlertForm";

const ONE_SUMOALERT_QUERY = gql`
  query ONE_SUMOALERT_QUERY($id: ID) {
    sumoalert(id: $id) {
      id
      creator
      created
      alert
      comments
      environments
      archive
      customerid
      customername
    }
  }
`;

const EditSumoAlert = (props) => {
  const { id } = props.match.params;
  const { data, loading } = useQuery(ONE_SUMOALERT_QUERY, { variables: { id } });
  console.log(data);
  if (loading) {
    return <div></div>;
  }
  const { sumoalert } = data;
  console.log({ sumoalert });
  return (
    <div>
      <SumoAlertForm initialValues={sumoalert} />
    </div>
  );
};

export default EditSumoAlert;
