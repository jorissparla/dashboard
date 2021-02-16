import { useQuery, gql } from "@apollo/client";
import React from "react";
import SumoForm from "./SumoForm";

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
  if (loading) {
    return <div></div>;
  }
  const { sumoalerts } = data;
  console.log(sumolog);
  return (
    <div>
      <SumoForm initialValues={sumoalerts} />
    </div>
  );
};

export default EditSumoAlert;
