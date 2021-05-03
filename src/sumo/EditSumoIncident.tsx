import { useQuery, gql } from "@apollo/client";
import React from "react";
import SumoIncidentForm from "./SumoIncidentForm";
import { ONE_SUMOINCIDENT_QUERY } from "./sumoqueries";
import { ISingleSumoIncident } from "./sumotypes";

const EditSumoIncident = (props: { match: { params: { id: any } } }) => {
  const { id } = props.match.params;
  const { data, loading } = useQuery<ISingleSumoIncident | null>(ONE_SUMOINCIDENT_QUERY, { variables: { id } });
  console.log(data);
  if (loading) {
    return <div></div>;
  }
  const sumoincident = data?.sumoincident;
  return (
    <div>
      <SumoIncidentForm initialValues={sumoincident} />
    </div>
  );
};

export default EditSumoIncident;
