import React from 'react';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';
const KudoItem = props => {
    const color = props.color || "blue";
    const nr = props.nr || "14";
    const gender = props.gender || 'men'
    const imgC = "https://randomuser.me/api/portraits/" + gender + "/" + nr + ".jpg"
    const classC = "card-panel col s2 roundedCorner aname " + color + " lighten-2";
    return (
        <div className={classC} key={props.name}>
        <ReactCSSTransitionGroup  transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
            <div className="card-action white-text App-small-text">

                {props.customer.toUpperCase() || "Kongsberg"}
            </div>
            <div className="divider"></div>
            <div className="card-image">
                <img src={imgC} alt="" className="circle ava"/>
                <span className="numberBox">{props.date}</span>
            </div>
            <div className="card-content white-text">
                <h6>{props.name}</h6>
            </div>
</ReactCSSTransitionGroup>
        </div>

    )
}

export default KudoItem;
