import React, {Component} from 'react'

import {connect} from 'react-redux'
import {fetchNews} from './actions/index'
import AppCard from './appcard'

const AppCardContainer = props => {
  const {news} = props
  let index = 1

  const myTimer = (index) => index + 1
  setInterval(myTimer, 10000)

  if (!news) {
    props.fetchNews()
  }

  return (

    <div className='test'>
      <AppCard index={index} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {news: state.summary.news}
}

export default connect(mapStateToProps, {fetchNews})(AppCardContainer)
