import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LandingPage from "../LogInBox";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container">
      <NavLink exact to="/" className="home-link">
        greatcooks
      </NavLink>
      {user && isLoaded ? (
        <>
          <ProfileButton user={user} />
        </>
      ) : (
        <div className="login-container">
          {/* <img className="splash-page-image" src="https://i.imgur.com/7Ws3Wif.png" alt="splash-page" /> */}
          <LandingPage className="login-landing-page-box"/>
        </div>
      )}
    </div>
  );
}

export default Navigation;
