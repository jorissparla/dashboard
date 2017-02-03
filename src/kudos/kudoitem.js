import React from 'react'
import moment from 'moment'

const DateBox = ({day, month, year}) => {
  return (<div className='DateBox'>
    <span className='month'>{month}</span>
    <span className='day'>{day}</span>
    <span className='year'>{year}</span>
  </div>)
}

const dateToDMY = (date) => {
  return {
    day: moment(date).format('DD'), month: moment(date).format('MMM'), year: moment(date).format('YYYY')
  }
}

const KudoItem = props => {
  const color = props.color || 'blue'
  const nr = props.nr || '14'
  const gender = props.gender || 'men'
  
  const imgC = props.pic ? `${props.pic}` : 'https://randomuser.me/api/portraits/' + gender + '/' + nr + '.jpg';
  console.log('IMG', imgC);
  const classC = 'card-panel col s2 roundedCorner aname  ' + color + ' lighten-2'
  const { day, month, year } = dateToDMY(props.date)
  console.log(` the date is ${day} - ${month} - ${year} from ${props.date}`)
  return (
    <div className={classC} key={props.name}>
      <div className='card-action white-text App-small-text kudoheader'>
        {props.customer.toUpperCase().substr(0, 30) || 'Kongsberg'}
      </div>
      <div className='divider' />
      <div className='card-image section'>
        <img src={imgC} alt='' className='circle ava' width='50%' />
        <DateBox day={day} month={month} year={year} />
        { /* <span className='numberBox'>{props.date}</span> */ }
      </div>
      <div className='card-content white-text kudoname'>
        {props.name}
      </div>
    </div>
  )
}

const { string, number } = React.PropTypes

KudoItem.propTypes = {
  color: string,
  name: string,
  customer: string,
  nr: number,
  date: string

}

export default KudoItem
