import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { CardSection, Card, Input, MyDatePicker } from '../common'
import {  SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import UserAvatar  from 'react-user-avatar'
import styled from 'styled-components';
import { createCourse } from '../actions';
import teams from './teams'



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


class Addcourse extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values) {
    const { crs_title, crs_description, crs_team, crs_hours, crs_link} = values;
    const result = await this.props.createCourse(values);
    window.alert(`You submitted Parent:\n\n${JSON.stringify(result, null, 2)}`)
   window.location.href = '/courses'
  }

  

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div>      

      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <CardSection style={{ fontSize:'36px', fontFamily:'Oswald'}}>
        Add Training Course
      </CardSection>
      <Card>
      <CardSection>
          <StyledField name='title' hintText='Title'  underlineShow={true} component={Input} />  
        
             <Field name= 'hours' hintText='Number of Hours' underlineShow={true}  component={Input} style={{ flex: 2}}/>hours 
      </CardSection>
      <CardSection>
          <StyledField name = 'description' hintText='Description' underlineShow={true} component={Input} fullWidth={true}/>  
      </CardSection>
      <CardSection>
          <Field name="team" component={SelectField} hintText="Select a team" style={{ flex: 2}}>
            {teams().map(team=>  <MenuItem key={team.id} value={team.name} primaryText={team.name}/> )}
          </Field> 
        
      </CardSection>
      <CardSection>
          <Field name='link' hintText='Link' component={Input}/>  
      </CardSection>
       <Divider/>
        <CardSection>
          <StyledButton primary={true} label='Submit'  type='submit' />
          <StyledButton  secondary={true} label='Cancel'   type='reset' onClick={()=>  window.location.href = '/courses'}  />
        </CardSection>
      </Card>

    </form>
     </div>)
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

const selector = formValueSelector('addcourse')

Addcourse= reduxForm({
  form: 'addcourse',
   enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Addcourse)

Addcourse = connect(
  state => { 
    const team = selector(state, 'team')
    const title = selector(state, 'title')
    const description = selector(state, 'description')
    const hours = selector(state, 'hours') || 4
    const link = selector(state, 'link')
    return {
      initialValues: {
        crs_team: team,
        crs_title: title,
        crs_description: description,
        crs_hours: hours,
        crs_link: link,
        hours: hours|| 4
      }
    }

  }, {createCourse})(Addcourse)

export default Addcourse;
