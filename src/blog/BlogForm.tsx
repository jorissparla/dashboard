import { useMutation } from "@apollo/client";
import HTMLEditor from "common/HTMLEditor";
import TextInput from "elements/TextInput";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { format } from "utils/format";
import SafeDeleteButton from "videos/SafeDeleteButton";
import { ADD_BLOG_MUTATION, ALL_BLOGS_QUERY, DELETE_BLOG_MUTATION, UPDATE_BLOG_MUTATION } from "./queries";

export type BlogProps = {
  id?: string;
  created?: string;
  creator: string;
  title: string;
  content: string;
  __typename?: string;
};
type Blog = BlogProps;

const BlogForm: React.FC<{ blog: BlogProps; enabled: boolean }> = ({ blog, enabled = false }) => {
  const history = useHistory();

  const [values, setValues] = useState(blog);

  const config = enabled
    ? {
        ckfinder: {
          uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
        },
      }
    : {
        toolbar: "",
      };

  const [addBlogMutation] = useMutation(ADD_BLOG_MUTATION, { refetchQueries: [{ query: ALL_BLOGS_QUERY }] });
  const [updateBlogMutation] = useMutation(UPDATE_BLOG_MUTATION, { refetchQueries: [{ query: ALL_BLOGS_QUERY }] });
  const [deleteBlogMutation] = useMutation(DELETE_BLOG_MUTATION, { refetchQueries: [{ query: ALL_BLOGS_QUERY }] });

  // let initialValues = { created: Date.now(), creator:}

  const alert = useAlert();
  async function addBlogEntry() {
    if (values.id) {
      const where = { id: values.id };
      const input = { ...values };
      delete input.created;
      delete input?.__typename;
      delete input.id;
      const res = await updateBlogMutation({ variables: { where, input } });
      console.log(res);
      alert.setMessage("blog entry updated");
    } else {
      const input = values;
      const res = await addBlogMutation({ variables: { input } });
      console.log(res);
      alert.setMessage("blog entry added");
    }
    if (alert) {
    }
  }
  async function handleDeleteBlogEntry() {
    if (values.id) {
      const where = { id: values.id };
      const res = await deleteBlogMutation({ variables: { where } });
      alert.setMessage("blog entry deleted");
      history.push("/blogs");
    }
    if (alert) {
    }
  }
  function handleChange(e: any) {
    if (enabled) setValues({ ...values, [e.target.name]: e.target.value });
  }
  console.log("render", config);
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white rounded shadow-xl p-2 m-2">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-black">{values.id ? (enabled ? "Edit" : "View") : "Add"} Blog Entry</h2>
            <TWButton onClick={() => history.push("/blogs")}>Back to List</TWButton>
            {enabled && (
              <div className="flex">
                <TWButton color="teal" onClick={addBlogEntry}>
                  Save
                </TWButton>
                <SafeDeleteButton onDelete={handleDeleteBlogEntry}>Delete</SafeDeleteButton>
              </div>
            )}
          </header>
        </section>
        <div className="flex flex-col justify-between">
          <div>
            <div>
              {enabled ? (
                <TextInput label="title" name="title" value={values.title} onChange={handleChange} />
              ) : (
                <div className="text-xl font-bold text-gray-700">{values.title}</div>
              )}
            </div>
            <HTMLEditor enabled={enabled} value={values.content} onChange={(v) => console.log(v)} label={enabled ? "Content" : " "} />
          </div>
          <div className="flex text-xs text-gray-600 mt-2 ">
            created by <span className="font-semibold px-2">{values.creator} </span> on {format(values.created, "EEEE, do MMM yyyy, HH:mi")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
