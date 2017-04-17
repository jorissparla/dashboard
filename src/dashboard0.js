import React from 'react'

import KudoListComponent0 from './kudos/kudolistcomponent0'
import NewsCardContainer0 from './news/newscardcontainer0'
import GoLiveListSide from './golives/golivelistside'
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const DashGrid = styled.div`
  display: flex;
  justify-content: space-between;
`
const DashColLeft = styled.div`
  padding: 3px;
  width: 18%;
`
const DashColRight = styled.div`
  width: 35%;
  padding: 3px;
`

const DashColRightCard = styled(Paper)`
  width: 38%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 30%;
`


const Dashboard0 = () => {
  return (
    <DashGrid>
     <DashColLeft>
        <GoLiveListSide nrItems={10} />
      </DashColLeft>
      <DashColRightCard>
          <NewsCardContainer0 refreshRate={33000} />
        </DashColRightCard>
        <DashColRight zDepth={1}>
          <KudoListComponent0 refreshRate={10000} showNumberKudos={4} />
        </DashColRight>
    </DashGrid>
  )
}

export default Dashboard0
