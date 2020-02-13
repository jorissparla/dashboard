import gql from 'graphql-tag';
export const ALL_MAINTENANCE_QUERY = gql`
  query allMaintenance {
    allMaintenance {
      id
      version
      date
      nryears
      mm_ended
      checksrequired
      entitled_extended_maintenance
      xm_date_since
      xm_end_date
      checklink
      data_corruption
      solutions
      defects
      communication
      comm_before
      comm_ics
      comm_disappointed
      portingset
    }
    maintenanceFAQ {
      id
      text
      text2
      text3
      localizations
    }
  }
`;

export const MAINTENANCE_FAQ_QUERY = gql`
  query MAINTENANCE_FAQ_QUERY {
    maintenanceFAQ {
      id
      text
      text2
      text3
      localizations
    }
  }
`;

export const SINGLE_MAINTENANCE_QUERY = gql`
  query SINGLE_MAINTENANCE_QUERY($version: String, $valid: Boolean) {
    maintenance(version: $version, valid: $valid) {
      id
      version
      date
      nryears
      mm_ended
      checksrequired
      entitled_extended_maintenance
      xm_date_since
      xm_end_date
      checklink
      data_corruption
      solutions
      defects
      communication
      comm_before
      comm_ics
      comm_disappointed
      portingset
    }
  }
`;

export const MUTATION_UPDATE_MAINTENANCE = gql`
  mutation MUTATION_UPDATE_MAINTENANCE($input: MaintenanceUpdateType) {
    updateMaintenance(input: $input) {
      id
      version
      nryears
      mm_ended
      checksrequired
      entitled_extended_maintenance
      xm_date_since
      checklink
      xm_end_date
      data_corruption
      solutions
      defects
      communication
      portingset
      comm_before
      comm_ics
      comm_disappointed
    }
  }
`;
export const MUTATION_UPDATE_MAINTENANCE_FAQ = gql`
  mutation MUTATION_UPDATE_MAINTENANCE_FAQ($input: MaintenanceFAQUpdateType) {
    updateMaintenanceFAQ(input: $input) {
      id
      text
      text2
      text3
      localizations
    }
  }
`;

export const CREATE_AUDIT_MUTATION_WIZARD = gql`
  mutation CREATE_AUDIT_MUTATION_WIZARD($input: InputAuditType) {
    createAudit(input: $input) {
      id
      page
      linkid
      username
      type
      createdate
    }
  }
`;
