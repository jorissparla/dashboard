import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  background-color: #03A9F4;
  color: white;
  font-size: 18px;
`



const CourseTabs = ({tabs,handleActive}) => (
  <StyledTabs style={{backgroundColor: '#03A9F4'}}>
    {tabs.map(tab=> <Tab 
      icon={ 
      <div>

        { tab}
      </div>
      }
    />)
  } 
  </StyledTabs>
);

export default CourseTabs;