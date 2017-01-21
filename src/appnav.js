import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { Link } from 'react-router'


function handleTouchTap() {
	alert('onTouchTap triggered on the title component');
}

const styles = {
	title: {
		cursor: 'pointer',
	},
};



const Header = React.createClass({
	renderButtons() {
		
		let logOutLink = <Link to='signout' />
		let logInLink = <Link to='signin' />
		
		
		if (this.props.authenticated) {
			return <FlatButton linkButton={true} containerElement={logOutLink} label='Logout' />
		}
		else {
			return <FlatButton linkButton={true} containerElement={logInLink} label="Login" />
		}

	},
	render () {
		let homeLink = <Link to='/' />
		return <AppBar
			style={styles}
			title={<span style={styles.title}>Infor Support Dashboard</span>}
			onTitleTouchTap={handleTouchTap}
			
			iconElementLeft={<IconButton linkButton={true} containerElement={ homeLink } ><ActionHome /></IconButton>}
			iconElementRight={ this.renderButtons() }
		/>}
	}
)

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Header);