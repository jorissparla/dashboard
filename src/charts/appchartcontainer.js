import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSummary} from '../actions/index'
import SummaryChart from './summarychart'


class AppChartContainer extends Component {



    myTimer() {
        const data  = (!this.props.data) ? ['Logistics']: this.props.data ;
        console.log('AppChartContainerTimer', this.state)
        this.setState({
            index: this.state.index + 1,
            nrTeams: data.length
        })

        const {nrTeams, index} = this.state;
        if (index > nrTeams - 1) {
        this.setState({
            index: 0
        })  
        }
    }
    
    componentWillMount () {
          this.setState({ index: 0 })
    }
    

    componentDidMount() {
        this.props.fetchSummary();
      
        setInterval(this.myTimer.bind(this), this.props.refreshRate||15000)

    }

    render () {
        const data  = (!this.props.data) ? ['Logistics']: this.props.data ;
       
        const team = data[this.state.index||0];
        const summary= this.props.summary.reverse();
         console.log('AppChartContainer',  data, team, summary)
        return (
            <div>
            <SummaryChart  data={summary}
                title="Backlog"
                type="line"
                value="supportBacklog"
                team={team}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {summary: state.summary.summary}
}

export default connect(mapStateToProps, {fetchSummary})(AppChartContainer);