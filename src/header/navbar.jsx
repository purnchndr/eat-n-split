import React from "react";
import NavLink from "./navLink";
import logo from "../../images/logo2.png";
import Theme from "./theme";

function Navbar() {
  return (
    <nav className="">
      <Logo />
      <div className="navlinks-container-links">
        <NavLink classes="active" link="#" text="Home" />
        <NavLink link="#" text="Home" />
        <NavLink link="#" text="Home" />
        <NavLink link="#" text="Home" />
        <Theme />
      </div>
      <div className="navlinks-container-logic">
        <NavLink link="#" text="signup" />
        <NavLink link="#" text="logout" />
      </div>
    </nav>
  );
}

const Logo = () => {
  return (
    <div className="header-logo-container">
      <img src={logo} className="header-logo" alt="logo-img" />
    </div>
  );
};

export default Navbar;
