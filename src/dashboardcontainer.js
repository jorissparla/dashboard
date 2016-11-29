import React, {Component} from 'react';
import DashBoard from './dashboard';
import DashBoardStats from './dashboardstats';
import GoLiveList from './golives/golivelist'




class DashBoardContainer extends Component {

    componentWillMount () {
    this.setState({index: 1})
    setInterval(this.myTimer.bind(this), this.props.refreshInterval || 90000)
}

    myTimer() {
        const newIndex = (this.state.index === 1? 2:1)
        this.setState({index: newIndex})
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
            //return <DashBoard/>
            return <DashBoard />
        case 2: 
            return <DashBoardStats/>
    default:
        return <div>Invali Dashboard</div>
    }
}
}
export default DashBoardContainer