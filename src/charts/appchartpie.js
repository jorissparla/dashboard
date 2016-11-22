import React, {Component} from 'react';
import ReactHighCharts from 'react-highcharts';
import {connect} from 'react-redux';
import {fetchSummary} from '../actions/index'

const config = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Browser market shares at a specific website, 2014'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            },
            series: {
                dataLabels: {enabled: true}
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['Others', 0.7]
            ]
        }]
    };

class AppChartPie extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchSummary();
    }

    renderSummary(val, team, title, color, type) {

        
        // first get all teams
        let teams = []
        let mySummary= this.props.summary
        mySummary.map(({team}) => {
            if (teams.indexOf(team) === -1 )
                teams.push(team)    
        })
      //  config.series=[]
        mySummary = mySummary.slice(0, teams.length) 
        // now loop through teams
        let datas = []
        teams.map(team => {
            let filteredSummary = mySummary
                .filter(item => item.team === team)
                .reduce(({
                    xvalues,
                    data
                }, item) => {
                    xvalues.push(item.weekNr);
                    data.push(team, item[val]);
                    return {xvalues, data};
                }, {
                    xvalues: [],
                    data: []
                });
                datas.push(filteredSummary.data)
               // config.xAxis.categories = filteredSummary.xvalues;
        })
    config.series[0]  = { name: val, data: datas, type:type, dataLabels: { enabled: true}}
        // console.log('series',config.series[0].data)

        config.title.text = title;

    }

    render() {
        const {title, type, value, team, color} = this.props;
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

export default connect(mapStateToProps, {fetchSummary})(AppChartPie);