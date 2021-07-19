import React, { useState } from "react";

import SafeDeleteButton from "../elements/SafeDeleteButton";
import { TWFileUpload } from "../common/FileUploaderNew";
import { useHistory } from "react-router";

const NewsItem = ({ initialValues: newsitem, onSave, onDelete, onCancel, title, classes }) => {
  const history = useHistory();

  const handleDelete = (e) => {
    onDelete(newsitem.id);
  };
  const [imageFile, setImageFile] = useState(newsitem.img || "");
  const [values, setValues] = useState(newsitem);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res = { ...values, img: imageFile };
    console.log("onSubmit", { ...values, img: imageFile });
    onSave(res);
  }
  return (
    <div className="flex items-center flex-col h-screen bg-gray-100 mt-4">
      <div className="bg-white shadow rounded-xl p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="font-pop text-4xl">{title}</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-start">
              <TWFileUpload
                link={`\\\\nlbavwixs.infor.com\\images\\news\\`}
                httpLinkPrefix={`https://nlbavwixs.infor.com/images/news/`}
                label="Select Image File"
                type="image/*"
                setFile={async (value) => {
                  console.log("NewsItem:::", value);
                  setImageFile(value);
                }}
              />
            </div>
            <div
              style={{ width: "70vw" }}
              name="img"
              className="text-gray-600  border-b border-cool-gray-100 mt-2 mb-2"
              // onChange={e => setImageFile(e.target.value)}
              value={imageFile}
              // value={values.img}
              label="Link to Image File"
            >
              {imageFile || "Link to image file will be found here"}
            </div>
            <img
              src={imageFile || "https://nlbavwixs.infor.com/images/news/Imagewillbehere.png"}
              alt=""
              className=" max-h-96 w-full object-cover mb-2"
            />
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="w-full appearance-none border rounded shadow-xs py-2 px-3 text-gray-700  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                // <TextField
                type="text"
                name="title"
                // className={classes.textField}
                value={values.title}
                onChange={handleChange}
                placeholder="Enter the title of the newsitem"
                // fullWidth
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Description
              </label>
              <textarea
                className="w-full resize-none  appearance-none border rounded shadow-xs py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                // <TextField
                name="body"
                // className={classes.textField}
                value={values.body}
                onChange={handleChange}
                placeholder="Provide a detailed description"
                rows={8}
                // fullWidth
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            {onDelete && <SafeDeleteButton onDelete={handleDelete} />}
            <button className=" bg-blue-500 text-white  py-2 px-6 shadow-md rounded-lg hover:bg-blue-700" type="submit">
              Save News
            </button>
            <button
              className="ml-4 rounded-lg px-6 py-2  bg-gray-300 hover:bg-gray-200  text-gray-800 font-semibold leading-tight shadow-md"
              onClick={() => history.push("/news")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsItem;
