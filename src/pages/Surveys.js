import * as React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { SurveyComponent } from "../surveys/SurveyComponent";
import Spinner from "../utils/spinner";
import SurveyComments from "../surveys/SurveyComments";

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

const SurveysInner = (props) => {
  let region = props.match.params.id || "EMEA";
  console.log("🗑🗑", region, props.match.params.id);

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
};

export const Surveys = withRouter(SurveysInner);
