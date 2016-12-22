import React from 'react'

import './App.css'
//import AppChartCombi from './charts/appchartcombi'
import AlertWidget from './alerts/alertwidget'
import AppChartContainer from './charts/appchartcontainer'
import ChatChartContainer from './charts/chatchartcontainer'
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
            title='Support Backlog'
            refreshRate={16000} />
          <AppChartContainer
            data={['Tools', 'Logistics', 'Finance']}
            value='surveyScore'
            title='Survey'
            type='column'
            refreshRate={11000} />
          <HistoryChartContainer
            color='#ffb74d'
            refreshRate={16000} />
          <AppChartContainer
            data={['Tools', 'Logistics', 'Finance']}
            value='opened'
            title='Opened'
            color='#b39ddb'
            type='area'
            refreshRate={11000} />
          <AppChartContainer
            data={['Tools', 'Logistics', 'Finance']}
            value='Closed'
            title='Closed'
            color='#ffc600'
            type='area'
            refreshRate={11000} />
          <ChatChartContainer
            data={['Tools', 'Logistics', 'Finance']}
            title='Chats'
            type='column'
            value='percentage'
            color='#9575cd'
            refreshRate={12000} />
        </div>
      </div>

    </div>

  )
}
// <AppChartPie data={[1,2,3]} title='Input' type='pie' value='supportBacklog'
// color='#ffb300'' team='Logistics'/>
export default DashBoardStats
