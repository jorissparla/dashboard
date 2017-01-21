import React from 'react'
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form'
import { CardSection, Card, Input, MyDatePicker } from '../common'
import {  SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import UserAvatar  from 'react-user-avatar'


const MyAvatar = ({input, name, avatarName,...custom} ) => {
  console.log('avatarName',avatarName, name, input)
  return (
    <UserAvatar 
        size="48" 
        style={{ fontFamily:'Oswald', fontSize:'18px'}} 
        name={input.value || avatarName} 
        {...custom}
        colors={['#BA68C8', '#81D4FA', '#FF7043','#8BC34A','#FFFF00','#E57373']}
      />
  ) 
}

const styles = {
  inputStyle: {
    flex: 1,
    padding: '20px'
  }
}

const buttonStyle = {
  backgroundColor: '#ffc600',
  labelColor: 'white',
  margin: '20px'
}
const buttonStyle2 = {
  backgroundColor: 'black',
  labelColor: 'white',
  margin: '20px'
}

const teams = [
  {key:'Finance', description: 'Finance'},
  {key:'Logistics', description: 'Logistics'},
  {key:'Tools', description: 'Tools'}
  ]

class ChatAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {  dataSource: []  };
  }
  
  componentDidMount() {
    
  }
  
  doSubmit(values) {
    window.alert(`You submitted Parent:\n\n${JSON.stringify(values, null, 2)}`)
  }

   handleUpdateInput (value) {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  }
  render() {
  const { handleSubmit, ranges, onSave, onCancel } = this.props
  const team  = this.state.team || 'No'
  console.log('STATE', this.state, team)
  if (!ranges) {
    return <CardSection>Loading...</CardSection>
  }
    return (
      <div>
      <CardSection style={{ fontSize:'36px', fontFamily:'Oswald'}}>
        Add Chat Result
      </CardSection> 
      <form onSubmit={handleSubmit(onSave)}>

          <CardSection style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Field name="team" component={SelectField} hintText="Select a team" style={{ flex: 2}}>
            {teams.map(team=>  <MenuItem key={team.key} value={team.key} primaryText={team.description}/> )}
          </Field>
          <Field name='av' component={MyAvatar} defaultValue='Ok' avatarName='OK' style={{ flex: 1, alignItems: 'center'}}/>
          </CardSection>
          <CardSection>
          <Field name="weeknr" component={SelectField} hintText="Select a week">
            {ranges.map(range =>  <MenuItem key={range.Name} value={range.Name} primaryText={range.Name}/> )}
         </Field>
          </CardSection>
  
        <CardSection id='inputboxes'>
          <Field 
            style={styles.inputStyle}
            name='nrchats'
            floatingLabelText='Number of chats'
            component={Input}
            type='text'
            width={2}
            fullWidth={false}
          />
          <Field
            style={styles.inputStyle}
            name='responseintime'
            floatingLabelText='Responded in time'
            component={Input}
            type='text'
            fullWidth={false}
          />
          <Field
            style={styles.inputStyle}
            name='percentage'
            floatingLabelText='Responded in time'
            component={Input}
            type='text'
            fullWidth={false}
          />
        </CardSection>    
         <Divider/>
        <CardSection>
          <RaisedButton primary={true} style={buttonStyle} label='Submit'  type='submit' />
          <RaisedButton  secondary={true} style={buttonStyle2} label='Cancel'  onClick={onCancel} type='reset' />
        </CardSection>
      </form>  
      </div>
    )
  }
}



let ChatAddForm= reduxForm({
  form: 'chatadd',
   enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ChatAdd)

const selector = formValueSelector('chatadd')

ChatAddForm = connect(
  state => { 
    const weeknr = selector(state, 'weeknr')
    const team = selector(state, 'team')
    const nrchats = selector(state, 'nrchats') || 0
    const responseintime = Math.min(nrchats, selector(state, 'responseintime') || 0)
    let percentage = 0
    if (nrchats !== 0) {
      percentage = (100 * responseintime / nrchats).toFixed(1)
    }
    if (!state.summary.ranges) return {}
    const selectedRange = state.summary.ranges.find(range=>range.Name === weeknr)
    if (!weeknr) return {}
    return {
      initialValues: {
        team,
        weeknr,
        nrchats,
        av: team,
        responseintime,
        percentage: `${percentage} %`,

        fromDate: selectedRange.FromDate 
      }
    }
  })(ChatAddForm)

  export default ChatAddForm;