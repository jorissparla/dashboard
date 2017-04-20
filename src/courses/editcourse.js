import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { CardSection, Card, Input, MyDatePicker } from '../common'
import {  SelectField , DatePicker} from 'redux-form-material-ui';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import UserAvatar  from 'react-user-avatar'
import styled from 'styled-components';
import { updateCourse, fetchCourse, findStudents } from '../actions';
import teams from './teams';
import coursetypes from './types';
import Enrolled from './enrolledialog';



const buttonStyleCancel = {
  backgroundColor: 'black',
  labelColor: 'white',
}

const StyledField= styled(Field)`
  margin-right: 5px;
`

const StyledButton = styled(RaisedButton)`
  margin: 5px;
`

const SelectStyle = styled.div`
  margin: 5px;
  width: 25%;
`

class EditCourse extends React.Component {
    state = {
    open: false,
    msgopen: false,
    msgText: ''
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenDialog () {
    window.alert('Open!')
    this.setState({open: true});
  }

  handleRequestClose = () => {
      this.setState({
        msgopen: false,
        msgText: ''
      });
    };
  async handleSubmit(values) {
    const { crs_title, crs_description, crs_team, crs_hours, crs_link, crs_type, crs_daten} = values;
    const result = await this.props.updateCourse(values);
    console.log('values',values)
    const status = (result.payload.status ===200)? `Success`: `Error: ${result.payload.status}`;
    await this.setState({ msgopen: true, msgText:status})
   setInterval(()=>window.location.href = '/courses', 3000)
   // window.alert(`You submitted Data:\n\n${result.payload.status}`)
   
  }
  async componentDidMount() {
    const id = this.props.params.crs_UIC;
    await this.props.fetchCourse(id)
    await this.props.findStudents(id);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, course , students} = this.props
    return (
      <div>      

      <form onSubmit={handleSubmit(this.handleSubmit)}>
      <Paper zDepth={3}>
        <CardSection style={{ fontSize:'36px', fontFamily:'Oswald'}}>
        Edit Training Course
        </CardSection>
      </Paper>
      <Card>
      <CardSection>
        <Field name='crs_title' hintText='Title'  underlineShow={true} component={Input} floatingLabelText="title"/>  
        <Field name= 'crs_hours' hintText='Number of Hours' underlineShow={true}  component={Input} floatingLabelText="hours" style={{ flex: 2}}/>hours 
      </CardSection>
      <CardSection>
          <StyledField name = 'crs_description' hintText='Description' underlineShow={true} component={Input} fullWidth={true}/>  
      </CardSection>
      <CardSection>
        <SelectStyle>
          <Field name="crs_team" component={SelectField} hintText="Select a team" floatingLabelText="team" style={{ flex: 2}}>
            {teams().map(team=>  <MenuItem key={team.id} value={team.name} primaryText={team.name}/> )}
          </Field> 
          </SelectStyle>
          <SelectStyle>
             <Field name="crs_type" component={SelectField} hintText="Select a type" floatingLabelText="type" style={{ flex: 2}}>
            {coursetypes().map(type=>  <MenuItem key={type.id} value={type.name} primaryText={type.name}/> )}
          </Field>  
          </SelectStyle> 
          <SelectStyle>
            <Field name='crs_date' hintText='date' component={MyDatePicker} floatingLabelText='date' 
            format={(value, name) => { 
                console.log('value being passed:', value);
                console.log('is of type:', typeof value);
                return value === '' ? null : (typeof value ==='string')? new Date(value) : value
            }}          
          autoOk={true} />
          </SelectStyle>   
      </CardSection>
      <CardSection>
          <Field name='crs_link' hintText='Link' component={Input} floatingLabelText ="link" fullWidth={true}/>  

      </CardSection>
       <Divider/>
        <CardSection>
          <StyledButton primary={true} label='Submit'  type='submit' />
          <StyledButton  secondary={true} label='Cancel'   type='reset' onClick={()=>  window.location.href = '/courses'}  />
          <Enrolled course={course} students={students}/>
        </CardSection>
        
      </Card>

    </form>
    <Snackbar 
      style={{
    top: 0,
    bottom: 'auto',
    left: (window.innerWidth - 288) / 2,
    transform: this.state.msgText ?
        'translate3d(0, 0, 0)' :
        `translate3d(0, -150px, 0)`
}}
      open={this.state.msgopen}
      message={this.state.msgText}
      autoHideDuration={4000}
      onRequestClose={this.handleRequestClose}
    />
     </div>)
  }


}


EditCourse= reduxForm({ form: 'editcourse',  enableReinitialize: true})(EditCourse)

const mapStateToProps = (state) => {
  return {  course: state.courses.course, initialValues : state.courses.course, students: state.courses.students }
}

export default connect(mapStateToProps, {updateCourse, fetchCourse, findStudents})(EditCourse)

