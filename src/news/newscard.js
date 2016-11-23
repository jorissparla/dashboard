import React from 'react';

const NewsCard = props => {

        const newsItem = props.data
       
      //  console.log('Card', newsItem)
        if (!newsItem) {
            return <div></div>
        }
         console.log('NEWSCARD', props.data)
        return (
            
                <div className="col s3">
                    <div className="card">
                        <div className="card-image">
                            <img src={newsItem.img} alt=""/>
                            <span className="card-title">{newsItem.title}</span>
                        </div>
                        <div className="card-content">
                            <p>{newsItem.body}.</p>
                        </div>
                        <div className="card-action">
                            <a href={newsItem.link}>{newsItem.link_text}</a>
                        </div>
                    </div>
                </div>
        );
    }


export default NewsCard;
