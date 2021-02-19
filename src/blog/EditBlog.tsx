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
const EditBlog = () => {
  const { id }: { id: string } = useParams();
  const { data, loading } = useQuery(SINGLE_BLOG_QUERY, { variables: { id } });
  if (loading) {
    return <Spinner />;
  }
  if (!data?.blog) return <div>Data not found</div>;
  const { blog } = data;
  return (
    <div>
      <BlogForm blog={blog}></BlogForm>
    </div>
  );
};

export default EditBlog;
