import React from 'react'; const KudoItem = props => {
  const color = props.color || 'blue'
  const nr = props.nr || '14'
  const gender = props.gender || 'men'
  const imgC = 'https://randomuser.me/api/portraits/' + gender + '/' + nr + '.jpg'
  const classC = 'card-panel col s2 roundedCorner aname  ' + color + ' lighten-2'
  return (
    <div className={classC} key={props.name}>
      <div className='card-action white-text App-small-text kudoheader'>
        {props.customer.toUpperCase().substr(0, 50) || 'Kongsberg'}
      </div>
      <div className='divider' />
      <div className='card-image'>
        <img src={imgC} alt='' className='circle ava' />
        <span className='numberBox'>{props.date}</span>
      </div>
      <div className='card-content white-text kudoname'>
        {props.name}
      </div>
    </div>
  )
}

export default KudoItem
