import React from 'react'

import './App.css'
import AppChartCombi from './charts/appchartcombi'
import KudoList from './kudos/kudolist1'
//import AlertWidget from './alerts/alertwidget'
import NewsCardContainer from './news/newscardcontainer'
import AppChartContainer from './charts/appchartcontainer'
import HistoryChartContainer from './charts/historycontainer'
import GoLiveList from './golives/golivelist'
import {StyleLoaderM} from './common'

const DashBoard = () => {
  return (
    <div className='row'>
     <StyleLoaderM />
      <div className='col s3'>
        <GoLiveList nrItems={10} />
      </div>
      <div className='col s9'>
        <div className='row'>
          <NewsCardContainer refreshRate={33000} />
          <KudoList refreshRate={10000} showNumberKudos={4} />
        </div>
        <div className='row'>
          <AppChartContainer data={['Tools', 'Logistics', 'Finance']} refreshRate={16000} />
          <HistoryChartContainer refreshRate={16000} />
          <AppChartCombi
            title='Surveys'
            type='column'
            value='surveyScore'
            color='#9575cd'
            team='Logistics' />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
