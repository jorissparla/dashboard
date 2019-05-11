import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { SurveyComponent } from "../surveys/SurveyComponent";
import Spinner from "../utils/spinner";
import SurveyComments from "../surveys/SurveyComments";

const QUERY_SURVEY_RATIOS = gql`
  query QUERY_SURVEY_RATIOS {
    getSurveyRatios {
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
interface Props {}
export const Surveys: React.FC<Props> = () => {
  const { data, loading } = useQuery(QUERY_SURVEY_RATIOS, { suspend: false });
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
      pct_uncategorized
    }
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
          pct_uncategorized
        }}
      />
      <SurveyComments />
    </div>
  );
};
