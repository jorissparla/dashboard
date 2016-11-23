import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchNews} from '../actions/index'
import {Link} from 'react-router';

class NewsList extends Component {

    componentDidMount() {
        this
            .props
            .fetchNews()
    }

    renderNewsItems(news) {
        return news.map(item => {
            return (

                <li className="collection-item App-align" key={item.id}>
                    <div className="row">
                        <h5>{item.title}</h5>
                        <div className="col s3">
                            <img className="App-image" src={item.img} alt="Contact Person"/>

                        </div>
                        <div className="col s7 ">
                            {item.body}
                        </div>
                        <div className="right">
                            <Link
                                to={"/news/" + item.id}
                                className="btn-floating btn-small right waves-effect waves-light blue">
                                <i className="material-icons">mode_edit</i>
                            </Link>


                        </div>
                      
                    </div>
                          <p><i>Expires: {item.expire_date.substr(0,10)}</i></p>
                </li>

            )
        })
    }

    render() {
        const news = this.props.news;
        if (!news[0]) {
            return <div>Loading</div>
        }
        return (
            <ul className="collection with-header">
                <li className="collection-header App-align">
                    <h4>NewsItems</h4>
                    <Link to={"/news/new"} className="btn waves-effect waves-light ">
                        <i className="material-icons">add</i>Add
                    </Link>
                </li>

                {this.renderNewsItems(news)}
            </ul>

        );
    }
}
const mapStateToProps = (state) => {
    return {news: state.summary.news}
}

export default connect(mapStateToProps, {fetchNews})(NewsList)