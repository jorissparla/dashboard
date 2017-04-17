import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

const imgList = [
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/analytics.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/storage.png',
  'https://www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png'
]


const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: 1 px solid blue;
  padding: 10px;
  width:20%;
  min-width:200px;
`

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
   object-fit: cover;
`
const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 2px;
`
const StyledBody = styled.p`
  margin: 5px;
  margin-bottom: 20px;
    font-size: 15px;
`

export default ({course, index}) => {
  const image = imgList[index % 3]
  return (
    <StyledContainer key={course.crs_UIC}>
      <StyledImage src={image} />
      <Title>
        { course.crs_title }
      </Title>
      <StyledBody>
        { course.crs_description }
      </StyledBody>
    </StyledContainer>
  )
}