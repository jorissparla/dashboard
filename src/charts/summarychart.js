import React from 'react';
import ReactHighCharts from 'react-highcharts';

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


 const  renderSummary =(config,val, team, title, color, type, summary) => {
        const mySummary= summary.reverse()
        const filteredSummary = mySummary
            .filter(item => item.team === team)
            .reduce(({xvalues, data}, item) => {
                xvalues.push(item.weekNr);
                data.push(item[val]);
                return {xvalues, data};
            }, {  xvalues: [], data: [] });
        // console.log('series',config.series[0].data)
        config.xAxis.categories = filteredSummary.xvalues; 
        config.series[0] = {data : filteredSummary.data, name: team, color: color, type: type, dataLabels: { enabled: true}} 
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
