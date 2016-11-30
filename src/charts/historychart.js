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
    yAxis: {
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


 const  renderSummary =(config,xval, val, title, color, type, summary) => {
        xval = (!xval) ? "weekNr":xval;
        const range = summary.map(item=> item[val] )

        const filteredSummary = summary //.sort((a,b)=> a.row > b.row)
            .reduce(({xvalues, data}, item) => {
                xvalues.push(item[xval]);
                data.push(item[val]);
                return {xvalues, data};
            }, {  xvalues: [], data: [] });
        config.xAxis.categories = filteredSummary.xvalues; 
        if (range.length >0 ) {
            config.yAxis = {};
            config.yAxis.floor = Math.floor(Math.min(...range)/10 -1)*10;
            config.yAxis.ceiling = Math.floor(Math.max(...range)/10 +1)*10;
        }


        config.series[0] = {data : filteredSummary.data, name: xval, color: color, type: type, dataLabels: { enabled: true}} 
        config.title.text = title;
        return config;
    }

const historyChart = ({xvalue, value,  title, color, type, data}) => {
        
        
        const newConfig = renderSummary(config, xvalue, value,  title, color, type, data)
        return (
            <div className="col s4">
                <div className="card">
                <ReactHighCharts config={newConfig}/>
                </div>
            </div>
        );
    }
export default historyChart;
