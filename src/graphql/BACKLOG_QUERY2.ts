import gql from 'graphql-tag';

export const QUERY_BACKLOG = gql`
  # Write your query or mutation here
  fragment backlogfragment on DWH {
    incident
    incidentcreated
    owner
    customername
    summary
    title
    status
    dayssincelastupdate
    daysSinceCreated
    escalated
    Deployment
    severityname
  }
  query QUERY_BACKLOG($date: String, $owner: String) {
    mostRecentUpdate
    critical_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      severityname: CRITICAL
      deployment: "CLOUD"
    ) {
      ...backlogfragment
    }
    all_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    on_hold_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      status: "On Hold By Customer"
      action_date: $date
      deployment: "CLOUD"
    ) {
      ...backlogfragment
    }
    solution_proposed_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Solution Proposed"
      since: 30
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_customer_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Customer"
      since: 3
      date: $date
    ) {
      ...backlogfragment
    }
    researching_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Researching"
      since: 7
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_infor_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Infor"
      since: 3
      date: $date
    ) {
      ...backlogfragment
    }
    major_impact_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      severityname: MAJOR
      since: 2
      createdafter: "2019-02-25"
      date: $date
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    major_impact_cloud2: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      severityname: MAJOR
      since: 2
      createdafter: "2019-02-25"
      date: $date
      aging: 5
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }

    aging_cloud: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      aging: 90
      date: $date
    ) {
      ...backlogfragment
    }
    new_cloud: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      status: "New"
      since: 2
      date: $date
    ) {
      ...backlogfragment
    }
    critical: backlog(owner: $owner, orderBy: DAYS_DESC, severityname: CRITICAL) {
      ...backlogfragment
    }
    all: backlog(owner: $owner, orderBy: DAYS_DESC, statusFilter: BACKLOG) {
      ...backlogfragment
    }
    on_hold: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      status: "On Hold By Customer"
      action_date: $date
    ) {
      ...backlogfragment
    }
    solution_proposed: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Solution Proposed"
      since: 30
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_customer: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Customer"
      since: 7
      date: $date
    ) {
      ...backlogfragment
    }
    researching: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Researching"
      since: 16
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_infor: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Infor"
      since: 3
      date: $date
    ) {
      ...backlogfragment
    }
    major_impact: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: 2
      createdafter: "2019-02-25"
      date: $date
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    major_impact2: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: 2
      createdafter: "2019-02-25"
      date: $date
      aging: 5
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }

    aging: backlog(owner: $owner, orderBy: CREATED_ASC, deployment: "ALL", aging: 90, date: $date) {
      ...backlogfragment
    }
    new: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "ALL"
      status: "New"
      since: 2
      date: $date
    ) {
      ...backlogfragment
    }
  }
`;
