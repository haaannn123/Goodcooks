import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LandingPage from "../LogInBox";
import "./Navigation.css";
import { useHistory } from "react-router-dom"

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory()

  const handleClick = () => {
    history.push("/books/new")
  }

  return (
    <div className="navbar-container">
      <NavLink exact to="/" className="home-link">
        <div className="great">
          great<span className="cooks">cooks</span>
        </div>
      </NavLink>
      {isLoaded ? (
        user ? (
          <div>
            <button className="Create a book button" onClick={() => handleClick()}>Create a book!</button>
            <ProfileButton user={user} />
          </div>
        ) : (
          <div className="login-container">
            <img className="splash-page-image" src="https://i.imgur.com/7Ws3Wif.png" alt="splash-page" />
            <LandingPage className="login-landing-page-box" />
          </div>
        )
      ) : null}
    </div>
  );
}

export default Navigation;
