import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { CardSection, Card, Input, MyDatePicker } from '../common'
import {  SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import UserAvatar  from 'react-user-avatar'
import styled from 'styled-components';
import { updateCourse, fetchCourse, findStudents } from '../actions';
import teams from './teams';
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

class EditCourse extends React.Component {
    state = {
    open: false,
  };

  constructor() {
    super();
    console.log('loaded')
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenDialog () {
    window.alert('Open!')
    this.setState({open: true});
  }

  async handleSubmit(values) {
    const { crs_title, crs_description, crs_team, crs_hours, crs_link} = values;
    const result = await this.props.updateCourse(values);
    window.alert(`You submitted Parent:\n\n${JSON.stringify(result, null, 2)}`)
   window.location.href = '/courses'
  }
  async componentDidMount() {
    const id = this.props.params.crs_UIC;
    await this.props.fetchCourse(id)
    await this.props.findStudents(id);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, course , students} = this.props
    console.log('props', this.props)
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
        <Field name='crs_title' hintText='Title'  underlineShow={true} component={Input} />  
        <Field name= 'crs_hours' hintText='Number of Hours' underlineShow={true}  component={Input} style={{ flex: 2}}/>hours 
      </CardSection>
      <CardSection>
          <StyledField name = 'crs_description' hintText='Description' underlineShow={true} component={Input} fullWidth={true}/>  
      </CardSection>
      <CardSection>
          <Field name="crs_team" component={SelectField} hintText="Select a team" style={{ flex: 2}}>
            {teams().map(team=>  <MenuItem key={team.id} value={team.name} primaryText={team.name}/> )}
          </Field> 
        
      </CardSection>
      <CardSection>
          <Field name='crs_link' hintText='Link' component={Input} fullWidth={true}/>  
      </CardSection>
       <Divider/>
        <CardSection>
          <StyledButton primary={true} label='Submit'  type='submit' />
          <StyledButton  secondary={true} label='Cancel'   type='reset' onClick={()=>  window.location.href = '/courses'}  />
          <Enrolled course={course} students={students}/>
        </CardSection>
        
      </Card>

    </form>
     </div>)
  }


}


EditCourse= reduxForm({ form: 'editcourse',  enableReinitialize: true})(EditCourse)

const mapStateToProps = (state) => {
  console.log('state', state)
  return {  course: state.courses.course, initialValues : state.courses.course, students: state.courses.students }
}

export default connect(mapStateToProps, {updateCourse, fetchCourse, findStudents})(EditCourse)

