import { useQuery, gql } from "@apollo/client";
import React from "react";
import SumoForm from "./SumoForm";

const ONE_SUMOLOGS_QUERY = gql`
  query ONE_SUMOLOGS_QUERY($id: ID) {
    sumolog(id: $id) {
      id
      creator
      created
      customername
      week
      comments
      created
      query
      farms
      incident
      sessioncode
      errormessage
      module
    }
  }
`;

const EditSumo = (props) => {
  const { id } = props.match.params;
  const { data, loading } = useQuery(ONE_SUMOLOGS_QUERY, { variables: { id } });
  if (loading) {
    return <div></div>;
  }
  const { sumolog } = data;
  return (
    <div>
      <SumoForm initialValues={sumolog} />
    </div>
  );
};

export default EditSumo;
