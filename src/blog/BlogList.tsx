import { ALL_BLOGS_QUERY } from "./queries";
import { BlogProps } from "./BlogForm";
import CreatorInfo from "elements/CreatorInfo";
import React from "react";
import SafeDeleteButton from "elements/SafeDeleteButton";
import Spinner from "utils/spinner";
import TWButton from "elements/TWButton";
import { format } from "utils/format";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import { values } from "lodash";

const BlogList = () => {
  const { data, loading } = useQuery(ALL_BLOGS_QUERY);
  const history = useHistory();
  if (loading) return <Spinner />;
  const blogs: BlogProps[] = data.blogs;
  return (
    <div className="bg-gray-100 h-screen">
      <div className="rounded p-2 m-2 shadow-lg bg-white">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-black">LN Support Blog</h2>
            <div className="flex">
              <TWButton color="teal" onClick={() => history.push("/addblog")}>
                New
              </TWButton>
            </div>
          </header>
        </section>
      </div>
      <div className="pl-4 mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {blogs.map((blog) => (
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-32 w-full object-cover"
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixqx=uZDt5cC8cT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="text-xl font-semibold text-gray-900 mt-1">{blog.title}</div>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} className="border-t border-gray-100  max-h-72 mb-2 overflow-hidden"></div>
              <TWButton className="w-48" color="teal" onClick={() => history.push(`/blog/${blog.id}`)}>
                View Details
              </TWButton>
              <CreatorInfo created={format(blog.created, "EEEE, do MMM yyyy, HH:m")} creator={blog.creator} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
