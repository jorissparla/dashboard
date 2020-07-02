import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import JoditEditor from "jodit-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useRef, useState } from "react";
import { withRouter, useHistory } from "react-router";
import { CardSection } from "../common";
import { useUser } from "../User";
//import { format } from 'date-fns';
import { format } from "../utils/format";
import SupportCardTags from "./SupportCardTags";
import TWButton from "elements/TWButton";
import SafeDeleteButton from "videos/SafeDeleteButton";
import { TWSelectMenu } from "elements/TWSelectMenu";
import FavoriteWrapper from "Favorite";
import { MUTATION_UPDATE_CARD_KEYWORDS } from "pages/SupportCards";
import { useMutation } from "react-apollo";

const owners = [
  { id: "Ricardo Exposito", name: "Ricardo Exposito" },
  { id: "Massimo Favaro", name: "Massimo Favaro" },
  { id: "Maribel Aguilella", name: "Maribel Aguilella" },
  { id: "Joris Sparla", name: "Joris Sparla" },
  { id: "Luis Casanova", name: "Luis Casanova" },
  { id: "Ludmilla Kolbowski", name: "Ludmilla Kolbowski" },
];

const simpOwners = owners.map((owner) => owner.name);

const SupportCardForm = (props) => {
  const {
    supportcard,
    categories = [
      { id: 1, category: "Cloud" },
      { id: 2, category: "IXS" },
    ],
    initialValues,
    onSave,
    authenticated,
    onDelete,
  } = props;
  const [updateKeywords] = useMutation(MUTATION_UPDATE_CARD_KEYWORDS);
  const handleUpdateKeywords = async (id, keywords) => {
    const input = { id, keywords };
    await updateKeywords({
      variables: {
        input,
      },
    });
  };
  // const [category, setCategory] = useState(initialValues.category);
  const [lbOpen, setlbOpen] = useState(false);
  const readOnly = !authenticated;
  const updatedAt = supportcard?.updatedAt; //: format(new Date(), "yyyy-MM-dd");
  const [values, setValues] = React.useState(initialValues);
  const history = useHistory();
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

  const handleChangeSingle = (event) => {
    setValues({ ...values, owner: event.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSave(values);
  }

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
              <CKEditor
                editor={ClassicEditor}
                disabled={readOnly}
                data={values.description}
                onInit={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log("Change", { event, editor, data });
                  setValues({ ...values, description: data });
                }}
              />
            }
          </div>
          <div className="flex items-center mb-4">
            <TWSelectMenu items={simpCategories} value={values.categoryname} onChange={handleChangeCategory} label="Enter Category" />
            <TWSelectMenu items={simpOwners} value={values.owner} onChange={handleChangeOwner} />
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
              placeholder="Link to Document"
              className="form-input  text-gray-600 w-full mb-2"
              value={values.link}
              onChange={handleChange}
              onBlur={handleChange}
            />
          ) : (
            <a href={values.link} target="_blank_" className="underline text-gray-600 w-full mb-2">
              {values.link}
            </a>
          )}
          <CardSection>
            {!readOnly && (
              <TWButton color="primary" type="submit">
                Save Card
              </TWButton>
            )}
            {!readOnly && supportcard && <SafeDeleteButton onDelete={() => onDelete(supportcard)}></SafeDeleteButton>}
            {readOnly && supportcard && (
              <TWButton color="black" onClick={() => window.open(initialValues.link)}>
                View Link
              </TWButton>
              // <Button variant="contained" color="primary" className={classes.buttonDel} onClick={() => window.open(initialValues.link)}>
              // </Button>
            )}
            <TWButton variant="contained" color="teal" onClick={() => setTimeout(history.push("/supportcard"), 500)}>
              Cancel
            </TWButton>
            <Chip style={{ margin: 4 }} label={updatedAt ? `Last updated at ${format(updatedAt, "EEE, dd MMM yyyy")}` : `Not saved yet`} />
          </CardSection>
        </form>
      </div>
    </div>
  );
};

export default SupportCardForm;
