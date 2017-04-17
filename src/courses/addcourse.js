import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { CardSection, Card, Input, MyDatePicker } from '../common'
import {  SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import UserAvatar  from 'react-user-avatar'

const teams = [
  { id: 1, name: 'Logistics'},
  { id: 2, name: 'Finance'},
  { id: 3, name: 'Tools'},
  { id: 4, name: 'General'},

]

class Addcourse extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div>      <CardSection style={{ fontSize:'36px', fontFamily:'Oswald'}}>
        Add Training Course
      </CardSection>
      <form action=''>
      <Card>
      <CardSection>
          <Input name='title' hintText='Title' />  
          <Input name = 'description' hintText='Description' />  
      </CardSection>
      <CardSection>
          <Field name="team" component={SelectField} hintText="Select a team" style={{ flex: 2}}>
            {teams.map(team=>  <MenuItem key={team.id} value={team.id} primaryText={team.name}/> )}
          </Field> 
          <Input name= 'hours' floatingLabelText='Hours' defaultValue={4} />  
      </CardSection>
      <CardSection>
          <Input name='Link' hintText='Link' />  
      </CardSection>
      </Card>

    </form>
     </div>)
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

let Addcourse= reduxForm({
  form: 'addcourse',
   enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Addcourse)


export default Addcourse;
