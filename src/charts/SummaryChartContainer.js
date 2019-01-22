import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import SummaryChart from './NewSummaryChart';
import shortid from 'shortid';

class SummaryChartContainer extends React.Component {
  render() {

    const value = !this.props.value ? 'supportBacklog' : this.props.value;
    const title = !this.props.title ? value : this.props.title;
    const type = !this.props.type ? 'column' : this.props.type;
    const team = this.props.team || 'Logistics';
    //  const summary = summaries; // .reverse()
    const color = this.props.color;
    return (
      <Query query={QUERY_SUMMARY_DATA} variables={{ team }}>
        {({ data, loading }) => {
          if (loading) return <div>Loading....</div>;
          if (data && data.summaries) {
            const summary = data.summaries;
            return (
              <SummaryChart
                id={shortid.generate()}
                data={summary}
                title={title}
                type={type}
                xvalue="weekNr"
                value={value}
                color={color}
                team={team}
              />
            );
          } else {
            return 'no data returned';
          }
        }}
      </Query>
    );
  }
}

const QUERY_SUMMARY_DATA = gql`
  query summaries($team: String) {
    summaries(team: $team, recent: 6) {
      weekNr
      supportBacklog
      opened
      Closed
      surveyScore
      nrSurveys
      backlog
      escalated
      chatpct
      newbacklog
    }
  }
`;

/* export default graphql(querySummaries, {
  options: props => ({
    variables: { team: props.team || "Logistics", region: props.region || "EMEA" }
  })
})(SummaryChartContainer);
 */

export default SummaryChartContainer;
