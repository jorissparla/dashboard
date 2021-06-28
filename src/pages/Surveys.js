import * as React from "react";

import { gql, useQuery } from "@apollo/client";
import { useParams, withRouter } from "react-router";

import Spinner from "../utils/spinner";
import SurveyComments from "../surveys/SurveyComments";
import { SurveyComponent } from "../surveys/SurveyComponent";

console.log("surveys");
const QUERY_SURVEY_RATIOS = gql`
  query QUERY_SURVEY_RATIOS($region: String) {
    getSurveyRatios(region: $region) {
      sent
      responded
      pct_satisfied
      pct_dissatisfied
      satisfied_feedback
      dissatisfied_feedback
      feedback_comments
      pct_feedback_comments
      uncategorized
      pct_uncategorized
    }
  }
`;

function SurveysInner(props) {
  const params = useParams();
  let region = params.id || "EMEA";
  console.log(params);

  const { data, loading } = useQuery(QUERY_SURVEY_RATIOS, {
    variables: { region },
  });
  console.log(data);
  if (loading) {
    return <Spinner />;
  }
  const {
    getSurveyRatios: {
      sent,
      responded,
      pct_satisfied,
      pct_dissatisfied,
      satisfied_feedback,
      dissatisfied_feedback,
      feedback_comments,
      pct_feedback_comments,
      uncategorized,
      pct_uncategorized,
    },
  } = data;
  return (
    <div>
      <SurveyComponent
        {...{
          sent,
          responded,
          pct_satisfied,
          pct_dissatisfied,
          satisfied_feedback,
          dissatisfied_feedback,
          feedback_comments,
          pct_feedback_comments,
          uncategorized,
          pct_uncategorized,
        }}
      />
      <SurveyComments region={region} />
    </div>
  );
}

const Srvs = () => {
  return (
    <div>
      <SurveysInner />
    </div>
  );
};

export default Srvs;
