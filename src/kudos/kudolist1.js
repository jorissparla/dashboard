import React, {Component} from 'react'
import KudoItem from './kudoitem'
import {connect} from 'react-redux'
import {fetchKudos} from '../actions/index'
import moment from 'moment'
import Slider from 'react-slick'

const colorList = ['purple', 'orange', 'blue', 'green', 'lime lighten-2', 'red']

const gender = g => {
  if (g === 'M') {
    return 'men'
  } else {
    return 'women'
  }
}

const settings = {
  dots: true,
  fade: true,
  speed: 2000,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true

}

const indexList = [23, 34, 56, 24, 52, 19]

const getDay = date => moment(date).format('ddd, DD MMM')
// const displayNrKudos = (nr, len) => { return nr > len ? len : nr }
class KudoList1 extends Component {

  componentDidMount () {
    this.props.fetchKudos()
  }

  renderItems (kudos) {
    const nrKudos = 4
    return kudos.map((item, index) => {
      return <div><KudoItem
        name={item.ownerrep_name}
        key={index}
        customer={item.customer_name}
        color={colorList[index % nrKudos]}
        gender={gender(item.gender)}
        date={getDay(item.survey_date)}
        nr={indexList[index % nrKudos]} /></div>
    })
  }

  render () {
    console.log('Slider', Slider)
    const kudos = this.props.kudos

    if (!kudos) {
      return <div>
                Loading
            </div>
    }
    return (
      <div className='kudolist aname'>
        <h4 className='left-align'>
          <i className='material-icons'>favorite_border</i>
            Kudos ({kudos.length})
        </h4>
        <div className='kudolist'>
          <Slider {...settings}>
            {this.renderItems(kudos)}
          </Slider>
        </div>
      </div>
    )
  }
}

const { string, func, shape, integer, arrayOf } = React.PropTypes

KudoList1.propTypes = {
  fetchKudos: func,
  refreshRate: integer,
  kudos: arrayOf(shape({
    name: string,
    date: string,
    customer: string
  }))
}

const mapStateToProps = state => {
  return {kudos: state.summary.kudos}
}

export default connect(mapStateToProps, {fetchKudos})(KudoList1)
