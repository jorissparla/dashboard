import React from 'react'

const NewsCard = props => {
  const newsItem = props.data
  if (!newsItem) {
    return <div>Loading</div>
  }
  return (
    <div className='col s3'>
      <div className='card'>
        <div className='card-image'>
          <img src={newsItem.img} alt='' />
          <span className='card-title'>{newsItem.title}</span>
        </div>
        <div className='card-content'>
          <p>{newsItem.body}.</p>
        </div>
        <div className='card-action'>
          <a href={newsItem.link}>{newsItem.link_text}</a>
        </div>
      </div>
    </div>
  )
}

const { string, shape } = React.PropTypes

NewsCard.propType = {
  data: shape({
    body: string,
    image: string,
    link: string,
    link_text: string,
    expire_date: string
  })
}

export default NewsCard
