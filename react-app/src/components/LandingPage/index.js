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
        buttonText="Log In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />} />
      <OpenModalButton
        buttonText="Sign Up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />} />
      <div>
        Want a look around?
        <DemoUserButton />
      </div>
    </div>
  );
}
export default LandingPage;
