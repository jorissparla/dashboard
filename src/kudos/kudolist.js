import React, { Component } from "react";
import KudoItem from "./kudoitem";
import { connect } from "react-redux";
import { fetchKudos } from "../actions/index";
//import moment from 'moment'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const colorList = ["purple", "orange", "blue", "green", "lime lighten-2", "red"];

const gender = g => {
  if (g === "M") {
    return "men";
  } else {
    return "women";
  }
};

const indexList = [23, 34, 56, 24, 52, 19];

//const getDay = date => moment(date).format('ddd, DD MMM')

const displayNrKudos = (nr, len) => {
  return nr > len ? len : nr;
};

class KudoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tijd: 0
    };
  }

  myTimer() {
    const t1 = this.state.tijd;
    this.setState({
      tijd: t1 + 1
    });
    if (this.props.kudos) {
      this.setState({
        nrKudos: this.props.kudos.length,
        displayedNrKudos: displayNrKudos(this.props.showNumberKudos || 4, this.props.kudos.length)
      });
      const { nrKudos, displayedNrKudos, tijd } = this.state;
      if (tijd > nrKudos - displayedNrKudos) {
        this.setState({
          tijd: 0
        });
      }
    }
  }

  componentDidMount() {
    this.props.fetchKudos();
    this.timerhandle = setInterval(this.myTimer.bind(this), this.props.refreshRate || 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timerhandle);
  }

  renderItems(kudos) {
    const nrKudos = displayNrKudos(this.props.showNumberKudos || 4, this.props.kudos.length);

    const index = this.state.tijd;
    let kl = kudos.slice(0, nrKudos);
    if (index <= kudos.length - nrKudos) {
      kl = kudos.slice(index, index + nrKudos);
    }
    return kl.map((item, index) => {
      return (
        <KudoItem
          name={item.ownerrep_name}
          key={index}
          customer={item.customer_name}
          color={colorList[index % nrKudos]}
          gender={gender(item.gender)}
          date={item.survey_date}
          nr={indexList[index % nrKudos]}
          pic={item.pic}
        />
      );
    });
  }

  render() {
    const kudos = this.props.kudos;

    if (!kudos) {
      return <div>Loading</div>;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div className="kudolist aname animating">
          <h4 className="left-align kudotitle">
            <i className="material-icons">favorite_border</i>
            Kudos ({kudos.length})
          </h4>
          <div className="kudolist">{this.renderItems(kudos)}</div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = state => {
  return { kudos: state.summary.kudos };
};

export default connect(mapStateToProps, { fetchKudos })(KudoList);
