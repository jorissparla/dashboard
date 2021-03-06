import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";

import { CardSection } from "../common";
import Chip from "@material-ui/core/Chip";
import CreatorInfo from "elements/CreatorInfo";
import FavoriteWrapper from "Favorite";
import HTMLEditor from "common/HTMLEditor";
import { MUTATION_UPDATE_CARD_KEYWORDS } from "pages/SupportCards";
import { QUERY_SINGLE_SUPPORTCARD } from "./queries/AUDIT_QUERY";
import SafeDeleteButton from "videos/SafeDeleteButton";
import SupportCardTags from "./SupportCardTags";
import TWButton from "elements/TWButton";
import { TWSelectMenu } from "elements/TWSelectMenu";
import { format } from "../utils/format";

// import { CKEditor } from "@ckeditor/ckeditor5-react";

// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//import { format } from 'date-fns';

const owners = [
  { id: "Ricardo Exposito", name: "Ricardo Exposito" },
  { id: "Massimo Favaro", name: "Massimo Favaro" },
  { id: "Doreen Auerbach", name: "Doreen Auerbach" },
  { id: "Maribel Aguilella", name: "Maribel Aguilella" },
  { id: "Joris Sparla", name: "Joris Sparla" },
  { id: "Luis Casanova", name: "Luis Casanova" },
  { id: "Ludmilla Kolbowski", name: "Ludmilla Kolbowski" },
  { id: "Other LN", name: "Other LN" },
];

const simpOwners = owners.map((owner) => owner.name);

const SupportCardForm = (props) => {
  const {
    // supportcard,
    categories = [
      { id: 1, category: "Cloud" },
      { id: 2, category: "IXS" },
    ],
    initialValues,
    onSave,
    authenticated,
    onDelete: handleDelete,
  } = props;
  const { id } = useParams();
  const [supportcard, setSupportCard] = useState(null);
  const { data, loading } = useQuery(QUERY_SINGLE_SUPPORTCARD, { variables: { id } });
  const [updateKeywords] = useMutation(MUTATION_UPDATE_CARD_KEYWORDS);
  const [values, setValues] = React.useState(initialValues);
  const history = useHistory();
  useEffect(() => {
    if (data) {
      setSupportCard(data.supportcard);
    } else {
      setSupportCard(initialValues);
    }
  }, [data, initialValues]);

  if (loading) return <div />;
  if (!supportcard) return <div />;
  console.log("Data", data);
  const handleUpdateKeywords = async (id, keywords) => {
    const input = { id, keywords };
    await updateKeywords({
      variables: {
        input,
      },
    });
  };
  // const [category, setCategory] = useState(initialValues.category);
  const readOnly = !authenticated;
  const updatedAt = supportcard?.updatedAt; //: format(new Date(), "yyyy-MM-dd");

  const simpCategories = categories.map((cat) => cat.name);

  const handleChange = (event) => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeOwner = (owner) => {
    setValues({ ...values, owner });
    // setlbOpen(false);
  };
  const handleChangeCategory = (categoryname) => {
    setValues({ ...values, categoryname });
    // setlbOpen(false);
  };

  // const handleChangeSingle = (event) => {
  //   setValues({ ...values, owner: event.target.value });
  // };

  function handleSubmit(e) {
    e.preventDefault();
    onSave(values);
  }

  const config = readOnly
    ? {
        toolbar: "",
      }
    : {
        // toolbar: "",
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
        },
      };
  console.log("🐱‍🏍", supportcard);
  return (
    <div className="bg-gray-200 h-screen w-full p-2">
      <div className="rounded shadow-lg p-4 bg-white mx-2">
        <form onSubmit={handleSubmit}>
          {!readOnly ? (
            <div className="w-full flex justify-between items-center">
              <input
                id="title"
                name="title"
                type="text"
                className="form-input text-blue-400 font-semibold  text-xl w-full"
                value={values.title}
                onChange={handleChange}
                type="text"
              />
              <FavoriteWrapper id={values.id} isFavorite={values.isFavorite} />
            </div>
          ) : (
            <div className="text-blue-400 font-semibold text-xl w-full">{values.title}</div>
          )}

          <div className="flex text-gray-600 mb-4">
            {
              // !readOnly ? (

              <HTMLEditor value={values.description} onChange={(data) => setValues({ ...values, description: data })} enabled={!readOnly} />
              // <CKEditor
              //   editor={ClassicEditor}
              //   config={config}
              //   disabled={readOnly}
              //   data={values.description}
              //   onReady={(editor) => {
              //     // You can store the "editor" and use when it is needed.
              //   }}
              //   onChange={(event, editor) => {
              //     const data = editor.getData();
              //     // console.log("Change", { event, editor, data });
              //     setValues({ ...values, description: data });
              //   }}
              // />
            }
          </div>
          <div className="flex items-center mb-4">
            <TWSelectMenu items={simpCategories} value={values.categoryname} onChange={handleChangeCategory} label="Enter Category" />
            {/* <TWSelectMenu items={simpOwners} value={values.owner} onChange={handleChangeOwner} /> */}
          </div>
          <div className="w-full mb-4" disabled={readOnly}>
            {supportcard && (
              <SupportCardTags updateKeywords={handleUpdateKeywords} id={supportcard?.id} keywords={supportcard?.keywords} readOnly={readOnly} />
            )}
          </div>
          {!readOnly ? (
            <input
              id="link"
              name="link"
              type="text"
              placeholder="Link to Document"
              className="form-input  text-gray-600 w-full mb-2"
              value={values.link}
              onChange={handleChange}
              onBlur={handleChange}
            />
          ) : (
            <a href={values.link} target="_blank_" rel="noreferrer" className="underline text-gray-600 w-full mb-2">
              {values.link}
            </a>
          )}
          <CardSection>
            {!readOnly && (
              <TWButton color="primary" type="submit">
                Save Card
              </TWButton>
            )}
            {!readOnly && supportcard && <SafeDeleteButton onDelete={() => handleDelete(supportcard)}></SafeDeleteButton>}
            {supportcard && (
              <TWButton color="black" onClick={() => window.open(initialValues.link)}>
                View Link
              </TWButton>
            )}
            <TWButton variant="contained" color="teal" onClick={() => setTimeout(history.push("/supportcard"), 500)}>
              Cancel
            </TWButton>
            <Chip style={{ margin: 4 }} label={updatedAt ? `Last updated at ${format(updatedAt, "EEE, dd MMM yyyy")}` : `Not saved yet`} />
          </CardSection>
          {/* <div className="w-full text-xs py-2 border-t border-gray-200 mt-2 tracking-tight text-gray-600">
            created by: {supportcard?.createdby} on: {supportcard?.created}, updated by: {supportcard?.updatedBy} at:{" "}
            {format(supportcard?.updatedAt, "yyyy MMM dd, HH:m")}
          </div> */}
          <div className="w-full text-xs py-2 border-t border-gray-200 mt-2 tracking-tight text-gray-600 flex space-x-4">
            <CreatorInfo creator={supportcard?.createdby} created={supportcard.created} label="created on" />
            <CreatorInfo creator={supportcard?.updatedBy} created={format(supportcard?.updatedAt, "yyyy MMM dd, HH:m")} label="updated on" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportCardForm;
