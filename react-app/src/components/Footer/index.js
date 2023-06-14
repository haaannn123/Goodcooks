import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <h2 className="footer-header">Connect with me</h2>
      <a
        href="https://www.linkedin.com/in/rick-astley-978941125/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link"
      >
        <div className="linked-in-wrapper">
          <div className="linkedin-github-text">LinkedIn</div>
          <i className="fa-brands fa-linkedin"></i>
        </div>
      </a>
      <a href="https://github.com/haaannn123" target="_blank" rel="noopener noreferrer" className="github-link">
        <div className="github-wrapper">
          <div className="linkedin-github-text">Github</div>
          <i className="fa-brands fa-github"></i>
        </div>
      </a>
    </div>
  );
};

export default Footer;
