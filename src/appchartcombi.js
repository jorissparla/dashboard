import React, {Component} from 'react';
import ReactHighCharts from 'react-highcharts';
import {connect} from 'react-redux';
import {fetchSummary} from './actions/index'


const config = {
    chart: {
        type: 'column'
    },
                options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            },
    xAxis: {
        categories: [

        ]
    },
    	    plotOptions: {
	        series: {
	            pointWidth: 20//width of the column bars irrespective of the chart size
	        }
	    },
    series: [
        {
            name: 'Tools',
            type: 'column',
            color: '#ffb300',
            data: [

            ],
            dataLabels: { enabled: true}
        }    
    ],
    title: {
        text: "Hallo"
    }
};

class AppChartCombi extends Component {

    componentDidMount() {
        this.props.fetchSummary();
    }

    renderSummary(val, team, title, color, type) {
        // first get all teams
        let teams = []
        const mySummary= this.props.summary.reverse()
        mySummary.map(({team}) => {
            if (teams.indexOf(team) === -1 )
                teams.push(team)  
                return team  
        })
        config.series=[]
        // now loop through teams
        teams.map(team => {
            let filteredSummary = mySummary
                .filter(item => item.team === team)
                .reduce(({
                    xvalues,
                    data
                }, item) => {
                    xvalues.push(item.weekNr);
                    data.push(item[val]);
                    return {xvalues, data};
                }, {
                    xvalues: [],
                    data: []
                });
                config.series.push({ name: team, data: filteredSummary.data, type:type, dataLabels: { enabled: true}})
                config.xAxis.categories = filteredSummary.xvalues;
                return team
        })

        // console.log('series',config.series[0].data)

        config.title.text = title;

    }

    render() {
        const { title, type, value, team, color} = this.props;
        //console.log('Render()', this.props, this.state);
        this.renderSummary(value, team, title, color, type)
        return (
            <div className="col s3">
                <div className="card">
                <ReactHighCharts config={config}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {summary: state.summary.summary}
}

export default connect(mapStateToProps, {fetchSummary})(AppChartCombi);