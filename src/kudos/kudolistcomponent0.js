import React, { Component } from 'react'
//import KudoItem from './kudoitem'
import { connect } from 'react-redux'
import { fetchKudos } from '../actions/index'
//import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { GridList, GridTile } from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import { deepOrange500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import moment from 'moment'
//import Paper from 'material-ui/Paper'


const H5Styled = styled.div`
  font-family: Oswald;
  font-size: 24px;

`

const PaperStyled = styled(Paper)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Container = styled.div`
  font-family: Oswald;
  display: flex;
  flex-direction: column;
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
    overflowY: 'auto',
    flexGrow: '0.3',
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
    borderRadius: '10px',

  },
  paperStyle: {
    margin: '2px',
    padding: '2px',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-around'

  }
}
const displayNrKudos = (nr, len) => {
  return nr > len ? len : nr
}
const mapGender = g => {
  if (g === 'M') {
    return 'men'
  } else {
    return 'women'
  }
}

//const nrKudos = 4
const indexList = [23, 34, 56, 24, 52, 19]

const subTitle = (name) => <span>by <b>{ name }</b></span>

//const getDay = date => moment(date).format('ddd, DD MMM')
const DateBox = ({day, month, year}) => {
  return (<div className='DateBox'>
            <span className='month'>{ month }</span>
            <span className='day'>{ day }</span>
            <span className='year'>{ year }</span>
          </div>)
}

const dateToDMY = (date) => {
  return {
    day: moment(date).format('DD'),
    month: moment(date).format('MMM'),
    year: moment(date).format('YYYY')
  }
}

const DateView = (date) => {
  const {day, month, year} = dateToDMY(date)
  return ( <DateBox day={ day } month={ month } year={ year } />)
}


class KudoListComponent0 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tijd: 0
    }
  }

  componentDidMount() {
    this.props.fetchKudos()
  }


  renderItems(kudos) {
    const nrKudos = this.props.kudos.length;
    let kl = kudos.slice(0, nrKudos)

    return kl.map(({ownerrep_name, customer_name, gender, survey_date, pic} , index) => {
      const nr = indexList[index % nrKudos]
      const mgender = mapGender(gender)
      const img = pic ? `${pic}` : `https://randomuser.me/api/portraits/${mgender}/${nr}.jpg`
      return (
        <GridTile style={ styles.gridItem } key={ index } title={ customer_name } subtitle={ subTitle(ownerrep_name) } actionIcon={ DateView(survey_date) }>
          <img src={ img } alt='' />
        </GridTile>
      )
    })
  }

  render() {
    const kudos = this.props.kudos

    if (!kudos) {
      return <div>
               Loading
             </div>
    }
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Container style={ styles.root }>
        <PaperStyled zDepth={1}>
            <H5Styled>
              <FontIcon className='material-icons' color={ red500 }>favorite</FontIcon>
              Kudos (
              { kudos.length })
            </H5Styled>
            </PaperStyled>
          <GridList cellHeight={ 150 } style={ styles.gridList } cols={ 2 }>
            { this.renderItems(kudos) }
          </GridList>
        </Container>
      </MuiThemeProvider>
    )
  }
}

const {string, func, shape, number, arrayOf} = React.PropTypes

KudoListComponent0.propTypes = {
  fetchKudos: func,
  refreshRate: number,
  kudos: arrayOf(shape({
    name: string,
    date: string,
    customer: string
  }))
}

const mapStateToProps = state => {
  return {
    kudos: state.summary.kudos
  }
}

export default connect(mapStateToProps, {
  fetchKudos
})(KudoListComponent0)
