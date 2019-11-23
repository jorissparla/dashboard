import { gql } from 'graphql-tag';
export const ALL_MAINTENANCE_QUERY = gql`
  query allMaitenance {
    allMaintenance {
      id
      version
      nryears
      mm_ended
      checksrequired
      entitled_extended_maintenance
      xm_date_since
      xm_end_date
      data_corruption
      solutions
      defects
      communication
    }
  }
`;
