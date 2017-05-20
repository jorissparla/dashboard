import React, {Component} from 'react'
//import KudoItem from './kudoitem'
import {connect} from 'react-redux'
import {fetchKudos} from '../actions/index'
import moment from 'moment'
import { GridList,  GridTile} from 'material-ui/GridList'
//import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {deepOrange500} from 'material-ui/styles/colors';
import styled from 'styled-components';
//import Paper from 'material-ui/Paper'


const H5Styled = styled.h5`
  font-family: Oswald;
`

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})

const styles = {
  root: {
    display: 'flex',

  },
  gridList: {
    width: 900,
    height: 900,
    overflowY: 'auto',
    marginTop: '5px',
    flexGrow: '0.3',
    animationName: 'insert-from-top',
    animationDuration: '3s',
    animationFillMode: 'forwards',
    opacity: 1,
        flexWrap: 'wrap',
    overflowX: 'auto',
    fontFamily: 'Oswald'
  },
  gridItem: {
    transform: 'translateX(10px)',
    transition: '1s all',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '15px',
    height: '200px',
    width: '200px'
  },
  paperStyle:  {
    margin: '2px' ,
    padding: '2px',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-around'

  }
}
const displayNrKudos = (nr, len) => { return nr > len ? len : nr }
const mapGender = g => {
  if (g === 'M') {
    return 'men'
  } else {
    return 'women'
  }
}

//const nrKudos = 4
const indexList = [23, 34, 56, 24, 52, 19]

const subTitle = (name) => <span>by <b>{name}</b></span>

//const getDay = date => moment(date).format('ddd, DD MMM')
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

const DateView = (date) => {
   const { day, month, year } = dateToDMY(date)
   return  ( <DateBox day={day} month={month} year={year} />)
}


class KudoListComponent extends Component {

 constructor (props) {
    super(props)
    this.state = {
      tijd: 0
    }
  }

  componentDidMount () {
    this.props.fetchKudos()
  }


  renderItems (kudos) {
    const nrKudos = this.props.kudos.length;
    let kl = kudos.slice(0, nrKudos)

    return kl.map(({ownerrep_name, customer_name, gender, survey_date, pic}, index) => {
      const nr = indexList[index % nrKudos]
      const mgender = mapGender(gender)
      const img = pic ? `${pic}` :`https://randomuser.me/api/portraits/${mgender}/${nr}.jpg`
      return (
      <GridTile 
       style={styles.gridItem}
        key={index}
        title={customer_name}
        subtitle={subTitle(ownerrep_name)} 
        actionIcon={DateView(survey_date)}
      >
        <img src={img} alt=''/>
      </GridTile>
      )
    })
  }

  render () {
    const kudos = this.props.kudos

    if (!kudos) {
      return <div>
                Loading
            </div>
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.root} >
        <GridList
          cellHeight={180}
          style={styles.gridList}
          cols={3}
        >
         <Subheader>          
         <H5Styled>
            <i className='material-icons'>favorite</i>
              Kudos ({kudos.length})
          </H5Styled></Subheader>
          {this.renderItems(kudos)}
        </GridList>
      </div>
      </MuiThemeProvider>
    )
  }
}

const { string, func, shape, number, arrayOf } = React.PropTypes

KudoListComponent.propTypes = {
  fetchKudos: func,
  refreshRate: number,
  kudos: arrayOf(shape({
    name: string,
    date: string,
    customer: string
  }))
}

const mapStateToProps = state => {
  return {kudos: state.summary.kudos}
}

export default connect(mapStateToProps, {fetchKudos})(KudoListComponent)