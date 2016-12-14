import React from 'react'

import './App.css'
import AppChartCombi from './charts/appchartcombi'
import AlertWidget from './alerts/alertwidget'
import AppChartContainer from './charts/appchartcontainer'
import HistoryChartContainer from './charts/historycontainer'

const DashBoardStats = () => {
  return (
    <div className='row'>
      <div className='col s2'>
        <AlertWidget />
      </div>
      <div className='col s10'>
        <div className='row'>
          <AppChartContainer
            data={['Tools', 'Logistics', 'Finance']}
            refreshRate={16000} />
          <AppChartContainer
            data={['Tools', 'Logistics', 'Finance']}
            value='surveyScore'
            title='Survey'
            type='column'
            refreshRate={11000} />
          <HistoryChartContainer refreshRate={16000} />

          <AppChartCombi
            title='Surveys'
            type='column'
            value='surveyScore'
            color='#9575cd'
            team='Logistics' />
          <AppChartCombi
            title='Input'
            type='area'
            value='opened'
            color='#ffb300'
            team='Logistics' />

        </div>
      </div>

    </div>

  )
}
// <AppChartPie data={[1,2,3]} title='Input' type='pie' value='supportBacklog'
// color='#ffb300'' team='Logistics'/>
export default DashBoardStats