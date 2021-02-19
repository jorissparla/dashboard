import TextInput from "elements/TextInput";
import TWButton from "elements/TWButton";
import { useAlert } from "globalState/AlertContext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SafeDeleteButton from "videos/SafeDeleteButton";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { format } from "utils/format";
import { useMutation } from "@apollo/client";
import { ADD_BLOG_MUTATION, UPDATE_BLOG_MUTATION } from "./queries";
import { hasPermission } from "utils/hasPermission";
import { useUserContext } from "globalState/UserProvider";

export type BlogProps = {
  id?: string;
  created?: string;
  creator: string;
  title: string;
  content: string;
  __typename?: string;
};
type Blog = BlogProps;

const BlogForm: React.FC<{ blog: BlogProps }> = ({ blog }) => {
  const history = useHistory();
  const { user, hasPermissions } = useUserContext();
  const [values, setValues] = useState(blog);
  const [enabled, setEnabled] = useState(false);
  const [config, setConfig] = useState<{
    toolbar?: string;
    ckfinder?: {
      uploadUrl: string;
    };
  }>({
    ckfinder: {
      uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
    },
  });
  const [addBlogMutation] = useMutation(ADD_BLOG_MUTATION);
  const [updateBlogMutation] = useMutation(UPDATE_BLOG_MUTATION);
  useEffect(() => {
    if (user) {
      if (hasPermissions(user, ["ADMIN"])) {
        console.log("tes");
        setEnabled(true);
        setConfig({
          ckfinder: {
            uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
          },
        });
      }
    }
  }, [user]);
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
  function handleBlogEntry() {
    if (alert) {
      alert.setMessage("blog entry deleted");
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
            <h2 className="text-lg leading-6 font-medium text-black">{values.id ? "Edit" : "Add"} Blog Entry</h2>
            <TWButton onClick={() => history.push("/blogs")}>Back to List</TWButton>
            <div className="flex">
              <TWButton color="teal" onClick={addBlogEntry}>
                Save
              </TWButton>
              <SafeDeleteButton onDelete={handleBlogEntry}>Delete</SafeDeleteButton>
            </div>
          </header>
        </section>
        <div className="flex flex-col justify-between">
          <div>
            <div>
              <TextInput label="title" name="title" value={values.title} onChange={handleChange} />
            </div>
            <div className="mt-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <CKEditor
                editor={ClassicEditor}
                enabled={enabled}
                config={config}
                // disabled={readOnly}
                data={values.content}
                onReady={(_editor: any) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(_event: any, editor: { getData: () => any }) => {
                  const data = editor.getData();
                  // console.log("Change", { event, editor, data });
                  setValues({ ...values, content: data });
                }}
              />
            </div>
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
