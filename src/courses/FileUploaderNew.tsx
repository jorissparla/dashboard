import React, { Component, useReducer, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import FolderOpen from "@material-ui/icons/FolderOpen";
import FileUpload from "@material-ui/icons/FileCopy";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";
import styled from "styled-components";
const PATH_PREFIX = "\\\\nlbavwdocsup1\\Training\\";
const LINK_PREFIX = "http://nlbavwdocsup1.infor.com:5001/";
const HTTP_LINK_PREFIX = `http://nlbavwixs.infor.com/images/news/`;

const UploadButtonWrapper = styled.div`
  /* position: relative; */
  /* overflow: hidden; */
  /* display: inline-block; */
  input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

const FileInput = styled.label`
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  max-width: 164px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  line-height: 1.75;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  color: #fff;
  background-color: #524763;
  input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

const Thumb = styled.image`
  height: 50px;
  border: 1px solid #000;
  margin: 10px 5px 0 0;
`;

const UPLOAD_MUTATION = gql`
  mutation($files: [Upload!]!, $folder: String) {
    multipleUpload(files: $files, folder: $folder) {
      id
      path
      filename
    }
  }
`;

const styles: any = (theme: any) => ({
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  button: {
    margin: -10
  },
  button2: {
    marginBottom: -20
  }
});

interface Props {
  link?: string;
  classes: object;
  readOnly: boolean;
  setFile: Function;
}

export const FileUploadComponent: React.FC<Props> = ({
  link = "\\\\nlbavwixs.infor.com\\images\\news",
  classes,
  readOnly,
  setFile = () => null
}) => {
  const uploadFileMutation = useMutation(UPLOAD_MUTATION);
  const ref = useRef(null);
  return (
    <FileInput htmlFor="f1">
      <span>Upload</span>
      <input
        id="f1"
        type="file"
        multiple
        value=""
        ref={ref}
        onChange={async ({ target: { validity, files } }) => {
          const res = await uploadFileMutation({ variables: { files, folder: link } });

          if (res.data) {
            const uploadedFile = res.data.multipleUpload[0].filename;
            console.log("files", uploadedFile);
            setFile(HTTP_LINK_PREFIX + uploadedFile);
          }
        }}
      />
    </FileInput>
  );
};

// class FileUploader extends Component {
//   state = {};
//   render() {
//     const {
//       link = '\\\\nlbavwixs.infor.com\\images\\oeps',
//       classes,
//       readOnly = false
//     } = this.props;
//     return (
//       <Mutation mutation={UPLOAD_MUTATION}>
//         {(mutation, { data }) => {
//           console.log('DATA', data, mutation);
//           return (
//             <React.Fragment>
//               <Paper className={classes.root} elevation={2}>
//                 <Typography variant="h5" component="h2">
//                   Select and Upload Files
//                 </Typography>
//                 <div>
//                   <TextField
//                     id="path"
//                     label="path"
//                     className={classes.textField}
//                     value={link}
//                     margin="normal"
//                     disabled={true}
//                   />
//                   {!readOnly && (
//                     <React.Fragment>
//                       upload Files
//                       <UploadButtonWrapper>
//                         <IconButton className={classes.button2} aria-label="upload" color="primary">
//                           <FileUpload />
//                         </IconButton>
//                         <input
//                           type="file"
//                           multiple
//                           required
//                           onChange={({ target: { validity, files } }) => {
//                             console.log('files', files, link);
//                             return (
//                               validity.valid &&
//                               mutation({
//                                 variables: { files, folder: link }
//                               })
//                             );
//                           }}
//                         />
//                       </UploadButtonWrapper>
//                       {/* <input type="file" placeholder="select file" accept="image/*" /> */}
//                     </React.Fragment>
//                   )}
//                   View files
//                   <IconButton
//                     className={classes.button}
//                     aria-label="Delete"
//                     color="secondary"
//                     onClick={() => window.open(viewLink(link))}
//                   >
//                     <FolderOpen />
//                   </IconButton>
//                 </div>
//               </Paper>
//             </React.Fragment>
//           );
//         }}
//       </Mutation>
//     );
//   }
// }

export default withStyles(styles)(FileUploadComponent);
