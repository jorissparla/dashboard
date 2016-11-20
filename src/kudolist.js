import React, {Component} from 'react';
import KudoItem from './kudoitem'
import {connect} from 'react-redux';
import {fetchKudos} from './actions/index'
import {Link} from 'react-router';

const colorList = ["purple", "orange", "blue", "green"]

const gender = g => { 
    if (g === 'M') {
        return 'men'
    } else return 'women'
}

const indexList = [23, 34, 56, 24, 12]

class KudoList extends Component {

    componentWillMount() {
        this
            .props
            .fetchKudos()
    }

    renderItems(items) {
        return items.map((item, index) => {
            return <KudoItem
                name={item.ownerrep_name}
                key={index}
                customer={item.customer_name}
                color={colorList[index % 4]}
                gender={gender(item.gender)}
                nr={indexList[index % 4]}/>
        })
    }

    render() {
        const kudos = this.props.kudos;
        console.log(this.props)
        if (!kudos) {
            return <div>
                Loading
            </div>
        }
        const kl = kudos.slice(0, 4);
        return (

            <div>
            <h3 className=""><i className="material-icons">favorite_border</i> Kudos </h3>
                {this.renderItems(kl)}

            </div>
        );
    };
}

const mapStateToProps = state => {
    return {kudos: state.summary.kudos}
}

export default connect(mapStateToProps, {fetchKudos})(KudoList);