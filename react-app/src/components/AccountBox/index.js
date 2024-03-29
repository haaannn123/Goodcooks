import { useState, useRef, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import DemoUserButton from "./DemoUserButton";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";

function AccountBox() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const handleClick = () =>{
    history.push('/signup')
  }

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
      <div className="inner-account-box">
      <h2 className="discover-header">Discover & Cook more</h2>
      <h4 className="account-box-call-to-action">Sign in to get started!</h4>
      <OpenModalButton
        buttonText="Sign in"
        onItemClick={closeMenu}
        className="log-in-box-button"
        modalComponent={<LoginFormModal />}
      />
      <button 
      onClick={()=> handleClick()}
      className="log-in-box-button">Sign Up</button>
      <div class="divider-account-box">
        <div class="thin-line"></div>
        <div> or </div>
        <div class="thin-line"></div>
      </div>

      <div className="demo-input">
        <DemoUserButton />
      </div>
      </div>
    </div>
  );
  
}
export default AccountBox;
