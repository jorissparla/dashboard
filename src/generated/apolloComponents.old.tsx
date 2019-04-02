export type Maybe<T> = T | null;

export interface PaginationInput {
  limit: number;

  offset: number;
}

export interface InputAccountType {
  id: string;

  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  fullname?: Maybe<string>;

  email?: Maybe<string>;

  login?: Maybe<string>;

  team?: Maybe<string>;

  navid?: Maybe<string>;

  location?: Maybe<string>;

  region?: Maybe<string>;

  role?: Maybe<string>;
}

export interface Filter {
  name?: Maybe<string>;

  value?: Maybe<string>;
}

export interface WhereAccountInput {
  id: string;
}

export interface UpdateAccountDataPermissionsInput {
  permissions?: Maybe<string[]>;
}

export interface InputEmployeeType {
  id?: Maybe<string>;

  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  fullname?: Maybe<string>;

  email?: Maybe<string>;

  login?: Maybe<string>;

  team?: Maybe<string>;

  navid?: Maybe<string>;

  location?: Maybe<string>;

  region?: Maybe<string>;

  role?: Maybe<string>;
}

export interface AuthProviderEmail {
  email: string;

  password?: Maybe<string>;
}

export interface InputAuditType {
  id?: Maybe<string>;

  page?: Maybe<string>;

  linkid?: Maybe<string>;

  username?: Maybe<string>;

  type?: Maybe<string>;

  createdate?: Maybe<string>;
}

export interface AwardInput {
  month?: Maybe<string>;

  name?: Maybe<string>;

  navid?: Maybe<string>;

  nominatedby?: Maybe<string>;
}

export interface InputCardType {
  id?: Maybe<string>;

  title?: Maybe<string>;

  description?: Maybe<string>;

  categoryname?: Maybe<string>;

  link?: Maybe<string>;

  createdby?: Maybe<string>;

  owner?: Maybe<string>;

  product?: Maybe<string>;
}

export interface InputWhereSupportCardFavorite {
  supportcard_id: string;

  account_id: string;
}

export interface ChatInputType {
  id?: Maybe<string>;

  weeknr?: Maybe<string>;

  productline?: Maybe<string>;

  region?: Maybe<string>;

  team?: Maybe<string>;

  nrchats?: Maybe<number>;

  responseintime?: Maybe<number>;

  percentage?: Maybe<number>;

  fromDate?: Maybe<string>;
}

export interface InputCourseType {
  id?: Maybe<string>;

  team?: Maybe<string>;

  title?: Maybe<string>;

  description?: Maybe<string>;

  link?: Maybe<string>;

  type?: Maybe<string>;

  coursetypeid?: Maybe<string>;

  hours?: Maybe<number>;

  startdate?: Maybe<string>;

  enddate?: Maybe<string>;

  status?: Maybe<string>;

  applicable?: Maybe<string>;

  trainer?: Maybe<string>;

  lastmodified?: Maybe<string>;

  category?: Maybe<string>;
}

export interface InputPlannedCourseType {
  id?: Maybe<string>;

  courseid?: Maybe<string>;

  hours?: Maybe<number>;

  trainer?: Maybe<string>;

  startdate?: Maybe<string>;

  enddate?: Maybe<string>;

  status?: Maybe<string>;

  team?: Maybe<string>;

  type?: Maybe<string>;

  details?: Maybe<string>;

  location?: Maybe<string>;

  updatedAt?: Maybe<string>;
}

export interface PlannedCourseRequestInput {
  id?: Maybe<string>;

  courseid?: Maybe<string>;

  startdate?: Maybe<string>;

  enddate?: Maybe<string>;

  trainer?: Maybe<string>;

  participants?: Maybe<string>;

  studentcount?: Maybe<number>;

  type?: Maybe<string>;

  details?: Maybe<string>;

  hours?: Maybe<number>;

  completed?: Maybe<number>;

  message?: Maybe<string>;

  submittedAt?: Maybe<string>;

  submittedBy?: Maybe<string>;

  approver?: Maybe<string>;
}

export interface WherePlannedCourseInputType {
  id: string;
}

export interface InputEnrollment {
  courseid?: Maybe<string>;

  plannedcourseid?: Maybe<string>;

  navid?: Maybe<string>;
}

export interface UpdateEnrollment {
  id?: Maybe<string>;

  courseid?: Maybe<string>;

  plannedcourseid?: Maybe<string>;

  navid?: Maybe<string>;

  status?: Maybe<string>;
}

export interface CustomerInput {
  number?: Maybe<string>;

  name?: Maybe<string>;

  active?: Maybe<number>;

  followedBy?: Maybe<string>;

  navid?: Maybe<string>;

  updated?: Maybe<string>;
}

export interface CustomerUpdateInput {
  id?: Maybe<string>;

  followedBy?: Maybe<string>;

  navid?: Maybe<string>;

  active?: Maybe<number>;
}

export interface TenantInput {
  id?: Maybe<string>;

  farm?: Maybe<string>;

  name?: Maybe<string>;

  packagecombination?: Maybe<string>;

  version?: Maybe<string>;

  customerid?: Maybe<string>;
}

export interface CustomerNoteInput {
  id?: Maybe<string>;

  customerId?: Maybe<string>;

  date?: Maybe<string>;

  note?: Maybe<string>;
}

export interface GoLivesInputType {
  id?: Maybe<string>;

  customerid?: Maybe<string>;

  customername?: Maybe<string>;

  region?: Maybe<string>;

  country?: Maybe<string>;

  date?: Maybe<string>;

  version?: Maybe<string>;

  ics?: Maybe<string>;

  entitlement?: Maybe<string>;

  comments?: Maybe<string>;
}

export interface FeedbackInputType {
  id?: Maybe<string>;

  customername?: Maybe<string>;

  consultant?: Maybe<string>;

  navid?: Maybe<string>;

  createdAt?: Maybe<string>;

  text?: Maybe<string>;
}

export interface InputPinType {
  id: string;

  created?: Maybe<string>;

  title?: Maybe<string>;

  picture?: Maybe<string>;
}

export interface NewsInputType {
  id?: Maybe<string>;

  create_date?: Maybe<string>;

  expire_date?: Maybe<string>;

  title?: Maybe<string>;

  body?: Maybe<string>;

  link?: Maybe<string>;

  link_text?: Maybe<string>;

  img?: Maybe<string>;

  user_id?: Maybe<number>;

  product?: Maybe<string>;
}

export interface InputRequestType {
  id?: Maybe<string>;

  name?: Maybe<string>;

  email?: Maybe<string>;

  page?: Maybe<string>;

  text?: Maybe<string>;

  status?: Maybe<string>;

  assigned?: Maybe<string>;

  complete?: Maybe<number>;

  updatedAt?: Maybe<string>;
}

export interface AccountSubscriptionFilter {
  mutation_in?: Maybe<_ModelMutationType[]>;
}

export interface AuthProviderSignUpData {
  email?: Maybe<AuthProviderEmail>;
}

export interface StatusFilter {
  Status?: Maybe<string>;

  nrDays?: Maybe<number>;
}

export interface WhereMoreAccountInput {
  navid?: Maybe<string>;

  team?: Maybe<string>;

  firstname?: Maybe<string>;

  location?: Maybe<string>;

  region?: Maybe<string>;

  locations?: Maybe<string[]>;

  regions?: Maybe<string[]>;

  role?: Maybe<string>;

  roles?: Maybe<string[]>;

  teams?: Maybe<string[]>;

  filter?: Maybe<string>;

  paginate?: Maybe<PaginationInput>;
}

export enum Statusfilter {
  Support = "SUPPORT",
  Development = "DEVELOPMENT",
  All = "ALL",
  Backlog = "BACKLOG"
}

export enum BackLogOrderBy {
  OwnerAsc = "OWNER_ASC",
  StatusAsc = "STATUS_ASC",
  CustomerAsc = "CUSTOMER_ASC",
  DaysAsc = "DAYS_ASC",
  DaysDesc = "DAYS_DESC",
  CreatedAsc = "CREATED_ASC",
  CreatedDesc = "CREATED_DESC"
}

export enum _ModelMutationType {
  Created = "CREATED",
  Updated = "UPDATED",
  Deleted = "DELETED"
}

export enum DeploymentType {
  Onprem = "ONPREM",
  Cloud = "CLOUD"
}

export type Upload = any;

// ====================================================
// Documents
// ====================================================

export type CurrentUserQueryVariables = {};

export type CurrentUserQueryQuery = {
  __typename?: "Query";

  me: Maybe<CurrentUserQueryMe>;
};

export type CurrentUserQueryMe = {
  __typename?: "Account";

  id: string;

  fullname: Maybe<string>;

  email: Maybe<string>;

  image: Maybe<string>;

  role: Maybe<string>;

  permissions: Maybe<CurrentUserQueryPermissions[]>;
};

export type CurrentUserQueryPermissions = {
  __typename?: "Permission";

  permission: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const CurrentUserQueryDocument = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      fullname
      email
      image
      role
      permissions {
        permission
      }
    }
  }
`;
export class CurrentUserQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<CurrentUserQueryQuery, CurrentUserQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<CurrentUserQueryQuery, CurrentUserQueryVariables>
        query={CurrentUserQueryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CurrentUserQueryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CurrentUserQueryQuery, CurrentUserQueryVariables>
> &
  TChildProps;
export function CurrentUserQueryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CurrentUserQueryQuery,
        CurrentUserQueryVariables,
        CurrentUserQueryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CurrentUserQueryQuery,
    CurrentUserQueryVariables,
    CurrentUserQueryProps<TChildProps>
  >(CurrentUserQueryDocument, operationOptions);
}
