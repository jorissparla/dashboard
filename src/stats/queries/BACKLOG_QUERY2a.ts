import gql from 'graphql-tag';

export const QUERY_LAST_UPDATED = gql`
  query QUERY_LAST_UPDATED {
    mostRecentUpdate
  }
`;

export const QUERY_BACKLOG2 = gql`
  # Write your query or mutation here
  fragment backlogfragmentData on DWH {
    incident
    incidentcreated
    owner
    owner_region
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
  query QUERY_BACKLOG2(
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
      ...backlogfragmentData
    }
    all_cloud: backlog(orderBy: DAYS_DESC, deployment: "CLOUD", statusFilter: BACKLOG) {
      ...backlogfragmentData
    }
    all_active_cloud: backlog(orderBy: DAYS_DESC, deployment: "CLOUD", statusFilter: ACTIVE) {
      ...backlogfragmentData
    }
    on_hold_cloud: backlog(orderBy: DAYS_DESC, status: "On Hold By Customer", deployment: "CLOUD") {
      ...backlogfragmentData
    }
    solution_proposed_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Solution Proposed"
      since: $N_SOLUTIONPROPOSED
    ) {
      ...backlogfragmentData
    }
    awaiting_customer_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Customer"
      since: $C_AWAITINGCUSTOMER
    ) {
      ...backlogfragmentData
    }
    researching_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Researching"
      since: $C_RESEARCHING
    ) {
      ...backlogfragmentData
    }
    awaiting_infor_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      status: "Awaiting Infor"
      since: $C_AWAITINGINFOR
    ) {
      ...backlogfragmentData
    }
    callbacks_cloud: backlog(orderBy: DAYS_DESC, deployment: "CLOUD", status: "Awaiting Infor") {
      ...backlogfragmentData
    }
    major_impact_cloud: backlog(
      orderBy: DAYS_DESC
      deployment: "CLOUD"
      severityname: MAJOR
      since: 2
      createdafter: "2019-03-01"

      statusFilter: BACKLOG
    ) {
      ...backlogfragmentData
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
      ...backlogfragmentData
    }

    aging_cloud: backlog(
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      aging: $N_AGING

      statusFilter: BACKLOG
    ) {
      ...backlogfragmentData
    }
    aging_dev_cloud: backlog(
      orderBy: CREATED_ASC
      deployment: "CLOUD"
      aging: 90
      statusFilter: DEVELOPMENT
    ) {
      ...backlogfragmentData
    }
    new_cloud: backlog(orderBy: CREATED_ASC, deployment: "CLOUD", status: "New", since: $C_NEW) {
      ...backlogfragmentData
    }
    critical: backlog(orderBy: DAYS_DESC, severityname: CRITICAL, productFilters: $products) {
      ...backlogfragmentData
    }
    cloudops: backlog(orderBy: DAYS_DESC, statusFilter: CLOUDOPS, productFilters: $products) {
      ...backlogfragmentData
    }
    active: backlog(orderBy: DAYS_DESC, statusFilter: ACTIVE, productFilters: $products) {
      ...backlogfragmentData
    }
    all: backlog(orderBy: DAYS_DESC, statusFilter: BACKLOG, productFilters: $products) {
      ...backlogfragmentData
    }
    infor: backlog(orderBy: DAYS_DESC, statusFilter: BACKLOG, customer: "Infor") {
      ...backlogfragmentData
    }
    on_hold: backlog(orderBy: DAYS_DESC, status: "On Hold By Customer") {
      ...backlogfragmentData
    }
    solution_proposed: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Solution Proposed"
      since: $N_SOLUTIONPROPOSED
    ) {
      ...backlogfragmentData
    }
    awaiting_customer: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Customer"
      since: $N_AWAITINGCUSTOMER
    ) {
      ...backlogfragmentData
    }
    researching: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Researching"
      since: $N_RESEARCHING
    ) {
      ...backlogfragmentData
    }
    awaiting_infor: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Infor"
      since: $N_AWAITINGINFOR
    ) {
      ...backlogfragmentData
    }
    callbacks: backlog(orderBy: DAYS_DESC, deployment: "ALL", status: "Awaiting Infor") {
      ...backlogfragmentData
    }
    major_impact: backlog(
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: $N_MAJORIMPACT
      createdafter: "2019-03-01"

      statusFilter: BACKLOG
    ) {
      ...backlogfragmentData
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
      ...backlogfragmentData
    }

    aging: backlog(
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: $N_AGING

      statusFilter: BACKLOG
    ) {
      ...backlogfragmentData
    }
    aging_dev: backlog(
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: 90

      statusFilter: DEVELOPMENT
    ) {
      ...backlogfragmentData
    }
    new: backlog(orderBy: CREATED_ASC, deployment: "ALL", status: "New", since: $N_NEW) {
      ...backlogfragmentData
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
    owner_region
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
