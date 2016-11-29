import React from 'react';
import ReactHighCharts from 'react-highcharts';

const teamColor = team => {
        switch(team) {
            case 'Tools':
                return '#90caf9'
            case 'Logistics':
                return '#ffa726'
            case 'Finance':
                return '#66bb6a'
            default:
                return '#ff0000'
        }
} 

const arColors = [
    '#c62828',
    '#90caf9',
    '#01579b', 
    '#ffa726',
    '#4db6ac',
    '#fbc02d',
    '#4527a0'
]

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
            data: [

            ],
            dataLabels: { enabled: true}
        }    
    ],
                colors: [
                '#c62828',
                '#90caf9',
                '#ffa726',
                '#4db6ac',
            ],
    title: {
        text: "Hallo"
    }
};


 const  renderSummary =(config,val, team, title, color, type, summary) => {
        const mySummary= summary.slice(); //.sort((a,b)=> a.weekNr > b.weekNr)
        const filteredSummary = mySummary
            .filter(item => item.team === team)
            .reduce(({xvalues, data}, item, index) => {
                xvalues.push(item.weekNr);
                data.push({y:item[val], color: arColors[(index % 7)]});
                return {xvalues, data};
            }, {  xvalues: [], data: [] });
        // console.log('series',config.series[0].data)
        config.xAxis.categories = filteredSummary.xvalues; 
        config.series[0] = {data : filteredSummary.data, name: team, team: team, 
             type: type, dataLabels: { enabled: true}} 
        config.title.text = title;
        return config;
    }

const summaryChart = ({value, team, title, color, type, data}) => {
        
        console.log('Appchart',team, data)
        //console.log('Render()', this.props, this.state);
        const newConfig = renderSummary(config, value, team, title, color, type, data)
        return (
            <div className="col s4">
                <div className="card">
                <ReactHighCharts config={newConfig}/>
                </div>
            </div>
        );
    }
export default summaryChart;
