import { NavLink, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="navbar-profile-container">
      <button
        onClick={openMenu}
        className="navbar-profile-button">
        {user.profile_img ? (
          <img
            src={user.profile_img}
            alt="profile"
            className="profile-img-navbar"
          />
        ) : (
          <img
            src="https://i.imgur.com/nqak9tT.png"
            alt="profile-filler"
            className="profile-img-navbar"/>
        )}
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="profile-demo-user-name">Hello, {user.first_name}</div>
            <NavLink
              className="navlink"
              to={`/user/${user.id}`}>Profile</NavLink>
            <div>
              <button
                className="logout-button"
                onClick={handleLogout}>Log Out</button>
            </div>
          </>

        ) : (
          null
        )}
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
