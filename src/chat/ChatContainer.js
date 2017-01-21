import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchRanges, createChat } from '../actions';
import {  Card, OkCancelDialog  } from '../common';
import ChatAdd from './ChatAdd'
import Snackbar from 'material-ui/Snackbar';



const doCancel = () => {
  window.location.href = '/chat'
}
 
class ChatContainer extends Component {
  state= {
    showDialog: false,
    body: '', values: {},
    showMessage: false,
    err: ''
  }
  componentDidMount() {
    this.props.fetchRanges()
  }
  
  doSubmit  (values) {
    console.log('doSubmit')
    const { weeknr, team, nrchats, responseintime, fromDate } = values
    const mappedValues = { weeknr, team, nrchats, responseintime, fromDate }

    this.props.createChat(mappedValues).
      then(data=> {
        let err = (!data.payload.message) ? 'success' : data.payload.message
        this.setState({ showMessage: true, err:err})
      }).
      catch(error=> console.log('error',error))                    
  }

  showDialog() {
    if (!this.state.showDialog) {
      return <div></div>
    }
    return (
      <OkCancelDialog 
        body={this.state.body} 
        open={this.state.showDialog} 
        title='update Database'
        handleSubmit = { this.handleSubmit.bind(this)}
        handleCancel ={this.handleCancel.bind(this)}
      />
    )
  }  

  handleSubmit () {
    console.log('handleSubmit')
    window.alert(this.state.body)
    this.setState({showDialog: false})
    this.props.createChat(this.state.values).
      then(data=> {
        let err = (!data.payload.message) ? 'success' : data.payload.message
        this.setState({ showMessage: true, err:err})
      }).
      catch(error=> console.log('error',error))
  }
  handleCancel () {
    console.log('handleCancel')
    this.setState({showDialog: false})
  }
  render () {
    const { ranges } = this.props

    console.log('render', this.props, this.state)
    return (
      <Card >
        <ChatAdd 
          ranges={ranges} 
          onSave={this.doSubmit.bind(this)}
          onCancel={doCancel}
        
        />
        <Snackbar
          open={this.state.showMessage}
          message={this.state.err}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return { ranges: state.summary.ranges }
}


export default connect(mapStateToProps, {fetchRanges, createChat})(ChatContainer)