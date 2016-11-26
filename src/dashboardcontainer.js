import React, {Component} from 'react';
import DashBoard from './dashboard';
import DashBoardStats from './dashboardstats';




class DashBoardContainer extends Component {

    componentWillMount () {
    this.setState({index: 2})
}

    render () {
        return (
            <div>
                {this.renderDashBoard(this.state.index)}

            </div>
        )
    }

renderDashBoard (index) {
    switch (index) {
        case 1: 
            return <DashBoard/>
        case 2: 
            return <DashBoardStats/>
    default:
        return <div>Invali Dashboard</div>
    }
}
}
export default DashBoardContainer