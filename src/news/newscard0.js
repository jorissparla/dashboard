import React from 'react'
import Divider from 'material-ui/Divider';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
   object-fit: cover;
`
const Title = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 800;
  padding: 10px;
`
const StyledBody = styled.p`
  margin: 20px;
  margin-bottom: 20px;
    font-size: 15px;
`
const NewsCard0 = props => {
  const newsItem = props.data
  if (!newsItem) {
    return <div>Loading</div>
  }
  return (
    <div>
      <StyledImage src={ newsItem.img } alt='' />
      <Title>
        { newsItem.title }
      </Title>
      <StyledBody>
        { newsItem.body }.</StyledBody>
    </div>

  )
}

const {string, shape} = React.PropTypes

NewsCard0.propType = {
  data: shape({
    body: string,
    image: string,
    link: string,
    link_text: string,
    expire_date: string
  })
}

export default NewsCard0
