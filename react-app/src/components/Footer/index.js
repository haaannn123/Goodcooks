import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <a href="https://www.linkedin.com/in/han-nguyen-developer/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
          <i className="fa-brands fa-linkedin"></i>
      </a>
      <a href="https://github.com/haaannn123" target="_blank" rel="noopener noreferrer" className="github-link">
          <i className="fa-brands fa-github"></i>
      </a>
    </div>
  );
};

export default Footer;
