import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import StudentList from './studentlist'


const customContentStyle = {
  width: '100%',
  height: '100%',
  top: 10,
  left: 10,
  maxWidth: 'none',
};

const StyledButton = styled(RaisedButton)`
  margin: 5px;
`

export default class EnrolledDialog extends React.Component {
  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.handleCount=this.handleCount.bind(this)
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  handleCount (nr) {
    this.setState({count: nr})
  }

  componentDidMount() {
    this.setState({count: this.props.students.length})
  }
  render() {
    const actions = [
      <StyledButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <StyledButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const { course, students } = this.props;
    return (
      
      <div>
        <StyledButton label={`${this.state.count|| students.length} enrolled`} onTouchTap={this.handleOpen} />
        <Dialog
          title={`Add Students to this course: ${course.crs_title}`}
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <StudentList  course={course} onCount={this.handleCount}/>
        </Dialog>
      </div>
    );
  }
}