import { useParams } from "react-router";
import BlogForm, { BlogProps } from "./BlogForm";
import { useQuery, gql } from "@apollo/client";
import { useUserContext } from "globalState/UserProvider";
import React, { useState, useEffect } from "react";
import Spinner from "utils/spinner";
const SINGLE_BLOG_QUERY = gql`
  query SINGLE_BLOG_QUERY($id: ID) {
    blog(id: $id) {
      id
      created
      creator
      title
      content
    }
  }
`;

function useBlogPermissions() {
  const { user, hasPermissions } = useUserContext();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (user) {
      if (hasPermissions(user, ["ADMIN"])) {
        console.log("tes");
        setEnabled(true);
      }
    }
  }, [user]);
  return [enabled];
}

const EditBlog = () => {
  const { id }: { id: string } = useParams();
  const { data, loading } = useQuery(SINGLE_BLOG_QUERY, { variables: { id } });
  const [enabled] = useBlogPermissions();
  if (loading) {
    return <Spinner />;
  }
  if (!data?.blog) return <div>Data not found</div>;
  const { blog } = data;
  return (
    <div>
      <BlogForm blog={blog} enabled={enabled}></BlogForm>
    </div>
  );
};

export default EditBlog;
