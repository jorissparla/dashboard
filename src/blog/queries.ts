import gql from "graphql-tag";

const BlogFragment = gql`
  fragment BlogFragment on Blog {
    id
    created
    creator
    title
    content
  }
`;

export const SINGLE_BLOG_QUERY = gql`
  ${BlogFragment}
  query SINGLE_BLOG_QUERY($id: ID) {
    blog(id: $id) {
      ...BlogFragment
    }
  }
`;
export const ALL_BLOGS_QUERY = gql`
  ${BlogFragment}
  query ALL_BLOGS_QUERY {
    blogs {
      ...BlogFragment
    }
  }
`;

export const ADD_BLOG_MUTATION = gql`
  ${BlogFragment}
  mutation ADD_BLOG_MUTATION($input: BlogInput) {
    addBlog(input: $input) {
      ...BlogFragment
    }
  }
`;
export const UPDATE_BLOG_MUTATION = gql`
  ${BlogFragment}
  mutation UPDATE_BLOG_MUTATION($where: BlogWhere, $input: BlogInput) {
    updateBlog(where: $where, input: $input) {
      ...BlogFragment
    }
  }
`;
export const DELETE_BLOG_MUTATION = gql`
  ${BlogFragment}
  mutation DELETE_BLOG_MUTATION($where: BlogWhere) {
    deleteBlog(where: $where) {
      ...BlogFragment
    }
  }
`;
