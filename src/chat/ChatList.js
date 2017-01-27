import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchChat} from '../actions/index'
import {Link} from 'react-router'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserAvatar  from 'react-user-avatar'

const colorAr = ['#BA68C8', '#81D4FA', '#FF7043','#8BC34A','#FFFF00','#E57373']

function getColor(index, colorAr) {
  return colorAr[index % colorAr.length]
}

class ChatList extends Component {

  componentDidMount () {
    this.props.fetchChat()
  }


  
  renderChat (chat) {
     const {iconStyle, avatarStyle, dateStyle}= styles
      return chat.map((item, index) => {
        return (
          <div key={item.id} style={{ flexDirection: 'row'}}>
            <ListItem 
                leftAvatar={<div style={avatarStyle } >
                <UserAvatar 
                  size="48" 
                  style={{ fontFamily:'Oswald', fontSize:'18px'}} 
        name={item.weeknr.substr(4,2)} 
                  color={getColor(index, colorAr)}
                  colors={['#BA68C8', '#81D4FA', '#FF7043','#8BC34A','#FFFF00','#E57373']}
                /> 
                 <div> {item.team}</div>
                </div>
               
            }
                primaryText={`Number of chats: ${item.nrchats}`}
                secondaryText={
                  <p>
                    {` Responded in time: ${item.responseintime} ( ${item.percentage} %)`}
                    </p>
                }
                secondaryTextLines={2}
                rightAvatar={ <div style={{ fontWeight:'bold'}}>{item.version}</div>}
                 rightIcon={ 
            <Link style={iconStyle} to={'/chat/' + item.id}>
              <UserAvatar 
                  size="48" 
                  style={{ fontFamily:'Oswald', fontSize:'18px'}} 
                  name={item.team.slice(0,2).toUpperCase()} 
                  color={getColor(index, colorAr)}
                  colors={['#BA68C8', '#81D4FA', '#FF7043','#8BC34A','#FFFF00','#E57373']}
                /> 
          </Link>}
            />
            <Divider inset={true} />
        </div>
        )
      })
    }



  render () {
    const { chat } = this.props
    const {listStyle, subheaderStyle} = styles
    if (!chat) {
      return <div>Loading</div>
    }
    return (
      <List style={listStyle}> 
        <Subheader style={subheaderStyle}>
        <div style={{ flexGrow: 2}}>
        Chat
        </div>
        <div style={{ flexGrow: 1}}>
          <Link to={'/chat/new'}>
            <FloatingActionButton >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
        </Subheader>
        <Divider inset={true} />
        {this.renderChat(chat.reverse())}
      </List>
    )
  } 
}


const styles = {
  listStyle: {
    backgroundColor: 'white',
    marginRight: 20,

  },

  subheaderStyle : { 
    fontSize: 56, 
    fontFamily: 'Oswald',
    color: 'dodgerblue',
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex'
  },
  iconStyle :{ 
    marginRight: 20, 
    alignSelf: 'flex-start',
    padding: 20,
    flexDirection: 'row'
  },
  avatarStyle: {
    flexDirection: 'column', 
    fontSize: 10, 
    width: '50px',
    justifyContent:'center'
  },
  dateStyle: {
      fontSize: '16px',
  fontWeight: '900'
  }
}


const mapStateToProps = (state) => {
  return {chat: state.summary.chat}
}

export default connect(mapStateToProps, {fetchChat})(ChatList)