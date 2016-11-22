import React, {Component} from 'react';
import KudoItem from './kudoitem'
import {connect} from 'react-redux';
import {fetchKudos} from '../actions/index'
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    12,
    19
]

class KudoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tijd: 0
        }
    }

    myTimer() {
        const t1 = this.state.tijd;
        this.setState({
            tijd: t1 + 1
        })
    }

    componentWillMount() {
        this
            .props
            .fetchKudos()
        setInterval(this.myTimer.bind(this), 15000)
    }

    renderItems(items) {

        return items.map((item, index) => {
            return <KudoItem
                name={item.ownerrep_name}
                key={index}
                customer={item.customer_name}
                color={colorList[index % 6]}
                gender={gender(item.gender)}
                nr={indexList[index % 6]}/>
        })
    }

    render() {
        const kudos = this.props.kudos;
        if (!kudos) {
            return <div>
                Loading
            </div>
        }
        const index = this.state.tijd;
        if (index < kudos.length - 6) {
            var kl = kudos.slice(index, index + 6);
        } else 
            var kl = kudos.slice(0, 6);
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
                    {this.renderItems(kl)}
                </ReactCSSTransitionGroup>

            </div>
        );
    };
}

const mapStateToProps = state => {
    return {kudos: state.summary.kudos}
}

export default connect(mapStateToProps, {fetchKudos})(KudoList);