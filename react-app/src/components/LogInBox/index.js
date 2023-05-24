import { useState, useRef, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoUserButton from "./DemoUserButton";

import "./LandingPage.css";

function LandingPage() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const closeMenu = () => setShowMenu(false);
  return (
    <div className="account-box">
      <h2>Discover & cook more</h2>
      <OpenModalButton
        buttonText="Sign in"
        onItemClick={closeMenu}
        className="log-in-box-button"
        modalComponent={<LoginFormModal />} />
      <OpenModalButton
        buttonText="Register"
        className="sign-up-box-button"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />} />
        <div className="legal-message">By creating an account, you agree to the Greatcooks Terms of Service and Privacy Policy.</div>
      <div className="demo-input">
        Sign in as a  <DemoUserButton />
      </div>
    </div>
  );
}
export default LandingPage;
