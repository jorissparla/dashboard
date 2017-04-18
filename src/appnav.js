import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {blue500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { Link } from 'react-router'


const muiTheme = getMuiTheme({
  palette: {
    textColor: blue500,
  },
  appBar: {
    height: 50,
		color: blue500
  },
});

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
		let homeLink = <Link to={'/'} />
		return  (
			<MuiThemeProvider muiTheme={muiTheme}>
				<AppBar
					style={styles}
					title={
						<span style={styles.title}>
							Infor Support Dashboard
							</span>
					}
					onTitleTouchTap={handleTouchTap}
					iconElementLeft={
						<IconButton  containerElement={ homeLink } >
							<ActionHome />
						</IconButton>
					}
					iconElementRight={ this.renderButtons() }
				/>
			</MuiThemeProvider>)}
	}
)

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Header);