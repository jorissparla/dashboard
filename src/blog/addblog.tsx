import * as React from "react";
import BlogForm from "./BlogForm";
import { useUserContext } from "globalState/UserProvider";

const AddBlog: React.FC<{}> = () => {
  const { user } = useUserContext();
  if (!user) {
    return <div>Cannot add</div>;
  }
  let blog = {
    creator: user.email,
    created: new Date().toISOString(),
    title: "new title",
    content: "<p>Replace this </p>",
  };
  return (
    <div>
      <BlogForm blog={blog} enabled={true} />
    </div>
  );
};

export default AddBlog;
