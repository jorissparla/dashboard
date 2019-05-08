import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Spinner from '../utils/spinner';
import { SurveyTable } from './SurveyTable';

const QUERY_SURVEY_COMMENTS = gql`
  query QUERY_SURVEY_COMMENTS {
    surveys(satisfied: 1, hasComments: 1) {
      response_id
      case_id
      company_name
      public_comment
      contact_comments
      satisfied_with_service
      date_submitted
      account {
        fullname
        image
      }
    }
  }
`;

const useComments = () => {
  const { loading, data } = useQuery(QUERY_SURVEY_COMMENTS, { suspend: false });
  if (loading) return null;
  if (!data) return null;
  console.log('DATA', data);
  return data;
};

interface Props {}

const SurveyComments: React.FC<Props> = () => {
  const data = useComments();
  if (!data) return <Spinner />;
  console.log('SurveyComments data', data.surveys);
  return (
    <div>
      <SurveyTable surveys={data.surveys} />
    </div>
  );
};

export default SurveyComments;
