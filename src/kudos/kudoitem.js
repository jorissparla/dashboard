import React from 'react';
const KudoItem = props => {
    const color = props.color || "blue";
    const nr = props.nr || "14";
    const gender = props.gender || 'men'
    const imgC = "https://randomuser.me/api/portraits/" + gender + "/" + nr + ".jpg"
    const classC = "card-panel col s1 roundedCorner " + color + " lighten-2";
    return (
        <div className={classC}>
            <div className="card-action white-text App-small-text">

                {props.customer.toUpperCase() || "Kongsberg"}
            </div>
            <div className="divider"></div>
            <div className="card-image">
                <img src={imgC} alt="" className="circle ava"/>
                <div className="numberBox">{props.date}</div>
            </div>
            <div className="card-content white-text">
                <h6>{props.name}</h6>
            </div>

        </div>

    )
}

export default KudoItem;
