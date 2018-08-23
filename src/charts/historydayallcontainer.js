import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import HistoryChart from "./historychart";
import styled from "styled-components";

const Flexdiv = styled.div`
  display: flex;
  height: 800px;
`;
const Contdiv = styled.div`
  flex: row;
  width: 50%;
  height: 80%;
`;
/* 
class HistoryDayAll1 extends Component {

  render() {
    //const data = (!this.props.data) ? [ 'LN', 'Logistics',  'Finance', 'Tools','LN','LN'] : this.props.data

    //const column = data[this.state.index || 0]

    const color = this.props.color || "#ffb74d";
    //const title = 'Backlog '.concat(column)
    //if (!history) return <div> Loading....</div>;
    return (
             
          )
  }
}
 */

export default class HistoryDayAllContainer extends Component {
  render() {
    const color = this.props.color || "#ffb74d";
    return (
      <Query query={QUERY_HISTORY_DAY}>
        {({ data, loading, error }) => {
          if (loading) return <h2>Loading....</h2>;
          if (error) return <div>error...</div>;
          console.log(data);
          if (!data) return <div>No data</div>;
          const history = data.historyday;
          return (
            <Flexdiv>
              <Contdiv>
                <HistoryChart
                  data={history}
                  title={`Backlog LN`}
                  type="area"
                  color={color}
                  xvalue="day"
                  value={`LN`}
                />
                <HistoryChart
                  data={history}
                  title={`Backlog Logistics`}
                  type="area"
                  color={color}
                  xvalue="day"
                  value={`Logistics`}
                />
              </Contdiv>
              <Contdiv>
                <HistoryChart
                  data={history}
                  title={`Backlog Finance`}
                  type="area"
                  color={color}
                  xvalue="day"
                  value={`Finance`}
                />

                <HistoryChart
                  data={history}
                  title={`Backlog Tools`}
                  type="area"
                  color={color}
                  xvalue="day"
                  value={`Tools`}
                />
              </Contdiv>
            </Flexdiv>
          );
        }}
      </Query>
    );
  }
}

const QUERY_HISTORY_DAY = gql`
  {
    historyday {
      id
      day
      month
      LN
      Tools
      Finance
      Logistics
    }
  }
`;
// export default connect(mapStateToProps, { fetchHistoryDay })(HistoryDayAll1);
