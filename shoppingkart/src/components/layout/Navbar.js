import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text">
              <img src="https://github.com/Jay-Goss/GroupProject3/raw/master/shoppingkart/public/images/logo.png" width="" height=""  alt=""></img>
              {/* <i className="material-icons"></i> */}
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;