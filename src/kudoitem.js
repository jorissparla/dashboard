import React from 'react';
const KudoItem = props => {
    const color = props.color||"blue";
    const nr = props.nr || "14";
    const gender = props.gender || 'men'
    console.log('gender', gender, props)
    const imgC = "https://randomuser.me/api/portraits/"+gender+"/"+ nr+ ".jpg"
    const classC = "card-panel col s1 "+ color+" lighten-2";
    return (
        <div className={classC}>
            <div className="card-image">
                <img src={imgC} alt="" className="circle"/>
            </div>
            <div className="card-content white-text">
                <h6>{props.name}</h6>
            </div>
            <div className="card-action white-text App-small-text">


                    {props.customer || "Kongsberg"}
            </div>

        </div>

    )
}

export default KudoItem;
