import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";



export default function Navbar() {
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/recordList">
          <img
            style={{ width: "55%", marginLeft: "20px" }}
            src="https://raw.githubusercontent.com/Wasabi95/NavBar-SideMenu/master/images/cc.png"
            alt="logo"
          ></img>
        </NavLink>
     
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="">
              <NavLink className="nav-link" to="/recordList">
                <h1>Employee Management System </h1>
              </NavLink>
            </li>
          
          </ul>
        </div>
      </nav>
    </div>
  );
}
