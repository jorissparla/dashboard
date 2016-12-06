import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNews} from '../actions/index'
import NewsCard from './newscard'
import Spinner from '../utils/spinner'

class NewsCardContainer extends Component {

  myTimer () {
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

  componentWillMount () {
    this.setState({
      index: 0
    })
  }

  componentDidMount () {
    this.props.fetchNews()
    this.setState({index: 0 })
    setInterval(this.myTimer.bind(this), this.props.refreshRate || 15000)
  }

  render () {
    let newsItem = this.props.news[this.state.index]
    if (!newsItem) {
      return <div><Spinner /></div>
    }
    newsItem = this.props.news[this.state.index]
    return (<NewsCard data={newsItem} />)
  }
}

const { func, arrayOf, object, number } = React.PropTypes

NewsCardContainer.propTypes = {
  refreshRate: number,
  fetchNews: func,
  news: arrayOf(object)

}

const mapStateToProps = (state) => {
  return {news: state.summary.news}
}

export default connect(mapStateToProps, {fetchNews})(NewsCardContainer)
