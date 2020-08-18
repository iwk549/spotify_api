import React, { Component } from "react";
import HomeIcon from "./common/homeIcon";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg nav-pills">
          <a className="nav-item nav-link" href="http://www.dosshouse.us">
            <HomeIcon />
          </a>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
