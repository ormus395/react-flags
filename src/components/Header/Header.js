import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header className="shadow-bottom white">
      <div className="header--container">
        <h3 className="header--title">Where in the world?</h3>
        <p className="header--dark-mode">
          <span className="dark-mode--logo">
            <i className="far fa-moon"></i>
          </span>
          Dark Mode
        </p>
      </div>
    </header>
  );
}

export default Header;
