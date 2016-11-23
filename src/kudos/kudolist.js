import React, {Component} from 'react';
import KudoItem from './kudoitem'
import {connect} from 'react-redux';
import {fetchKudos} from '../actions/index'
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

const colorList = [
    "purple",
    "orange",
    "blue",
    "green",
    "lime lighten-2",
    "red"
]

const gender = g => {
    if (g === 'M') {
        return 'men'
    } else 
        return 'women'
}

const indexList = [
    23,
    34,
    56,
    24,
    52,
    19
]

const getDay =date => moment(date).format("DD")

const displayNrKudos = ( nr, len ) => { return nr>len? len : nr}


class KudoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tijd: 0
        }
    }

    myTimer() {
        const t1 = this.state.tijd;
        console.log('TIJD', t1)
        this.setState({
            tijd: t1 + 1
        })
        this.setState({ nrKudos: this.props.kudos.length, displayedNrKudos: displayNrKudos(this.props.showNumberKudos || 4,  this.props.kudos.length) })
        const {nrKudos, displayedNrKudos, tijd} = this.state
        if (tijd > nrKudos - displayedNrKudos) {
        this.setState({
            tijd: 0
        })  
        }
    }

    componentWillMount() {
        this.props.fetchKudos()
        setInterval(this.myTimer.bind(this), this.props.refreshRate||15000)

    }

    componentDidMount() {
         
    }
    

    renderItems(kudos) {
        const nrKudos = displayNrKudos(this.props.showNumberKudos || 4,  this.props.kudos.length)
        
        const index = this.state.tijd;
        if (index < kudos.length - nrKudos) {
            var kl = kudos.slice(index, index + nrKudos);
        } else 
            var kl = kudos.slice(0, nrKudos);
        return kl.map((item, index) => {
            return <KudoItem
                name={item.ownerrep_name}
                key={index}
                customer={item.customer_name}
                color={colorList[index % nrKudos]}
                gender={gender(item.gender)}
                date = {getDay(item.survey_date)}
                nr={indexList[index % nrKudos]}/>
        })
    }

    render() {
        const kudos = this.props.kudos;
        
        if (!kudos) {
            return <div>
                Loading
            </div>
        }
       
        return (

            <div>
                <h3 className="">
                    <i className="material-icons">favorite_border</i>
                    Kudos
                </h3>
                <ReactCSSTransitionGroup
                    transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
                    {this.renderItems(kudos)}
                </ReactCSSTransitionGroup>

            </div>
        );
    };
}

const mapStateToProps = state => {
    return {kudos: state.summary.kudos}
}

export default connect(mapStateToProps, {fetchKudos})(KudoList);