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
import ClassicEditor from "@ckeditor/ckeditor5-build-balloon";
import React, { useRef, useState } from "react";
import { withRouter } from "react-router";
import { CardSection } from "../common";
import { useUser } from "../User";
//import { format } from 'date-fns';
import { format } from "../utils/format";
import SupportCardTags from "./SupportCardTags";
import TWButton from "elements/TWButton";
import SafeDeleteButton from "videos/SafeDeleteButton";

const owners = [
  { id: "Ricardo Exposito", name: "Ricardo Exposito" },
  { id: "Massimo Favaro", name: "Massimo Favaro" },
  { id: "Maribel Aguilella", name: "Maribel Aguilella" },
  { id: "Joris Sparla", name: "Joris Sparla" },
  { id: "Luis Casanova", name: "Luis Casanova" },
];

const paperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "15px",
  padding: "10px",
  minWidth: "200px",
};

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
  },
  button2: {
    margin: theme.spacing(1),
    height: "40px",
    fontSize: "24px",
    backgroundColor: "palevioletred",
  },

  buttonDel: {
    margin: theme.spacing(1),
    backgroundColor: "#000",
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: "100%",
  },
  titleField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "40px",
    color: "#039BE5",
    fontWeight: 900,
  },
  content: {
    display: "flex",
  },
  contentField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#eeeeee99",
    fontSize: 40,
    minHeight: "50vh",
  },
  dense: {
    marginTop: 19,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  markdown2: {
    width: "50vw",
    marginLeft: 10,
    height: "70vh",
    overflow: "scroll",
  },
  markdown: {
    width: "90vw",
    height: "60vh",
    overflow: "scroll",
  },
  menu: {
    width: 200,
  },
});

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
    history,
    classes,
  } = props;
  const [category, setCategory] = useState(initialValues.category);
  const readOnly = !authenticated;
  const updatedAt = supportcard?.updatedAt; //: format(new Date(), "yyyy-MM-dd");
  const [values, setValues] = React.useState(initialValues);
  const currentUser = useUser();

  const handleChange = (event) => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSingle = (event) => {
    setValues({ ...values, owner: event.target.value });
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    toolbar: true,
    // theme: 'dark',
    autoHeight: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
  };
  const editor = useRef(null);
  const viewer = useRef(null);
  const config2 = { ...config, toolbar: false, readonly: true };

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
            <input
              id="title"
              name="title"
              className="form-input text-blue-400 font-semibold  text-xl w-full"
              value={values.title}
              onChange={handleChange}
              type="text"
            />
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
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            }
          </div>
          <div className="flex items-center mb-4">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category-simple">Category</InputLabel>
              <Select
                value={values.categoryname}
                onChange={handleChange}
                disabled={readOnly}
                inputProps={{
                  name: "categoryname",
                  id: "category-simple",
                }}
              >
                {categories.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="owner">Owner</InputLabel>
              <Select
                value={values.owner}
                onChange={handleChange}
                disabled={readOnly}
                inputProps={{
                  name: "owner",
                  id: "owner",
                }}
              >
                {owners.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full mb-4" disabled={readOnly}>
            {supportcard && <SupportCardTags id={supportcard?.id} keywords={supportcard?.keywords} readOnly={readOnly} />}
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
              <React.Fragment>
                <TWButton color="primary" type="submit">
                  Save Card
                </TWButton>
              </React.Fragment>
            )}
            {!readOnly && supportcard && <SafeDeleteButton onDelete={() => onDelete(supportcard)}></SafeDeleteButton>}
            {readOnly && supportcard && (
              <Button variant="contained" color="primary" className={classes.buttonDel} onClick={() => window.open(initialValues.link)}>
                View Link
              </Button>
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

export default withRouter(withStyles(styles)(SupportCardForm));
