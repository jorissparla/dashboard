import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchNews} from './actions/index'
import { Link } from 'react-router';

class NewsList extends Component {

    componentDidMount() {
        this.props.fetchNews()
    }
    

    renderNewsItems (news) {
    return news.map(item=> {
                return (
               
                    <li className="collection-item App-align" key={item.id} >
                     <div className="row">
                        <h5>{item.title}</h5>
                        <div className="col s2">
                            <img className="App-image" src={item.img}  alt="Contact Person"/>
                                
                        </div>
                        <div className="col s7">
                            {item.body.substring(0,255)+"..."}
                        </div>
                        <div className="col s3">
                            <Link to={"/news/"+item.id}  className="btn-floating btn-small right waves-effect waves-light blue"><i className="material-icons">mode_edit</i></Link>
                             <Link to={"/news/"+item.id}  className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">delete</i></Link>
                        </div>                        
                       
                           </div>
                    </li>
             
                )})}
        

    render() {
        const news = this.props.news;
        if (!news[0]) {
            return <div>Loading</div>
        }
        return (
            <div className="">
             <ul className="collection with-header">
                <li className="collection-header col s4 App-align" ><h4>NewsItems</h4>
                <Link to={"/news/new"}  className="btn-floating btn-lmedium waves-effect waves-light grey col s4"><i className="material-icons">add</i></Link>
                </li>
                {this.renderNewsItems(news)}
            </ul>
                
            </div>
        );
    }
}

const mapStateToProps =(state) =>
{
   return {news: state.summary.news}
}

export default connect( mapStateToProps, {fetchNews})(NewsList);