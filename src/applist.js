import React, {Component} from 'react'

class AppList extends Component {
    render() {
        return (
            <div className="">
                <ul className="collection with-header  ">
                    <li className="collection-header black lighten-2 white-text">
                        <h5>Notifications</h5>
                    </li>
                    <li className="collection-item black lighten-2 white-text">
                        <div className="chip blue lighten-2">
                            <img src="http://materializecss.com/images/yuna.jpg" alt="Contact Person"/>
                            Jane Doe
                        </div>
                    </li>
                    <li className="collection-item avatar black lighten-2 white-text">
                        <i className="material-icons circle">folder</i>24
                        <span className="title">Support Reps Birthday</span>
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">grade</i>
                        </a>
                    </li>
                    <li className="collection-item avatar black lighten-2 white-text">
                        <i className="material-icons circle green">insert_chart</i>
                        <span className="title">Title</span>
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">thumb_up</i>
                        </a>
                    </li>
                    <li className="collection-item avatar">
                        <i className="material-icons circle red">play_arrow</i>
                        <span className="title">Title</span>
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">grade</i>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AppList