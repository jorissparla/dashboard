import gql from 'graphql-tag';
export const backlogFragment = gql`
  fragment backlogfragment on DWH {
    incident
    incidentcreated
    owner
    customername
    summary
    status
    dayssincelastupdate
    daysSinceCreated
    escalated
    Deployment
    severityname
  }
`;
export const QUERY_BACKLOG = gql`
  # Write your query or mutation here
  fragment backlogfragment on DWH {
    incident
    incidentcreated
    owner
    customername
    summary
    status
    dayssincelastupdate
    daysSinceCreated
    escalated
    Deployment
    severityname
  }
  query QUERY_BACKLOG($date: String, $deployment: String) {
    mostRecentUpdate
    on_hold: backlog(orderBy: DAYS_DESC, status: "On Hold By Customer", action_date: $date) {
      ...backlogfragment
    }
    solution_proposed: backlog(
      orderBy: DAYS_DESC
      deployment: $deployment
      status: "Solution Proposed"
      since: 30
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_customer: backlog(
      orderBy: DAYS_DESC
      deployment: $deployment
      status: "Awaiting Customer"
      since: 7
      date: $date
    ) {
      ...backlogfragment
    }
    researching: backlog(
      orderBy: DAYS_DESC
      deployment: $deployment
      status: "Researching"
      since: 16
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_infor: backlog(
      orderBy: DAYS_DESC
      deployment: $deployment
      status: "Awaiting Infor"
      since: 3
      date: $date
    ) {
      ...backlogfragment
    }
    major_impact: backlog(
      orderBy: DAYS_DESC
      deployment: $deployment
      severityname: MAJOR
      since: 2
      createdafter: "2019-02-25"
      date: $date
    ) {
      ...backlogfragment
    }

    aging: backlog(
      orderBy: DAYS_DESC
      deployment: $deployment
      severityname: MAJOR
      aging: 90
      date: $date
    ) {
      ...backlogfragment
    }
  }
`;
