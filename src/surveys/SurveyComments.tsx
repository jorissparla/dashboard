import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import Spinner from "../utils/spinner";
import { SurveyTable } from "./SurveyTable";

const QUERY_SURVEY_COMMENTS = gql`
  query QUERY_SURVEY_COMMENTS($region: String) {
    surveys(satisfied: 1, hasComments: 1, region: $region) {
      response_id
      case_id
      company_name
      public_comment
      owner
      contact_comments
      satisfied_with_service
      date_submitted
      rating
      account {
        fullname
        image
      }
    }
  }
`;

interface UCProps {
  region: string;
}

const useComments = ({ region }: UCProps) => {
  console.log("😜😜😜😜", region);
  const { loading, data } = useQuery(QUERY_SURVEY_COMMENTS, { suspend: false, variables: { region } });
  if (loading) return null;
  if (!data) return null;
  console.log("DATA", data);
  return data;
};

interface Props {
  region: string;
}

const SurveyComments: React.FC<Props> = ({ region }) => {
  const data = useComments({ region });
  if (!data) return <Spinner />;
  console.log("SurveyComments data", data.surveys);
  return (
    <div>
      <SurveyTable surveys={data.surveys} />
    </div>
  );
};

export default SurveyComments;
