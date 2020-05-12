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
import React, { useRef, useState } from "react";
import { withRouter } from "react-router";
import { CardSection } from "../common";
import { useUser } from "../User";
//import { format } from 'date-fns';
import { format } from "../utils/format";
import SupportCardTags from "./SupportCardTags";

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
  const updatedAt = supportcard ? supportcard.updatedAt : format(new Date(), "yyyy-MM-dd");
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
    <Paper style={paperStyle}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          className={classes.titleField}
          value={values.title}
          onChange={handleChange}
          // onBlur={handleChange}
          margin="normal"
          disabled={readOnly}
          fullWidth
        />
        <div className={classes.content} style={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.2)", background: "rgba(0,0,0,0.05)" }}>
          {
            !readOnly ? (
              <JoditEditor
                id="description"
                name="description"
                style={{ font: "24px Arial", color: "#000" }}
                ref={editor}
                value={values.description}
                onBlur={(v) => {
                  setValues({ ...values, description: v });
                  setTimeout(() => {
                    editor.current.focus();
                  }, 50);
                }}
                // onBlur={v => setValues({ ...values, description: v })}
                // onBlur={e => console.log(e)}
                config={config}
                // tabIndex={1} // tabIndex of textarea
              />
            ) : (
              <JoditEditor
                id="description"
                name="description"
                style={{ font: "24px Arial", color: "#000" }}
                ref={viewer}
                value={values.description}
                onChange={(v) => setValues((prevState) => ({ ...prevState, description: v }))}
                onBlur={(e) => console.log(e)}
                config={config2}
                tabIndex={2} // tabIndex of textarea
              />
            )

            // <div className={classes.markdown2}>
            //   <ReactMarkdown source={values.description} escapeHtml={false} />
            // </div>
          }
        </div>
        <div className="flex items-center">
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

          <div className="w-full" disabled={readOnly}>
            {supportcard && <SupportCardTags id={supportcard?.id} keywords={supportcard?.keywords} readOnly={readOnly} />}
          </div>
        </div>
        <TextField
          id="link"
          label="Link to Document"
          className={classes.linkField}
          value={values.link}
          onChange={handleChange}
          onBlur={handleChange}
          margin="normal"
          fullWidth
        />
        <CardSection>
          {!readOnly && (
            <React.Fragment>
              <Button variant="contained" color="primary" className={classes.button} type="submit">
                Save
              </Button>
            </React.Fragment>
          )}
          {!readOnly && supportcard && (
            <Button variant="contained" color="primary" className={classes.buttonDel} onClick={() => onDelete(supportcard)}>
              Delete
            </Button>
          )}
          {readOnly && supportcard && (
            <Button variant="contained" color="primary" className={classes.buttonDel} onClick={() => window.open(initialValues.link)}>
              View Link
            </Button>
          )}
          <Button variant="contained" color="secondary" className={classes.button} onClick={() => setTimeout(history.push("/supportcard"), 500)}>
            Cancel
          </Button>
          <Chip style={{ margin: 4 }} label={`Last updated at ${format(updatedAt, "EEE, dd MMM yyyy")}`} />
        </CardSection>
      </form>
    </Paper>
  );
};

export default withRouter(withStyles(styles)(SupportCardForm));
