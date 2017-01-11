import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import { Card, CardSection, Input } from '../common'

class TestForm extends Component {
  render() {
    return (
      <Card style={{ height: '600px', display: 'flex', flexDirection: 'column'}}>
      <CardSection>
        <Input label='naam' style={styles.inputStyle} />
      </CardSection>
      <Divider />
      <CardSection>
        <Input label='adres' />
      </CardSection>    
            <Divider />  
      </Card>
    );
  }
}

const styles = {
  labelStyle: {
    padding: '10px',
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputStyle: {
    marginLeft: '10px',
    fontSize: 18
  }
}

export default TestForm;