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
	            pointWidth: 50//width of the column bars irrespective of the chart size
	        },
                     column: {
                depth: 25
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

class AppChart extends Component {

    componentDidMount() {
        this
            .props
            .fetchSummary();
    }

    renderSummary(val, team, title, color, type) {
        const mySummary= this.props.summary.reverse()
        const filteredSummary = mySummary
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
        // console.log('series',config.series[0].data)
        config.xAxis.categories = filteredSummary.xvalues; 
        config.series[0] = {data : filteredSummary.data, name: team, color: color, type: type, dataLabels: { enabled: true}} 
       // config.series[1].data = filteredSummary.data;
     //   config.series[1].name = team;        
        config.title.text = title;

    }

    render() {
        const {data, title, type, value, team, color} = this.props;
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

export default connect(mapStateToProps, {fetchSummary})(AppChart);