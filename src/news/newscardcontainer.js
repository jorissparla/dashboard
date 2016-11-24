import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchNews} from '../actions/index';
import NewsCard from './newscard';

class NewsCardContainer extends Component {


    myTimer() {
        this.setState({
            index: this.state.index + 1,
            nrNewsItems: this.props.news.length
        })

        const {nrNewsItems, index} = this.state
        if (index > nrNewsItems - 1) {
        this.setState({
            index: 0
        })  
        }
    }
    
    componentWillMount() {
        this.setState({
            index: 0
        }) 
    }
    
    componentDidMount() {
    this.props.fetchNews()
    this.setState({ index: 0 })
     setInterval(this.myTimer.bind(this), this.props.refreshRate||15000)

    }

    render() {
     let newsItem = this.props.news[this.state.index];    
        if (!newsItem) {
            return <div>Loading...</div>
        }
        newsItem = this.props.news[this.state.index]
        return (
            <NewsCard data={newsItem} />
        );
    }
}

const mapStateToProps =(state) =>
{
   return {news: state.summary.news}
}

export default connect( mapStateToProps, {fetchNews})(NewsCardContainer);
