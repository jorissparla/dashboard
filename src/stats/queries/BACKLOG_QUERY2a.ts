import gql from 'graphql-tag';

export const QUERY_LAST_UPDATED = gql`
  query QUERY_LAST_UPDATED{
    mostRecentUpdate
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
    title
    status
    dayssincelastupdate
    daysSinceCreated
    escalated
    Deployment
    severityname
    service_restored_date
  }
  query QUERY_BACKLOG(
    $products: [String]
    $C_AWAITINGCUSTOMER: Int
    $N_AWAITINGCUSTOMER: Int
    $C_RESEARCHING: Int
    $N_RESEARCHING: Int
    $C_AWAITINGINFOR: Int
    $N_AWAITINGINFOR: Int
    $C_NEW: Int
    $N_NEW: Int
    $N_SOLUTIONPROPOSED: Int
    $N_AGING: Int
    $N_MAJORIMPACT: Int
  ) {
    mostRecentUpdate
    critical_cloud: backlog(orderBy: DAYS_DESC, severityname: CRITICAL, deployment: "CLOUD") {
      ...backlogfragment
    }
    all_cloud: backlog(orderBy: DAYS_DESC, deployment: "CLOUD", statusFilter: BACKLOG) {
      ...backlogfragment
    }
    all_active_cloud: backlog(orderBy: DAYS_DESC, deployment: "CLOUD", statusFilter: ACTIVE) {
      ...backlogfragment
    }
    on_hold_cloud: backlog(orderBy: DAYS_DESC, status: "On Hold By Customer", deployment: "CLOUD") {
      ...backlogfragment
    }
    solution_proposed_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Solution Proposed"
      since: $N_SOLUTIONPROPOSED
    ) {
      ...backlogfragment
    }
    awaiting_customer_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Customer"
      since: $C_AWAITINGCUSTOMER
    ) {
      ...backlogfragment
    }
    researching_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Researching"
      since: $C_RESEARCHING
    ) {
      ...backlogfragment
    }
    awaiting_infor_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Infor"
      since: $C_AWAITINGINFOR
    ) {
      ...backlogfragment
    }
    callbacks_cloud: backlog(orderBy: DAYS_DESC, deployment: "CLOUD", status: "Awaiting Infor") {
      ...backlogfragment
    }
    major_impact_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      severityname: MAJOR
      since: 2
      createdafter: "2019-03-01"

      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    major_impact_cloud2: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      severityname: MAJOR
      since: 2
      createdafter: "2019-03-01"

      aging: 5
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }

    aging_cloud: backlog(
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      aging: $N_AGING

      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    aging_dev_cloud: backlog(
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      aging: 90
      statusFilter: DEVELOPMENT
    ) {
      ...backlogfragment
    }
    new_cloud: backlog(orderBy: CREATED_ASC, deployment: "CLOUD", status: "New", since: $C_NEW) {
      ...backlogfragment
    }
    critical: backlog(orderBy: DAYS_DESC, severityname: CRITICAL, productFilters: $products) {
      ...backlogfragment
    }
    cloudops: backlog(orderBy: DAYS_DESC, statusFilter: CLOUDOPS, productFilters: $products) {
      ...backlogfragment
    }
    active: backlog(orderBy: DAYS_DESC, statusFilter: ACTIVE, productFilters: $products) {
      ...backlogfragment
    }
    all: backlog(orderBy: DAYS_DESC, statusFilter: BACKLOG, productFilters: $products) {
      ...backlogfragment
    }
    infor: backlog(orderBy: DAYS_DESC, statusFilter: BACKLOG, customer: "Infor") {
      ...backlogfragment
    }
    on_hold: backlog(orderBy: DAYS_DESC, status: "On Hold By Customer") {
      ...backlogfragment
    }
    solution_proposed: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Solution Proposed"
      since: $N_SOLUTIONPROPOSED
    ) {
      ...backlogfragment
    }
    awaiting_customer: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Customer"
      since: $N_AWAITINGCUSTOMER
    ) {
      ...backlogfragment
    }
    researching: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Researching"
      since: $N_RESEARCHING
    ) {
      ...backlogfragment
    }
    awaiting_infor: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Infor"
      since: $N_AWAITINGINFOR
    ) {
      ...backlogfragment
    }
    callbacks: backlog(orderBy: DAYS_DESC, deployment: "ALL", status: "Awaiting Infor") {
      ...backlogfragment
    }
    major_impact: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: $N_MAJORIMPACT
      createdafter: "2019-03-01"

      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    major_impact2: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: $N_MAJORIMPACT
      createdafter: "2019-03-01"

      aging: 5
      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }

    aging: backlog(
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: $N_AGING

      statusFilter: BACKLOG
    ) {
      ...backlogfragment
    }
    aging_dev: backlog(
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: 90

      statusFilter: DEVELOPMENT
    ) {
      ...backlogfragment
    }
    new: backlog(orderBy: CREATED_ASC, deployment: "ALL", status: "New", since: $N_NEW) {
      ...backlogfragment
    }
  }
`;
export const QUERY_PRIORITY_BACKLOG = gql`
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
    severity
    severityname
    lastupdated
  }
  query QUERY_PRIORITY_BACKLOG($products: [String]) {
    mostRecentUpdate

    active: backlog(orderBy: DAYS_DESC, statusFilter: ACTIVE, productFilters: $products) {
      ...backlogfragment
    }
    all: backlog(orderBy: DAYS_DESC, statusFilter: BACKLOG, productFilters: $products) {
      ...backlogfragment
    }
    accounts {
      fullname
      image
    }
  }
`;
