import gql from 'graphql-tag';
import { StatusFilter } from '../../../generated/apolloComponents';

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
  query QUERY_BACKLOG(
    $date: String
    $owner: String
    $C_AWAITINGCUSTOMER: Int
    $N_AWAITINGCUSTOMER: Int
    $C_RESEARCHING: Int
    $N_RESEARCHING: Int
    $C_AWAITINGINFOR: Int
    $N_AWAITINGINFOR: Int
    $C_NEW: Int
    $N_NEW: Int
  ) {
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
      since: $C_AWAITINGCUSTOMER
      date: $date
    ) {
      ...backlogfragment
    }
    researching_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Researching"
      since: $C_RESEARCHING
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_infor_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Infor"
      since: $C_AWAITINGINFOR
      date: $date
    ) {
      ...backlogfragment
    }
    callbacks_cloud: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Infor"
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
      createdafter: "2019-03-01"
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
      createdafter: "2019-03-01"
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
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    aging_dev_cloud: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      aging: 90
      statusFilter: DEVELOPMENT
      date: $date
    ) {
      ...backlogfragment
    }
    new_cloud: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      status: "New"
      since: $C_NEW
      date: $date
    ) {
      ...backlogfragment
    }
    critical: backlog(owner: $owner, orderBy: DAYS_DESC, severityname: CRITICAL) {
      ...backlogfragment
    }
    cloudops: backlog(owner: $owner, orderBy: DAYS_DESC, statusFilter: CLOUDOPS) {
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
      since: $N_AWAITINGCUSTOMER
      date: $date
    ) {
      ...backlogfragment
    }
    researching: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Researching"
      since: $N_RESEARCHING
      date: $date
    ) {
      ...backlogfragment
    }
    awaiting_infor: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Infor"
      since: $N_AWAITINGINFOR
      date: $date
    ) {
      ...backlogfragment
    }
    callbacks: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Infor"
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
      createdafter: "2019-03-01"
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
      createdafter: "2019-03-01"
      date: $date
      aging: 5
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }

    aging: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: 90
      date: $date
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    aging_dev: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: 90
      date: $date
      statusFilter: DEVELOPMENT
    ) {
      ...backlogfragment
    }
    new: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "ALL"
      status: "New"
      since: $N_NEW
      date: $date
    ) {
      ...backlogfragment
    }
  }
`;
