import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { adopt } from "react-adopt";

const PATH_PREFIX = "\\\\nlbavwdocsup1\\Training\\";
const CREATE_FOLDER = gql`
  mutation createFolder($name: String!) {
    createFolder(name: $name)
  }
`;

const UPDATE_COURSE = gql`
  mutation updateCourse($input: InputCourseType) {
    updateCourse(input: $input) {
      course {
        id
        applicable
      }
    }
  }
`;

const createFolderMutation = ({ render }) => (
  <Mutation mutation={CREATE_FOLDER}>{(mutation, result) => render({ mutation, result })}</Mutation>
);

const updateCourseMutation = ({ render }) => (
  <Mutation mutation={UPDATE_COURSE}>{(mutation, result) => render({ mutation, result })}</Mutation>
);

const mapper = {
  createFolderMutation,
  updateCourseMutation
};

const mapProps = ({ createFolderMutation, updateCourseMutation }) => ({
  createFolder: createFolderMutation.mutation,
  updateCourse: updateCourseMutation.mutation
});

const Updater = adopt(mapper, mapProps);

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CreateFolder extends Component {
  state = { folderName: "" };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { id, classes } = this.props;
    console.log(id);
    return (
      <Updater>
        {({ createFolder, updateCourse }) => {
          const onCreate = async name => {
            await createFolder({ variables: { name } });
            await updateCourse({ variables: { input: { id, link: name } } });
            (await this.props.reRender) ? this.props.reRender(name) : () => console.log("nothing");
          };
          return (
            <React.Fragment>
              <Paper className={classes.root} elevation={2}>
                <Typography variant="headline" component="h2">
                  Create Folder
                </Typography>
                <form action="">
                  {this.state.folderName.length > 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => onCreate(PATH_PREFIX + this.state.folderName)}
                    >
                      Create Folder
                    </Button>
                  )}
                  <TextField
                    id="folderName"
                    label="Name"
                    className={classes.textField}
                    value={this.state.folderName}
                    onChange={this.handleChange("folderName")}
                    margin="normal"
                  />
                </form>
              </Paper>
            </React.Fragment>
          );
        }}
      </Updater>
    );
  }
}

export default withStyles(styles)(CreateFolder);
