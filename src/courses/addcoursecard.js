import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {blue500} from 'material-ui/styles/colors';
import styled from 'styled-components';


const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width:20%;
  min-width:200px;
  :hover {
    background:#2196F3;
    color: white;
  }
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 2px;
  color: #2196F3;
  align-self: center;

`
const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
`
const StyledAddIcon = styled.div`
  width:20%;
  min-width:200px;
  justify-content: center;
      align-items: center;
  display: flex;
  font-size: 48px;
  height: 150px;

`



export default () => {
  return (
    <StyledContainer>
      <StyledAddIcon>
      <FontIcon className="material-icons" color={blue500} style={{fontSize:'48px'}}>add</FontIcon>
      </StyledAddIcon>
      <Title>Add a new course</Title>
    </StyledContainer>
  )
}