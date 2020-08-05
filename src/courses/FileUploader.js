import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import FolderOpen from "@material-ui/icons/FolderOpen";
import FileUpload from "@material-ui/icons/FileCopy";
import gql from "graphql-tag";
import { Query, Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
const PATH_PREFIX = "\\\\nlbavwdocsup1\\Training\\";
const LINK_PREFIX = "https://nlbavwdocsup1.infor.com:5001/";

const UploadButtonWrapper = styled.div`
  /* position: relative; */
  /* overflow: hidden; */
  /* display: inline-block; */
  input[type="file"] {
    /* font-size: 100px; */
    /* position: absolute; */
    /* left: 0; */
    top: 0;
    /* opacity: 0; */
  }
`;

const Thumb = styled.image`
  height: 50px;
  border: 1px solid #000;
  margin: 10px 5px 0 0;
`;

const UPLOAD_MUTATION = gql`
  mutation UPLOAD_MUTATION($files: [Upload!]!, $folder: String) {
    multipleUpload(files: $files, folder: $folder) {
      id
      path
      filename
    }
  }
`;
const viewLink = (path) => path.replace(PATH_PREFIX, LINK_PREFIX);

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
  button: {
    margin: -10,
  },
  button2: {
    marginBottom: -20,
  },
});

class FileUploader extends Component {
  state = {};
  render() {
    const { link = "\\\\nlbavwixs.infor.com\\images\\oeps", classes, readOnly = false } = this.props;
    return (
      <Mutation mutation={UPLOAD_MUTATION}>
        {(mutation, { data }) => {
          console.log("DATA", data, mutation);
          return (
            <React.Fragment>
              <Paper className={classes.root} elevation={2}>
                <Typography variant="h5" component="h2">
                  Select and Upload Files
                </Typography>
                <div>
                  <TextField id="path" label="path" className={classes.textField} value={link} margin="normal" disabled={true} />
                  {!readOnly && (
                    <React.Fragment>
                      upload Files
                      <UploadButtonWrapper>
                        <IconButton className={classes.button2} aria-label="upload" color="primary">
                          <FileUpload />
                        </IconButton>
                        <input
                          type="file"
                          multiple
                          required
                          onChange={({ target: { validity, files } }) => {
                            console.log("files", files, link);
                            return (
                              validity.valid &&
                              mutation({
                                variables: { files, folder: link },
                              })
                            );
                          }}
                        />
                      </UploadButtonWrapper>
                      {/* <input type="file" placeholder="select file" accept="image/*" /> */}
                    </React.Fragment>
                  )}
                  View files
                  <IconButton className={classes.button} aria-label="Delete" color="secondary" onClick={() => window.open(viewLink(link))}>
                    <FolderOpen />
                  </IconButton>
                </div>
              </Paper>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(FileUploader);
