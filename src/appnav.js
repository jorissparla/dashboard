import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};


const AppNavBar = () => {
    return (
    <nav style={styles}>
        <div className="nav-wrapper light-blue lighten-4">
          <a href="/" className="brand-logo left"><i className="material-icons">cloud</i>Infor Support Dashboard</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html"><i className="material-icons">search</i></a></li>
            <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
            <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
            <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
          </ul>
        </div>
      </nav>

    )
}

export default AppNavBar


/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
const Header = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar
    style={styles}
      title={<span style={styles.title}>Infor Support Dashboard</span>}
      onTitleTouchTap={handleTouchTap}
      
      iconElementLeft={<IconButton><ActionHome /></IconButton>}
      iconElementRight={<FlatButton label="Login" />}
    />
  </MuiThemeProvider>
);

exports.Header = Header;