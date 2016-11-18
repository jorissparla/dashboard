import React from 'react'

const AppNavBar = () => {
    return (
  <nav>
    <div className="nav-wrapper grey darken-1">
      <a href="#!" className="brand-logo"><i className="material-icons">cloud</i>Infor Support Dashboard</a>
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