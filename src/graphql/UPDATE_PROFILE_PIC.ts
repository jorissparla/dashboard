import gql from 'graphql-tag';
export const UPDATE_PROFILE_PIC_MUTATION = gql`
  mutation UPDATE_PROFILE_PIC_MUTATION($where: WhereAccountProfileInput!, $image: String!) {
    updateProfilePic(where: $where, image: $image) {
      id
      image
    }
  }
`;
