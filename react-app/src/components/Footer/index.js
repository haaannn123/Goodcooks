import React from "react";
import { NavLink } from "react-router-dom";

function Footer (){
  return (
    <>
      <div className="company">
        <h3>COMPANY</h3>
        <NavLink to="/">About us</NavLink>
      </div>
      <div className="connect">
        <h3>CONNECT</h3>
        <NavLink to="/">Github</NavLink>
      </div>
    </>
  );
}
export default Footer;
