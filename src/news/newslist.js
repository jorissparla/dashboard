import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNews} from '../actions/index'
import {Link} from 'react-router'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

class NewsList extends Component {

  componentDidMount () {
    this.props.fetchNews()
  }


  renderNewsItems(news) {
    const {iconStyle, avatarStyle}= styles
    return news.map(item => {
      return (
        <div>
      <ListItem
          leftAvatar={<div style={avatarStyle } ><Avatar src={item.img} /><div>{item.expire_date.substr(0, 10)}</div></div>}
          primaryText={item.title}
          rightIcon={ 
            <Link style={iconStyle} to={'/news/' + item.id}>
            <ModeEdit  color={blue500} onClick={()=> alert('click')} />
          </Link>}
          secondaryText={
            <p>
              {item.body}
              </p>
          }
          secondaryTextLines={2}
      />
      <Divider inset={true} /></div>
      )
    })
  }

  render () {
    const { news } = this.props
    const {listStyle, subheaderStyle} = styles
    if (!news[0]) {
      return <div>Loading</div>
    }
    return (
      <List style={listStyle}>  
        <Subheader style={subheaderStyle}>News</Subheader>
        <Divider inset={true} />
        {this.renderNewsItems(news)}
      </List>
    )
  }
}

const { func, arrayOf, shape, string } = React.PropTypes

NewsList.propTypes = {
  fetchNews: func,
  news: arrayOf(shape({
    body: string,
    image: string,
    link: string,
    link_text: string,
    expire_date: string
  }))
}

const styles = {
  listStyle: {
    backgroundColor: 'white',
    marginRight: 20
  },
  subheaderStyle : { 
    fontSize: 48, 
    fontFamily: 'Billabong',
    marginLeft: 20,
    marginTop: 20,
    padding: 10
  },
  iconStyle :{ 
    marginRight: 20, 
    alignSelf: 'flex-start',
    padding: 20
  },
  avatarStyle: {
    flexDirection: 'column', 
    fontSize: 10, 
    justifyContent:'center'
  }

}

const mapStateToProps = (state) => {
  return {news: state.summary.news}
}

export default connect(mapStateToProps, {fetchNews})(NewsList)
