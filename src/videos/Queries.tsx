import gql from 'graphql-tag';
const videoFragment = gql`
  fragment VideoDetails on Video {
    id
    title
    date
    url
    category
    views
  }
`;

export const QUERY_ALL_VIDEOS = gql`
  ${videoFragment}
  query QUERY_ALL_VIDEOS {
    videos {
      ...VideoDetails
    }
  }
`;

export const MUTATION_UPDATE_VIEW = gql`
  ${videoFragment}
  mutation MUTATION_UPDATE_VIEWS($id: ID!) {
    increasevideonumberofviews(id: $id) {
      ...VideoDetails
    }
  }
`;

export const MUTATION_ADD_VIDEO = gql`
  ${videoFragment}
  mutation MUTATION_ADD_VIDEO($video: VideoInputType) {
    addvideo(video: $video) {
      ...VideoDetails
    }
  }
`;
