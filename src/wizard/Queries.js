import gql from 'graphql-tag';
export const ALL_MAINTENANCE_QUERY = gql`
  query allMaitenance {
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
      portingset
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
    }
  }
`;
