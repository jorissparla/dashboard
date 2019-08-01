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
    service_restored_date
  }
  query QUERY_BACKLOG(
    $date: String
    $owner: String
    $products: [String]
    $N_AWAITINGCUSTOMER: Int
    $N_RESEARCHING: Int
    $N_AWAITINGINFOR: Int
    $N_NEW: Int
    $N_SOLUTIONPROPOSED: Int
    $N_AGING: Int
    $N_MAJORIMPACT: Int
  ) {
    mostRecentUpdate
    critical: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      severityname: CRITICAL
      productFilters: $products
    ) {
      ...backlogfragment
    }
    sev2: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      severityname: MAJOR
      productFilters: $products
    ) {
      ...backlogfragment
    }
    cloudops: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      statusFilter: CLOUDOPS
      productFilters: $products
    ) {
      ...backlogfragment
    }
    active: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      statusFilter: ACTIVE
      productFilters: $products
    ) {
      ...backlogfragment
    }
    all: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      statusFilter: BACKLOG
      productFilters: $products
    ) {
      ...backlogfragment
    }
    infor: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      statusFilter: BACKLOG
      customer: "Infor"
      productFilters: $products
    ) {
      ...backlogfragment
    }
    on_hold: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      status: "On Hold By Customer"
      action_date: $date
      productFilters: $products
    ) {
      ...backlogfragment
    }
    solution_proposed: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Solution Proposed"
      since: $N_SOLUTIONPROPOSED
      date: $date
      productFilters: $products
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
      productFilters: $products
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
      productFilters: $products
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
      productFilters: $products
    ) {
      ...backlogfragment
    }
    callbacks: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      status: "Awaiting Infor"
      date: $date
      productFilters: $products
    ) {
      ...backlogfragment
    }
    major_impact: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: $N_MAJORIMPACT
      createdafter: "2019-03-01"
      date: $date
      statusFilter: BACKLOG
      productFilters: $products
    ) {
      ...backlogfragment
    }
    major_impact2: backlog(
      owner: $owner
      orderBy: DAYS_DESC
      deployment: "ALL"
      severityname: MAJOR
      since: $N_MAJORIMPACT
      createdafter: "2019-03-01"
      date: $date
      aging: 5
      statusFilter: BACKLOG
      productFilters: $products
    ) {
      ...backlogfragment
    }

    aging: backlog(
      owner: $owner
      orderBy: CREATED_ASC
      deployment: "ALL"
      aging: $N_AGING
      date: $date
      statusFilter: BACKLOG
      productFilters: $products
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
      productFilters: $products
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
      productFilters: $products
    ) {
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
